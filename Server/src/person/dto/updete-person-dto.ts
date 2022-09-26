import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreatePersonDto } from './create-person.dto';

@InputType()
export class UpdatePersonDto  extends PartialType (CreatePersonDto) {

}