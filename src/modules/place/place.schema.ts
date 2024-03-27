import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, HydratedDocument } from 'mongoose';
import { PlaceType } from '../place-type/place-tye.schema';

export type PlaceDocument = HydratedDocument<Place>

@Schema()
export class Place{
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  distance: string;

  @Prop({ type: Date })
  bookingDate: Date;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: Number })
  rate: number;

  @Prop([{ type: String }])
  imgArrUrl: [String]

  @Prop({ type: Boolean })
  isMoreUsersFavorite: boolean;

  @Prop({type: mongoose.Schema.ObjectId,ref: "PlaceType"})
  placeTypeId: PlaceType
}



export const PlaceSchema = SchemaFactory.createForClass(Place)