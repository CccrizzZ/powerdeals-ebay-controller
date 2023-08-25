import { IsNotEmpty, IsString } from 'class-validator';

export class newInventoryDto {
    @IsNotEmpty()
    @IsString()
    title: string

    @IsNotEmpty()
    price: string

    @IsNotEmpty()
    isAuction: boolean
}