import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, HydratedDocument } from "mongoose";

export type PlaceTypeDocument = HydratedDocument<PlaceType>;

@Schema()
export class PlaceType extends Document {
    @Prop({ type: String })
    name: string;

    @Prop({type: String}) 
    iconUrl: string
}

export const PlaceTypeSchema = SchemaFactory.createForClass(PlaceType)