import {
  ListingPolicies,
} from 'ebay-api/lib/types';

// 
export const noReturnId = "238505405012"
export const customerPaidForReturnId = "238525699012"

// default no return
export const defaultListingPolicy: ListingPolicies = {
  bestOfferTerms: {
    bestOfferEnabled: false
  },
  fulfillmentPolicyId: "string",
  paymentPolicyId: "string",
  returnPolicyId: noReturnId,
}

export const example = {
  "availableQuantity": "integer",
  "categoryId": "string",
  "charity": {
    "charityId": "string",
    "donationPercentage": "string"
  },
  "extendedProducerResponsibility": {
    "ecoParticipationFee": {
      "currency": "string",
      "value": "string"
    },
    "producerProductId": "string",
    "productDocumentationId": "string",
    "productPackageId": "string",
    "shipmentPackageId": "string"
  },
  "format": "FIXED_PRICE",
  "hideBuyerDetails": "true",
  "includeCatalogProductDetails": "true",
  "listingDescription": "string",
  "listingDuration": "GTC",
  "listingPolicies": defaultListingPolicy,
  "listingStartDate": "string",
  "lotSize": "integer",
  "marketplaceId": "EBAY_CA",
  "merchantLocationKey": "string",
  "pricingSummary": {
    "auctionReservePrice": {
      "currency": "string",
      "value": "string"
    },
    "auctionStartPrice": {
      "currency": "string",
      "value": "string"
    },
    "minimumAdvertisedPrice": {
      "currency": "string",
      "value": "string"
    },
    "originallySoldForRetailPriceOn": "SoldOnEnum : [ON_EBAY,OFF_EBAY,ON_AND_OFF_EBAY]",
    "originalRetailPrice": {
      "currency": "string",
      "value": "string"
    },
    "price": {
      "currency": "string",
      "value": "string"
    },
    "pricingVisibility": "MinimumAdvertisedPriceHandlingEnum : [NONE,PRE_CHECKOUT,DURING_CHECKOUT]"
  },
  "quantityLimitPerBuyer": "integer",
  "regulatory": {
    "energyEfficiencyLabel": {
      "imageDescription": "string",
      "imageURL": "string",
      "productInformationSheet": "string"
    },
    "hazmat": {
      "component": "string",
      "pictograms": [
        "string"
      ],
      "signalWord": "string",
      "statements": [
        "string"
      ]
    },
    "repairScore": "number"
  },
  "secondaryCategoryId": "string",
  "sku": "string",
  "storeCategoryNames": [
    "string"
  ],
  "tax": {
    "applyTax": "boolean",
    "thirdPartyTaxCategory": "string",
    "vatPercentage": "number"
  }
}

