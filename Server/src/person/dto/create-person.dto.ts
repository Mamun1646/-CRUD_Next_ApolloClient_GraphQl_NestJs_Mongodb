import { InputType, Field} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreatePersonDto {
  @Field(()=>String)
  name?: string;
  @Field(()=>String , { nullable: true })
  country?: string;
  @Field(()=> String, { nullable: true })
  Description?: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}