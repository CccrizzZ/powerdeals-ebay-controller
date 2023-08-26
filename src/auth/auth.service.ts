import { Injectable } from '@nestjs/common';
import axios from 'axios';
import eBayApi from 'ebay-api'

@Injectable()
export class AuthService {

    // nees to be global static object
    // ebay connector
    public readonly ebay: eBayApi = new eBayApi({
        appId: process.env.APP_ID_SBX,
        certId: process.env.CERT_ID_SBX,
        sandbox: true,
        marketplaceId: eBayApi.MarketplaceId.EBAY_CA,
        scope: [
            'https://api.ebay.com/oauth/api_scope/sell.inventory',
            'https://api.ebay.com/oauth/api_scope/sell.inventory.readonly'
        ],
        ruName: process.env.ruName_SBX
    });

    // step 1 get the login url
    // after login from webpage it will redirect back to this server
    async getAuthURL(): Promise<string> {
        const url = this.ebay.oAuth2.generateAuthUrl()
        console.log('Open URL', url)
        return url
    }

    // step 2 get "code" query parameter and retrieve token
    async getToken(code: string): Promise<string> {
        console.log(code)

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