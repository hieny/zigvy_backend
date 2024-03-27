import { IsString } from "class-validator"

export class CreatePlaceTypeDto {
    @IsString()
    name: string

    @IsString()
    iconUrl: string
}
