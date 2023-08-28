import { Controller, Get, Query, Put, Body, Req, RawBodyRequest } from '@nestjs/common';
import { InventoryService } from './inventory.service'
import { InventoryDto } from 'src/utilities/inventoryDto';
import Ajv from 'ajv/dist/core';
import fs from 'fs'

import * as inventory_schema from '../utilities/inventory_schema.json'

@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  private readonly ajv: Ajv = new Ajv()

  // get all listings default limit is 25
  @Get('allListings')
  async getAllListings(@Query('limit') limit?: number): Promise<any> {
    return this.inventoryService.getAllListings(limit)
  }

  // get single listing by sku
  @Get('allListings')
  async getListingBySKU(@Query('sku') sku?: string): Promise<any> {
    return this.inventoryService.getListingBySKU(sku)
  }

  @Put('add')
  async createListing(@Req() req: RawBodyRequest<Request>): Promise<any> {
    // const schema = JSON.parse(inventory_schema.toString())

    // const json = fs.readFileSync('src\utilities\inventory_schema.json')
    // console.log(json)
    // const res = this.ajv.validate((json).toString, req.body)
    // console.log(res)
    // console.log(req.body)
    // return this.inventoryService.addNewListing(body)
  }

  @Put('bulkAdd')
  async createListings(@Body() body: InventoryDto[]): Promise<any> {
    return this.inventoryService.addNewListings(body)
  }
}
