import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class User {
  @Prop()
  @Field()
  first_name: string;

  @Prop()
  @Field()
  last_name: string;
}

export const userSchema = SchemaFactory.createForClass(User);
