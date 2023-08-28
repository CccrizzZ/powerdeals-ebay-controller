import { Controller, Get, Query, Req, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from 'src/utilities/authDto';

@Controller('auth')
export class AuthController {
    constructor(private readonly AuthService: AuthService) { }

    @Get('code')
    async getCodeURL(): Promise<any> {
        return this.AuthService.getAuthURL()
    }

    // after login into ebay
    @Get('accepted')
    async acceptedAuth(@Query() param: Record<string, any>): Promise<string> {
        if (!param.code) throw new Error('Incorrect validation code!')
        return this.AuthService.getToken(param.code)
    }

    @Get('rejected')
    async Auth(): Promise<string> {
        return 'authentication failed'
    }
}
