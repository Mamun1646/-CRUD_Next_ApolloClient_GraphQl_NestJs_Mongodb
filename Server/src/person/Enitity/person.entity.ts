import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PersonDocument = Person & Document;
@ObjectType()
@Schema({timestamps:true})
export class Person {
  @Field(()=>String,{nullable:true})
  _id: string;
  @Field(()=>String,{nullable:true})
  @Prop()
  name: string;
  @Field(()=>String,{nullable:true})
  @Prop()
  country: String;
  @Field(()=>String,{nullable:true})
  @Prop()
  Description: string;
  @Field(()=>String,{nullable:true})
  @Prop()
  email: string;
    
  @Field(() => String, { nullable: true })
  @Prop()
  status: string;
  // @Prop()
  // hashKey: string;
  
  @Field(() => String, { nullable: true })
  @Prop({ type: String })
  image?: string;
  @Field(() => String, { nullable: true })
 
   message?: string;
}

export const PersonSchema = SchemaFactory.createForClass(Person);
// PersonSchema.index({ email: 1 }, { unique: true });
