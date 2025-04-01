// Ensure these crates are available via Cargo.toml dependencies.
extern crate futures;
extern crate bincode;

use candid::Principal;
use ic_cdk_macros::{init, query, update};
use std::cell::RefCell;
use std::collections::HashMap;
use std::cmp;

// Import the HTTPS outcall function and required types from the management canister module.
use ic_cdk::api::management_canister::http_request::{
    CanisterHttpRequestArgument, HttpMethod, HttpHeader, http_request,
};

mod model;

#[cfg(target_arch = "wasm32")]
fn ic_rand_sync(dest: &mut [u8]) -> Result<(), getrandom::Error> {
    use futures::executor::block_on;
    block_on(async {
        let (bytes,) = ic_cdk::api::management_canister::main::raw_rand()
            .await
            .expect("Failed to get IC randomness");
        dest.copy_from_slice(&bytes);
        Ok(())
    })
}

#[cfg(target_arch = "wasm32")]
getrandom::register_custom_getrandom!(ic_rand_sync);

// ---------------------------
// Global State
// ---------------------------
thread_local! {
    static CACHE: RefCell<HashMap<Principal, f64>> = RefCell::new(HashMap::new());
}

#[init]
fn init() {
    // Embed the pre-trained model binary. Ensure that model.bin is in the same directory.
    let model_bytes = include_bytes!("model.bin");
    let _model: model::ReputationModel = bincode::deserialize(model_bytes)
        .expect("Failed to deserialize model");
    ic_cdk::print("Initialization complete: Model loaded successfully");
}

// ---------------------------
// Outcall Functions
// ---------------------------

/// Fetch GitHub data via HTTPS outcall.
/// Returns a 4-tuple: (total_commit_count, stars, most_recent_repo, most_recent_push_date).
/// Note: Only PushEvents are counted.
#[update]
async fn fetch_github_data(handle: String) -> (f64, f64, String, String) {
    let url = format!("https://api.github.com/users/{}/events/public", handle);
    let req = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::GET,
        headers: vec![
            HttpHeader { 
                name: "User-Agent".to_string(), 
                value: "DFX-Canister".to_string() 
            },
            HttpHeader { 
                name: "Accept".to_string(), 
                value: "application/vnd.github.v3+json".to_string() 
            },
        ],
        body: None,
        max_response_bytes: None,
        transform: None,
    };
    let attached_cycles: u128 = 2_000_000_000;
    match http_request(req, attached_cycles).await {
        Ok((http_response,)) => {
            ic_cdk::print(format!("GitHub API request completed with status: {}", http_response.status));
            if http_response.status != 200u128 {
                ic_cdk::print("GitHub API request failed with non-200 status code");
                return (0.0, 0.0, "".to_string(), "".to_string());
            }
            let body_str = String::from_utf8(http_response.body).unwrap_or_default();
            ic_cdk::print("GitHub API response received successfully");
            let events: serde_json::Value = serde_json::from_str(&body_str)
                .unwrap_or(serde_json::Value::Null);
            
            // Count all commits in events of type "PushEvent"
            let commit_count = events.as_array().map(|arr| {
                arr.iter()
                    .filter(|e| e["type"] == "PushEvent")
                    .flat_map(|e| {
                        e["payload"]["commits"]
                            .as_array()
                            .cloned()
                            .unwrap_or_else(|| vec![])
                    })
                    .count() as f64
            }).unwrap_or(0.0);
            
            // We ignore stars here.
            let stars = 0.0;
            
            // Determine the most recent repo and push date from the first PushEvent (if any).
            let (most_recent_repo, most_recent_date) = events.as_array().and_then(|arr| {
                arr.iter().find(|e| e["type"] == "PushEvent").map(|e| {
                    let repo = e.get("repo")
                        .and_then(|r| r.get("name"))
                        .and_then(|n| n.as_str())
                        .unwrap_or("")
                        .to_string();
                    let date = e.get("created_at")
                        .and_then(|d| d.as_str())
                        .unwrap_or("")
                        .to_string();
                    (repo, date)
                })
            }).unwrap_or(("".to_string(), "".to_string()));
            
            ic_cdk::print(format!("GitHub data processed: {} commits found", commit_count));
            (commit_count, stars, most_recent_repo, most_recent_date)
        },
        Err(_) => {
            ic_cdk::print("GitHub API request failed due to an error");
            (0.0, 0.0, "".to_string(), "".to_string())
        }
    }
}

