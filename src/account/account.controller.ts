import { Controller, Get, Query, Req, Body } from '@nestjs/common';
import {AccountService} from './account.service';
import { MarketplaceId } from 'ebay-api/lib/enums'

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    public readonly marketPlaceIdCanada = MarketplaceId.EBAY_CA

    @Get('getReturnPolicies')
    async getReturnPolicies(@Query('marketPlaceId') id?: MarketplaceId) {
        return this.accountService.getReturnPolicies(id ?? this.marketPlaceIdCanada)
    }
}