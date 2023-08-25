import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { ebayHeader } from '../utilities/ebayHeader';
import oauth from 'axios-oauth-client';

@Injectable()
export class InventoryService {
  // get all listing items start from first inventory, limited item amount to limit
  async getAllListings(limit?: number): Promise<any> {

  }
}
