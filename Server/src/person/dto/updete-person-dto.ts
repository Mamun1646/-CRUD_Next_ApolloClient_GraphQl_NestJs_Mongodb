import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePersonDto } from './create-person.dto';

@InputType()
export class UpdatePersonDto  extends PartialType (CreatePersonDto) {
  @Field()
  name: string;
  @Field({ nullable: true })
  country: string;
  @Field({ nullable: true })
  Description: string;
}