import { Module } from '@nestjs/common';
import { PersonResolver } from './person.resolver';
import { PersonService } from './person.service'
import { MongooseModule } from '@nestjs/mongoose';
import { PersonSchema, Person } from './Enitity/person.entity';

@Module({
  imports:[MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }])],
  providers: [PersonResolver, PersonService]
})
export class PersonModule {}
