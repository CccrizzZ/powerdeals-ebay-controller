import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { MarketplaceId } from 'ebay-api/lib/enums'
import { FulfillmentPolicyRequest, ReturnPolicyRequest } from 'ebay-api/lib/types'

interface ReturnPolicyRequestWithId extends ReturnPolicyRequest {
    returnPolicyId?: string
}

interface FulfillmentPolicyRequestWithId extends FulfillmentPolicyRequest{
    fulfillmentPolicyId?: string
}

interface policyObj {
    id: string,
    description: string
}

@Injectable()
export class AccountService {
    constructor(private readonly auth: AuthService) { }
    private readonly defaultMarketplace = MarketplaceId.EBAY_CA

    // get return policy by marketplace (default EBAY_CA)
    async getReturnPolicies(marketPlaceId?: MarketplaceId): Promise<any> {
        const res = await this.auth.ebay.sell.account.getReturnPolicies(marketPlaceId ?? this.defaultMarketplace)
        const policiesArr: policyObj[] = []
        res.returnPolicies.forEach((item: ReturnPolicyRequestWithId) => {
            policiesArr.push({id: item.returnPolicyId , description: item.name})
        })
        return policiesArr
    }
    
    // get return policy by policy id
    async getReturnPolicyById(policyId: string): Promise<any> {
        return await this.auth.ebay.sell.account.getReturnPolicy(policyId)
    }

    // get all fulfillment policies by marketplace (default EBAY_CA)
    async getFulfillmentPolicies(marketPlaceId?: MarketplaceId): Promise<any> {
        const res = await this.auth.ebay.sell.account.getFulfillmentPolicies(marketPlaceId ?? this.defaultMarketplace)
        const policiesArr: policyObj[] = []
        res.fulfillmentPolicies.forEach((item: FulfillmentPolicyRequestWithId) => {
            policiesArr.push({id: item.fulfillmentPolicyId, description: item.name})
        })
        return policiesArr
    }

    // get fulfillment policy by policy id
    async getFulfillmentPolicyById(policyId: string):Promise<any> {
        return await this.auth.ebay.sell.account.getFulfillmentPolicy(policyId)
    }
}