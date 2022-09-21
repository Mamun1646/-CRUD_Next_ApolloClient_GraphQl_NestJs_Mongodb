import { InputType, Field, PartialType } from '@nestjs/graphql';
import { UpdatePersonDto } from './updete-person-dto';
@InputType()
export class DeletePersonDto extends PartialType(UpdatePersonDto) {
  @Field()
  _id: string;
}
