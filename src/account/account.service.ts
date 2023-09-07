import { Injectable } from '@nestjs/common'
import { AuthService } from 'src/auth/auth.service'
import { MarketplaceId } from 'ebay-api/lib/enums'
import { ReturnPolicyRequest } from 'ebay-api/lib/types'

interface ReturnPolicyRequestWithId extends ReturnPolicyRequest {
    returnPolicyId?: string
}

interface returnPolicyObj {
    returnPolicyId: string,
    description: string
}

@Injectable()
export class AccountService {
    constructor(private readonly auth: AuthService) { }
    
    async getReturnPolicies(marketPlaceId: MarketplaceId): Promise<any> {
        const res = await this.auth.ebay.sell.account.getReturnPolicies(marketPlaceId)
        const policiesArr: returnPolicyObj[] = []
        res.returnPolicies.forEach((item: ReturnPolicyRequestWithId) => {
            policiesArr.push({returnPolicyId: item.returnPolicyId , description: item.name})
        })
        return policiesArr
    }
}