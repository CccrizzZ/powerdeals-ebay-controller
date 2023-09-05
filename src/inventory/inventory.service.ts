import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { AuthService } from 'src/auth/auth.service';
import { InventoryDto } from 'src/utilities/inventoryDto';
import {
  BulkMigrateListing,
  SellInventoryItem,
  BulkInventoryItem
} from 'ebay-api/lib/types';

@Injectable()
export class InventoryService {
  constructor(private readonly auth: AuthService) { }

  // get all listing items start from first inventory, limited item amount to limit
  async getAllListings(limit?: number, offset?: number): Promise<any> {
    return await this.auth.ebay.sell.inventory.getInventoryItems({ limit, offset })
  }

  async getListingBySKU(sku: string): Promise<any> {
    return await this.auth.ebay.sell.inventory.getInventoryItem(sku)
  }

  async createListing(sku: string, newItem: SellInventoryItem): Promise<any> {
    const res = await this.auth.ebay.sell.inventory.createOrReplaceInventoryItem(sku, newItem)
    console.log(res)
    return res
  }

  async createListings(req: BulkInventoryItem): Promise<any> {
    return await this.auth.ebay.sell.inventory.bulkCreateOrReplaceInventoryItem(req)
  }

  async bulkMigrateListing(req: BulkMigrateListing): Promise<any> {
    return await this.auth.ebay.sell.inventory.bulkMigrateListing(req)
  }

  async deleteListing(sku: string): Promise<any> {
    return await this.auth.ebay.sell.inventory.deleteInventoryItem(sku)
  }
}
