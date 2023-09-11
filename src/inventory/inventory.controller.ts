import {
  Controller,
  Get,
  Query,
  Put,
  Body,
  Req,
  Post,
  Delete
} from '@nestjs/common';
import { InventoryService } from './inventory.service'
import { InventoryDto } from 'src/utilities/inventoryDto';
import {
  BulkMigrateListing,
  SellInventoryItem,
  BulkInventoryItem,
  EbayOfferDetailsWithKeys
} from 'ebay-api/lib/types';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  // bulk migrate exist listing to inventory API Object
  @Post('bulkMigrate')
  async bulkMigrate(@Body() body: BulkMigrateListing): Promise<any> {
    console.log(body)
    return this.inventoryService.bulkMigrateListing(body)
  }

  // 
  @Get('getAllListings')
  async getAllListings(@Query('limit') limit?: number, offset?: number): Promise<any> {
    return this.inventoryService.getAllListings(limit)
  }

  // get all item sku with limit and offset
  @Get('getAllSku')
  async getAllSku(@Query('limit') limit?: number, offset?: number): Promise<any> {
    return this.inventoryService.getAllSku(limit)
  }

  // get a single listing obj by sku
  @Get('getListingBySku')
  async getListingBySku(@Query('sku') sku?: string): Promise<any> {
    return this.inventoryService.getListingBySKU(sku)
  }

  // get all inventory location obj
  @Get('allInventoryLocations')
  async getAllInventoryLocations(@Query('limit') limit?: number, offset?: number) {
    return this.inventoryService.getAllInventoryLocations(limit, offset)
  }

  // add single listing
  @Put('addSingleListing')
  async createListing(@Query('sku') sku: string, @Body() req: SellInventoryItem): Promise<any> {
    console.log('sku' + sku)
    return await this.inventoryService.createListing(sku, req)
  }

  // add multiple listing
  @Put('bulkAdd')
  async bulkCreateListings(@Body() body: BulkInventoryItem): Promise<any> {
    return this.inventoryService.bulkCreateListings(body)
  }

  // delete single listing object
  @Delete('deleteListing')
  async deleteListing(@Query('sku') sku: string): Promise<any> {
    return this.inventoryService.deleteListing(sku)
  }

  // create offer 
  @Post('createOffer')
  async createOffer(@Body() body: EbayOfferDetailsWithKeys): Promise<any> {
    return this.inventoryService.createOffer(body)
  }

  // get offer by offer ID
  @Get('getOffer')
  async getOffer(@Query('id') offerId: string): Promise<any> {
    return this.inventoryService.getOffer(offerId)
  }

  // get all offers obj from a single sku
  @Get('getOffers')
  async getOffers(@Query('sku') sku?: string, @Query('limit') limit?: number, @Query('offset') offset?: number) {
    return this.inventoryService.getOffers(sku, limit, offset)
  }

  // publish offer
  @Post('publishOffer')
  async publishOffer(@Query('offerId') offerId: string): Promise<any> {
    return this.inventoryService.publishOffer(offerId)
  }
}
