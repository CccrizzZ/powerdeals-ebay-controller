import { Controller, Get, Query } from '@nestjs/common';
import { InventoryService } from './inventory.service'

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Get('allListings')
  async getAllListings(@Query('limit') limit?: number): Promise<any> {
    return this.inventoryService.getAllListings(limit)
  }

  @Get('allListings')
  async getListingBySKU(@Query('sku') sku?: string): Promise<any> {
    return this.inventoryService.getListingBySKU(sku)
  }
}