/// Fetch DeFi transaction count via HTTPS outcall to the Etherscan API.
/// Only transactions from the last 90 days are considered.
#[update]
async fn fetch_defi_data(eth_address: String) -> (u64, String) {
    let api_key = "ETHERSCAN_API_KEY";
    let url = format!(
        "https://api.etherscan.io/api?module=account&action=txlist&address={}&startblock=0&endblock=99999999&sort=asc&apikey={}",
        eth_address, api_key
    );
    let req = CanisterHttpRequestArgument {
        url,
        method: HttpMethod::GET,
        headers: vec![
            HttpHeader { 
                name: "User-Agent".to_string(), 
                value: "DFX-Canister".to_string() 
            },
            HttpHeader { 
                name: "Accept".to_string(), 
                value: "application/json".to_string() 
            },
        ],
        body: None,
        max_response_bytes: None,
        transform: None,
    };
    let attached_cycles: u128 = 2_000_000_000;
    match http_request(req, attached_cycles).await {
        Ok((http_response,)) => {
            ic_cdk::print(format!("Etherscan API request completed with status: {}", http_response.status));
            if http_response.status != 200u128 {
                ic_cdk::print("Etherscan API request failed with non-200 status code");
                return (0, "".to_string());
            }
            let body_str = String::from_utf8(http_response.body).unwrap_or_default();
            ic_cdk::print("Etherscan API response received successfully");
            
            let json: serde_json::Value = serde_json::from_str(&body_str)
                .unwrap_or(serde_json::Value::Null);
            let txs = json.get("result").and_then(|r| r.as_array());
            let current_time_seconds = ic_cdk::api::time() / 1_000_000_000;
            let cutoff = current_time_seconds.saturating_sub(7776000); // 90 days in seconds.
            let tx_count = txs.map(|arr| {
                arr.iter()
                    .filter(|tx| {
                        tx.get("timeStamp")
                            .and_then(|ts| ts.as_str())
                            .and_then(|s| s.parse::<u64>().ok())
                            .map(|tx_time| tx_time >= cutoff)
                            .unwrap_or(false)
                    })
                    .count() as u64
            }).unwrap_or(0);
            
            ic_cdk::print(format!("Etherscan data processed: {} recent transactions found", tx_count));
            
            // Return count only, not the full response body which contains sensitive data
            (tx_count, String::new())
        },
        Err(_) => {
            ic_cdk::print("Etherscan API request failed due to an error");
            (0, String::new())
        }
    }
}

// ---------------------------
// Reputation Calculation Components
// ---------------------------

/// Normalizes the GitHub push (commit) count.
/// A maximum of 100 pushes is considered (above which the normalized value is 1.0).
fn normalize_github_pushes(push_count: f64) -> f64 {
    if push_count >= 100.0 {
        1.0
    } else {
        push_count / 100.0
    }
}

/// Normalizes the DeFi transaction count.
/// A maximum of 200 transactions is considered (above which the normalized value is 1.0).
fn normalize_defi_tx(tx_count: u64) -> f64 {
    if tx_count >= 200 {
        1.0
    } else {
        tx_count as f64 / 200.0
    }
}

/// ReputationFactors holds the two real factors:
/// - GitHub push count (normalized)
/// - DeFi transaction count (normalized)
struct ReputationFactors {
    github_pushes: f64,
    defi_tx: f64,
}

// ---------------------------
// Reputation Calculator
// ---------------------------

/// The ReputationCalculator now uses only the real GitHub pushes and DeFi transactions.
/// The weights below sum to 1.0.
struct ReputationCalculator {
    weight_github: f64,
    weight_defi: f64,
}

impl ReputationCalculator {
    fn new() -> Self {
        ReputationCalculator {
            weight_github: 0.5,
            weight_defi: 0.5,
        }
    }
    
    fn calculate_reputation(&self, factors: &ReputationFactors) -> f64 {
        // Simple weighted average scaled to 0-100.
        (factors.github_pushes * self.weight_github + factors.defi_tx * self.weight_defi) * 100.0
    }
}

// ---------------------------
// Comprehensive Reputation Calculation
// ---------------------------
#[update]
async fn update_reputation_score(github_handle: String, eth_address: String) -> (f64, String) {
    ic_cdk::print("Starting reputation score calculation");

    // Fetch GitHub data.
    let (github_commits, _github_stars, recent_repo, recent_date) = fetch_github_data(github_handle).await;
    
    // Fetch DeFi transaction count.
    let (defi_tx_count, _) = fetch_defi_data(eth_address.clone()).await;
    
    // Normalize real data.
    let norm_pushes = normalize_github_pushes(github_commits);
    let norm_defi = normalize_defi_tx(defi_tx_count);
    
    ic_cdk::print(format!("Normalized GitHub activity: {:.2}, Normalized DeFi activity: {:.2}", 
                          norm_pushes, norm_defi));
    
    let factors = ReputationFactors {
        github_pushes: norm_pushes,
        defi_tx: norm_defi,
    };
    
    let calculator = ReputationCalculator::new();
    let reputation_score = calculator.calculate_reputation(&factors);
    
    // Updated message now includes most recent repo and commits count.
    let message = format!(
        "Reputation Score: {:.2} (0-100 scale). Most recent repo: {} on {}. {} commits found. DeFi transactions: {}.",
        reputation_score, recent_repo, recent_date, github_commits as u64, defi_tx_count
    );
    ic_cdk::print("Reputation calculation completed successfully");
    
    let user_principal = Principal::from_text(&eth_address).unwrap_or_else(|_| Principal::anonymous());
    CACHE.with(|cache| {
        cache.borrow_mut().insert(user_principal, reputation_score);
    });
    ic_cdk::print("Reputation score cached successfully");
    
    (reputation_score, message)
}


/// Query function to get a cached reputation score.
#[query]
fn get_reputation(user: Principal) -> f64 {
    CACHE.with(|cache| cache.borrow().get(&user).copied().unwrap_or(0.0))
}