import {
  Controller,
  Get,
  Query,
  Put,
  Body,
  Req,
  HttpException,
  HttpStatus,
  Post,
  Delete
} from '@nestjs/common';
import { InventoryService } from './inventory.service'
import { InventoryDto } from 'src/utilities/inventoryDto';
import {
  BulkMigrateListing,
  SellInventoryItem,
  BulkInventoryItem
} from 'ebay-api/lib/types';

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  // get all listings default limit is 25 
  @Get('getAllListings')
  async getAllListings(@Query('limit') limit?: number): Promise<any> {
    if (limit < 1) throw new HttpException('Limit have to be greater than 1', HttpStatus.FORBIDDEN)
    return this.inventoryService.getAllListings(limit)
  }

  // get single listing by seller defined sku
  @Get('getListingBySKU')
  async getListingBySKU(@Query('sku') sku?: string): Promise<any> {
    return this.inventoryService.getListingBySKU(sku)
  }

  // add one listing
  @Put('addSingleListing')
  async createListing(@Query('sku') sku: string, @Body() req: SellInventoryItem): Promise<any> {
    console.log('sku' + sku)
    return await this.inventoryService.createListing(sku, req)
  }

  // add multiple listing
  @Put('bulkAdd')
  async bulkCreateListings(@Body() body: BulkInventoryItem): Promise<any> {
    return this.inventoryService.createListings(body)
  }

  // bulk migrate exist listing to inventory API Object
  @Post('bulkMigrate')
  async bulkMigrate(@Body() body: BulkMigrateListing): Promise<any> {
    return this.inventoryService.bulkMigrateListing(body)
  }

  @Delete('deleteListing')
  async deleteListing(@Query('sku') sku: string): Promise<any> {
    try {
      return await this.inventoryService.deleteListing(sku)
    } catch (error) {
      throw error
    }
  }
}
