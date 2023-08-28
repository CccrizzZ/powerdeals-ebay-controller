import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { AuthService } from 'src/auth/auth.service';
import { InventoryDto } from 'src/utilities/inventoryDto';
import Ajv from 'ajv';

@Injectable()
export class InventoryService {
  constructor(private readonly auth: AuthService) { }

  // get all listing items start from first inventory, limited item amount to limit
  async getAllListings(limit?: number): Promise<any> {
    return this.auth.ebay.sell.inventory.getInventoryItems()
  }

  async getListingBySKU(sku: string): Promise<any> {
    return this.auth.ebay.sell.inventory.getInventoryItem(sku)
  }

  async addNewListing(inventory: any): Promise<any> {
    console.log(inventory)

    // this.auth.ebay.sell.inventory.createOrReplaceInventoryItem(
    //   inventory.sku,

    // )
  }

  async addNewListings(inventoryArr: InventoryDto[]): Promise<any> {
    // this.auth.ebay.sell.inventory.bulkCreateOrReplaceInventoryItem([{},{}])
  }
}
