import {
  Injectable,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import {
  BulkMigrateListing,
  SellInventoryItem,
  BulkInventoryItem,
  InventoryItemWithSkuLocale,
  Product,
  InventoryItem
} from 'ebay-api/lib/types';

@Injectable()
export class InventoryService {
  constructor(private readonly auth: AuthService) { }

  // migrate ebay listing into a inventory object
  async bulkMigrateListing(req: BulkMigrateListing): Promise<any> {
    this.auth.ebay.sell.inventory.bulkMigrateListing(req).then((res) => {
      console.log(typeof res)
      return res
    }).catch((e) => {
      throw e
    })
  }

  // limit have to be more than 1
  checkLimit(limit: number) {
    if (limit < 1) throw new HttpException('Limit have to be greater than 1', HttpStatus.FORBIDDEN)
  }

  // getters //
  // get all listing items start from first inventory, limited item amount to limit (default 25)
  async getAllListings(limit?: number, offset?: number): Promise<any> {
    this.checkLimit(limit)
    return await this.auth.ebay.sell.inventory.getInventoryItems({ limit, offset })
  }

  // get all listings sku
  async getAllSku(limit?: number, offset?: number): Promise<string[]> {
    this.checkLimit(limit)
    const res = await this.auth.ebay.sell.inventory.getInventoryItems({ limit, offset })
    const SkuArr: string[] = []
    res.inventoryItems.forEach((item: InventoryItemWithSkuLocale) => {
      SkuArr.push(item.sku)
    })
    return SkuArr
  }

  // get single listing by seller defined sku
  async getListingBySKU(sku: string): Promise<any> {
    return await this.auth.ebay.sell.inventory.getInventoryItem(sku)
  }

  // get all inventory locations
  async getAllInventoryLocations(limit: number, offset: number) {
    return await this.auth.ebay.sell.inventory.getInventoryLocations({ limit, offset })
  }


  // setters //
  // create single listing
  async createListing(sku: string, newItem: SellInventoryItem): Promise<any> {
    const res = await this.auth.ebay.sell.inventory.createOrReplaceInventoryItem(sku, newItem)
    return res
  }

  // create multiple listings
  async bulkCreateListings(req: BulkInventoryItem): Promise<any> {
    return await this.auth.ebay.sell.inventory.bulkCreateOrReplaceInventoryItem(req)
  }

  // update single listing
  async updateListingInfo(req: SellInventoryItem): Promise<any> {

  }

  // update multiple listings
  async bulkUpdateListingInfo(req: BulkInventoryItem): Promise<any> {

  }

  // delete single listing
  async deleteListing(sku: string): Promise<any> {
    return await this.auth.ebay.sell.inventory.deleteInventoryItem(sku)
  }
}
