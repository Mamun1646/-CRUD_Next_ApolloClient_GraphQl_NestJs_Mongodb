import { InputType, Field} from '@nestjs/graphql';

@InputType()
export class CreatePersonDto {
  @Field()
  name: string;
  @Field({ nullable: true })
  country: string;
  @Field({ nullable: true })
  Description: string;
}