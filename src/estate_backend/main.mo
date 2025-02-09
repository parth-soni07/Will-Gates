import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Principal "mo:base/Principal";
import Array "mo:base/Array";
import Nat64 "mo:base/Nat64";
import Nat "mo:base/Nat";

actor WillManager {
  public type Beneficiary = {
    firstName : Text;
    lastName : Text;
    relationship : Text;
    email : Text;
    phone : Text;
    wallet : Principal;
  };

  public type Asset = {
    assetName : Text;
    assetType : Text;
    estimatedValue : Nat64;
    description : Text;
    documentation : Text;
  };

  public type Will = {
    willName : Text;
    willDescription : Text;
    owner : Principal;
    beneficiaryAddresses : [Principal];
    beneficiaries : [Beneficiary];
    assets : [Asset];
    executeTime : Nat64;
    executed : Bool;
  };
  var beneficiariesList : [Beneficiary] = [];
  var willsMap : HashMap.HashMap<Principal, Will> = HashMap.HashMap<Principal, Will>(10, Principal.equal, Principal.hash);

  public shared (msg) func createWill(
    willName : Text,
    willDescription : Text,
    executeTime : Nat64,
  ) : async Bool {
    let owner = msg.caller;
    let beneficiaryAddresses = Array.map<Beneficiary, Principal>(beneficiariesList, func(b) { b.wallet });
    let newWill : Will = {
      willName = willName;
      willDescription = willDescription;
      owner = owner;
      beneficiaryAddresses = beneficiaryAddresses;
      beneficiaries = beneficiariesList;
      assets = [];
      executeTime = executeTime;
      executed = false;
    };
    // Add or update the will in the wills map.
    let _ = willsMap.put(owner, newWill);
    return true;
  };

  public func addBeneficiary(
    firstName : Text,
    lastName : Text,
    relationship : Text,
    email : Text,
    phone : Text,
    wallet : Principal,
  ) : async Beneficiary {
    let newBeneficiary : Beneficiary = {
      firstName = firstName;
      lastName = lastName;
      relationship = relationship;
      email = email;
      phone = phone;
      wallet = wallet;
    };
    beneficiariesList := Array.append(beneficiariesList, [newBeneficiary]);
    return newBeneficiary;
  };

  public shared (msg) func addAsset(
    assetName : Text,
    assetType : Text,
    estimatedValue : Nat64,
    description : Text,
    documentation : Text,
  ) : async ?Asset {
    let owner = msg.caller;
    switch (willsMap.get(owner)) {
      case (?will) {
        let asset : Asset = {
          assetName = assetName;
          assetType = assetType;
          estimatedValue = estimatedValue;
          description = description;
          documentation = documentation;
        };
        let newAssets = Array.append(will.assets, [asset]);
        let updatedWill = { will with assets = newAssets };
        let _ = willsMap.put(owner, updatedWill);
        return ?asset; // Return the newly added asset.
      };
      case null {
        return null; // No will found, hence no asset to return.
      };
    };
  };

  private func transferAssets(will : Will) : async Bool {
    var successfulTransfers = 0;
    let totalNFTs = Array.filter<Asset>(will.assets, func(a : Asset) : Bool { a.assetType == "NFT" }).size();
    for (i in Iter.range(0, Nat.sub(will.assets.size(), 1))) {
      let asset = will.assets[i];
      if (asset.assetType == "NFT") {
        let transferResult = await transferNFT(asset, will.owner, will.beneficiaryAddresses);
        if (transferResult) {
          successfulTransfers += 1;
        };
      };
    };

    return successfulTransfers == totalNFTs;
  };
  private func transferNFT(asset : Asset, from : Principal, to : [Principal]) : async Bool {
    return true;
  };
  public shared (msg) func submitWill() : async Bool {
    let owner = msg.caller;
    switch (willsMap.get(owner)) {
      case (?will) {
        if (will.executed) {
          return false;
        };
        let currentTime : Int = Time.now();
        let currentTimeNat64 = Nat64.fromIntWrap(currentTime);
        if (currentTimeNat64 >= will.executeTime) {
          let transferResult = await transferAssets(will);
          if (transferResult) {
            let updatedWill = { will with executed = true };
            let _ = willsMap.put(owner, updatedWill);
            return true;
          } else {
            return false;
          };
        } else {
          return false;
        };
      };
      case null {
        return false;
      };
    };
  };
  public func showBeneficiaries() : async Text {
    if (Array.size(beneficiariesList) == 0) {
      return "No beneficiaries registered.";
    };
    let beneficiariesInfo = Array.foldLeft<Beneficiary, Text>(
      beneficiariesList,
      "",
      func(acc : Text, b : Beneficiary) : Text {
        acc #
        "Name: " # b.firstName # " " # b.lastName #
        ", Relationship: " # b.relationship #
        ", Email: " # b.email #
        ", Phone: " # b.phone #
        ", Wallet: " # Principal.toText(b.wallet) # "\n";
      },
    );
    return "Beneficiaries:\n" # beneficiariesInfo;
  };
  public func showAssets() : async Text {
    var assetsInfo = "";
    // Iterate through each will in the willsMap
    for ((_, will) in willsMap.entries()) {
      // Manually iterate over the assets using Iter.range and index
      for (i in Iter.range(0, Nat.sub(will.assets.size(), 1))) {
        let asset = will.assets[i];
        assetsInfo := assetsInfo #
        "Asset Name: " # asset.assetName #
        ", Type: " # asset.assetType #
        ", Estimated Value: " # Nat64.toText(asset.estimatedValue) #
        ", Description: " # asset.description #
        ", Documentation: " # asset.documentation # "\n";
      };
    };
    if (assetsInfo == "") {
      return "No assets registered.";
    };
    return "Assets:\n" # assetsInfo;
  };
  public shared (msg) func getWill() : async ?Will {
    let caller = msg.caller;
    return willsMap.get(caller);
  };
};
