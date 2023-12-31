import { Controller, Get, Query, Req, Body } from '@nestjs/common';
import {AccountService} from './account.service';
import { MarketplaceId } from 'ebay-api/lib/enums'

@Controller('account')
export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    public readonly marketPlaceIdCanada = MarketplaceId.EBAY_CA

    @Get('getReturnPolicies')
    async getReturnPolicies(@Query('marketPlaceId') id?: MarketplaceId): Promise<any> {
        return this.accountService.getReturnPolicies(id ?? this.marketPlaceIdCanada)
    }

    @Get('getReturnPolicy')
    async getReturnPolicy(@Query('id') policyId: string): Promise<any> {
        return this.accountService.getReturnPolicyById(policyId)
    }

    @Get('getFulfillmentPolicies')
    async getFulfillmentPolicies(@Query('marketPlaceId') id?: MarketplaceId): Promise<any> {
        return this.accountService.getFulfillmentPolicies(id)
    }

    @Get('getFulfillmentPolicy')
    async getFulfillmentPolicy(@Query('id') policyId: string): Promise<any> {
        return this.accountService.getFulfillmentPolicyById(policyId)
    }
}