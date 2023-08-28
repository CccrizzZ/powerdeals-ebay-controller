import { IsInt, IsNotEmpty, IsString, isNotEmpty, isNumber } from 'class-validator';

export class InventoryDto {

    @IsNotEmpty()
    availability: Availability

    @IsNotEmpty()
    product: Product

}

export interface Root {
    availability: Availability
    condition: string
    conditionDescription: string
    conditionDescriptors: ConditionDescriptor[]
    packageWeightAndSize: PackageWeightAndSize
    product: Product
}

export interface Availability {
    pickupAtLocationAvailability: PickupAtLocationAvailability[]
    shipToLocationAvailability: ShipToLocationAvailability
}

export interface PickupAtLocationAvailability {
    availabilityType: string
    fulfillmentTime: FulfillmentTime
    merchantLocationKey: string
    quantity: string
}

export interface FulfillmentTime {
    unit: string
    value: string
}

export interface ShipToLocationAvailability {
    availabilityDistributions: AvailabilityDistribution[]
    quantity: string
}

export interface AvailabilityDistribution {
    fulfillmentTime: FulfillmentTime2
    merchantLocationKey: string
    quantity: string
}

export interface FulfillmentTime2 {
    unit: string
    value: string
}

export interface ConditionDescriptor {
    additionalInfo: string
    name: string
    values: string[]
}

export interface PackageWeightAndSize {
    dimensions: Dimensions
    packageType: string
    weight: Weight
}

export interface Dimensions {
    height: string
    length: string
    unit: string
    width: string
}

export interface Weight {
    unit: string
    value: string
}

export interface Product {
    aspects: string
    brand: string
    description: string
    ean: string[]
    epid: string
    imageUrls: string[]
    isbn: string[]
    mpn: string
    subtitle: string
    title: string
    upc: string[]
    videoIds: string[]
}
