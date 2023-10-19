import { InputType, Field} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreatePersonDto {
  @Field(()=>String,{nullable:true})
  name?: string;
  @Field(()=>String , { nullable: true })
  country?: string;
  @Field(()=> String, { nullable: true })
  Description?: string;
  @Field(()=> String, { nullable: true })
  email?: string;
  @Field(()=> String, { nullable: true })
  status?: string;
  @Field(()=> String, { nullable: true })
  hashKey?: string;
 
  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}