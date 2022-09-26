import { InputType, Field} from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@InputType()
export class CreatePersonDto {
  @Field()
  name: string;
  @Field({ nullable: true })
  country: string;
  @Field({ nullable: true })
  Description: string;
  @Field(() => GraphQLUpload, { nullable: true })
  image?: FileUpload;
}