import Text "mo:base/Text";
import Blob "mo:base/Blob";
import Array "mo:base/Array";
import Iter "mo:base/Iter";
import Float "mo:base/Float";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Nat32 "mo:base/Nat32";
import Char "mo:base/Char";
import Error "mo:base/Error";
import Nat16 "mo:base/Nat16";

actor {
  // Type definitions for HTTP interactions
  type HttpHeader = {
    name : Text;
    value : Text;
  };
  
  type HttpRequest = {
    url : Text;
    method : Text;
    headers : [HttpHeader];
    body : Blob;
  };
  
  type HttpResponse = {
    status_code : Nat16;
    headers : [HttpHeader];
    body : Blob;
    streaming_strategy : ?StreamingStrategy;
  };

  type StreamingStrategy = {
    #Callback : {
      callback : shared () -> async ();
      token : StreamingCallbackToken;
    };
  };

  type StreamingCallbackToken = {
    key : Text;
    content_encoding : Text;
    index : Nat;
    sha256 : ?Blob;
  };

  // Management canister interface
  type IC = actor {
    http_request : shared {
      url : Text;
      method : Text;
      body : Blob;
      headers : [HttpHeader];
      transform : ?{
        function : shared query (HttpResponse) -> async HttpResponse;
      };
    } -> async HttpResponse;
  };

  // Query transform function
  public shared query func transform_function(response : HttpResponse) : async HttpResponse {
    Debug.print("Transform function called with status: " # Nat16.toText(response.status_code));
    Debug.print("Response body size: " # Nat.toText(Blob.toArray(response.body).size()));
    
    let decoded = Text.decodeUtf8(response.body);
    switch (decoded) {
      case (null) { Debug.print("Response body could not be decoded as UTF-8"); };
      case (?text) { Debug.print("Response body: " # text); };
    };
    
    return {
      status_code = response.status_code;
      headers = response.headers;
      body = response.body;
      streaming_strategy = null;
    };
  };

  // Text to Float conversion with logging
  func textToFloat(text : Text) : Float {
    Debug.print("Converting text to float: " # text);
    var result : Float = 0.0;
    var decimal : Float = 0.0;
    var decimalPlace : Float = 0.1;
    var inDecimal : Bool = false;
    
    for (c in text.chars()) {
      if (c == '.') {
        inDecimal := true;
      } else if (c >= '0' and c <= '9') {
        let digit = Float.fromInt(
          Nat32.toNat(Char.toNat32(c)) - Nat32.toNat(Char.toNat32('0'))
        );
        
        if (inDecimal) {
          decimal += digit * decimalPlace;
          decimalPlace /= 10.0;
        } else {
          result := result * 10.0 + digit;
        }
      };
    };
    
    result += decimal;
    Debug.print("Converted float value: " # Float.toText(result));
    return result;
  };

  // API Call Implementation with extensive logging
  public shared(msg) func updateReputationScore(
    github_handle: Text, 
    eth_address: Text
  ) : async (Float, Text) {
    Debug.print("updateReputationScore called with github_handle: " # github_handle # ", eth_address: " # eth_address);
    
    let payloadText = "{\"github_handle\": \"" # github_handle # "\", \"eth_address\": \"" # eth_address # "\"}";
    Debug.print("Request payload: " # payloadText);
    
    let req = {
      url = "https://75b0-154-161-131-190.ngrok-free.app/update_reputation_score";
      method = "POST";
      body = Text.encodeUtf8(payloadText);
      headers = [
        { name = "Content-Type"; value = "application/json" },
        { name = "Accept"; value = "application/json" },
        { name = "Access-Control-Allow-Origin"; value = "*" }
      ];
      transform = ? {
        function = transform_function;
      };
    };

    Debug.print("Sending HTTP request...");
    
    try {
      let ic : IC = actor("aaaaa-aa");
      Debug.print("Making HTTP outcall...");
      let response = await ic.http_request(req);
      Debug.print("Received HTTP response with status: " # Nat16.toText(response.status_code));
      
      switch (Text.decodeUtf8(response.body)) {
        case (null) {
          Debug.print("Response body could not be decoded as UTF-8");
          return (0.0, "Empty response");
        };
        case (?responseText) {
          Debug.print("Decoded response body: " # responseText);
          let parts = Iter.toArray(Text.split(responseText, #char(',')));
          Debug.print("Split response into " # Nat.toText(parts.size()) # " parts");
          
          if (parts.size() >= 2) {
            let scoreText = parts[0];
            let message = parts[1];
            Debug.print("Score text: " # scoreText # ", Message: " # message);
            
            let score = textToFloat(scoreText);
            Debug.print("Final score: " # Float.toText(score));
            Debug.print("Returning tuple: (" # Float.toText(score) # ", " # message # ")");
            
            return (score, message);
          } else {
            Debug.print("Invalid response format");
            return (0.0, "Invalid format");
          };
        };
      };
    } catch (e) {
      let errorMsg = Error.message(e);
      Debug.print("Error caught: " # errorMsg);
      return (0.0, "HTTP Error: " # errorMsg);
    };
  };
};