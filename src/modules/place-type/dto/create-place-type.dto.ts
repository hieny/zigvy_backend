import { IsString } from "class-validator"

export class CreatePlaceTypeDto {
    @IsString()
    name: string

    @IsString()
    stringUrl: string
}
