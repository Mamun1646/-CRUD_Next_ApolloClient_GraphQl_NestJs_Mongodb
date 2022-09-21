import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person, PersonDocument } from './Enitity/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/updete-person-dto';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async addPerson(createPersonDto: CreatePersonDto): Promise<Person> {
    const createdPerson = new this.personModel(createPersonDto);
    return createdPerson.save();
  }

  async update(_id: string, updatePersonDto: UpdatePersonDto): Promise<Person> {
    return await this.personModel.findByIdAndUpdate(_id, updatePersonDto, {
      new: true,
    });
  }
  async delete(_id: string): Promise<Person> {
    return await this.personModel.findByIdAndRemove(_id);
  }

  async getPersonById(_id: string): Promise<Person> {
    return this.personModel.findById(_id).exec();
  }

  async findAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }
}
