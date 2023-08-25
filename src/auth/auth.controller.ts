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

    @Get('accepted/:code')
    async acceptedAuth(@Req() req: Request): Promise<Request> {
        console.log(req)
        return req
    }

    @Get('rejected')
    async Auth(): Promise<string> {
        return 'authentication failed'
    }

    @Get('getToken')
    async getToken(@Body() body: AuthDto): Promise<any> {
        return this.AuthService.getToken(body.code)
    }
}
