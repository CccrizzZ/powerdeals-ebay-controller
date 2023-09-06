import { Injectable } from '@nestjs/common';
import eBayApi from 'ebay-api'

@Injectable()
export class AuthService {

    // public readonly ebay: eBayApi = new eBayApi({
    //     appId: process.env.APP_ID_SBX,
    //     certId: process.env.CERT_ID_SBX,
    //     sandbox: true,
    //     marketplaceId: eBayApi.MarketplaceId.EBAY_CA,
    //     scope: [
    //         'https://api.ebay.com/oauth/api_scope/sell.inventory',
    //         'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly'
    //     ],
    //     ruName: process.env.ruName_SBX
    // });

    // ebay connector
    public readonly ebay: eBayApi = new eBayApi({
        appId: process.env.APP_ID_PRD,
        certId: process.env.CERT_ID_PRD,
        sandbox: false,
        marketplaceId: eBayApi.MarketplaceId.EBAY_CA,
        scope: [
            'https://api.ebay.com/oauth/api_scope/sell.inventory'
        ],
        ruName: process.env.ruName_PRD
    })

    // step 1 get the login url
    // after login from webpage it will redirect back to this server
    async getAuthURL(): Promise<string> {
        if (!process.env.APP_ID_PRD || !process.env.CERT_ID_PRD) throw new Error('Cannot find App ID and Cert ID in .env file')
        const url = this.ebay.oAuth2.generateAuthUrl()
        console.log('Open URL', url)
        return url
    }

    // step 2 get "code" query parameter and retrieve token
    async getToken(code: string): Promise<string> {
        // get oauth token
        const token = await this.ebay.OAuth2.getToken(code)

        // set token to connector
        this.ebay.OAuth2.setCredentials(token)

        // solved EBayError: Invalid value for header Accept-Language.
        this.ebay.req.instance.interceptors.request.use((request) => {
            request.headers['Accept-Language'] = 'en-US';
            request.headers['Content-Language'] = 'en-US';
            return request;
        })
        return token
    }
}