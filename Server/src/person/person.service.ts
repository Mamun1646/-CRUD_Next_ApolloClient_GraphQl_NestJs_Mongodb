import { Model, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Person, PersonDocument } from './Enitity/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/updete-person-dto';
import { join } from 'path';
import { createWriteStream } from 'fs';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}

  async addPerson(createPersonDto: CreatePersonDto): Promise<Person> {
    const { name, country, Description, image } = createPersonDto;
    //console.log(image);
    const { filename, mimetype, encoding, createReadStream } = await image;
    //console.log(filename, mimetype, encoding, createReadStream);

    const ReadStream = createReadStream();
    console.log(__dirname);
    const newFilename = `${Date.now()}-${filename}`;
    let savePath = join(__dirname, '..', '..', 'upload', newFilename);
    console.log(savePath);
    const writeStream = await createWriteStream(savePath);
    await ReadStream.pipe(writeStream);
    const baseUrl = process.env.BASE_URL;
    const port = process.env.PORT;
    savePath = `${baseUrl}${port}\\${newFilename}`;
    console.log("+================", savePath);
    return await this.personModel.create({
      name,
      country,
      Description,
      image: savePath,
    });
  }

  async update(
    _id: string,
    data: UpdateQuery<PersonDocument> | UpdatePersonDto,
  ): Promise<Person> {
    return await this.personModel.findByIdAndUpdate(_id, data, { new: true });
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
