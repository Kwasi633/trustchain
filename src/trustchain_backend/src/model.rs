use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize, Clone)]
pub struct ReputationModel {
    weights: Vec<f64>,
    bias: f64,
}

impl ReputationModel {
    /// Create a new ReputationModel. (Not used in canister if we load from binary.)
    pub fn new(weights: Vec<f64>, bias: f64) -> Self {
        Self { weights, bias }
    }

    /// Predict a reputation score given a slice of features.
    pub fn predict(&self, features: &[f64]) -> Result<f64, String> {
        if features.len() != self.weights.len() {
            return Err(format!(
                "Expected {} features, got {}",
                self.weights.len(),
                features.len()
            ));
        }
        let dot_product: f64 = features.iter().zip(self.weights.iter()).map(|(x, w)| x * w).sum();
        let score = 1.0 / (1.0 + (-(dot_product + self.bias)).exp());
        Ok(score)
    }
}
