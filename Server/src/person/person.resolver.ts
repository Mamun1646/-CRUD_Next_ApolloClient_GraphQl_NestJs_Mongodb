import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/updete-person-dto';
import { Person } from './Enitity/person.entity';
import { join } from 'path';
import { createWriteStream } from 'fs';

@Resolver()
export class PersonResolver {
  constructor(private personService: PersonService) {}

  @Query(() => [Person])
  async getAllPerson() {
    return await this.personService.findAll();
  }

  @Query(() => Person)
  async getPersonById(@Args('_id') _id: string) {
    return await this.personService.getPersonById(_id);
  }

  @Mutation(() => Person)
  async updatePerson(
    @Args('_id') _id: string,
    @Args('updatePersonDto') updatePersonDto: UpdatePersonDto,
  ): Promise<Person> {
    const { name, country, Description, image } = updatePersonDto;
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
     console.log('+================', savePath);
    return await this.personService.update(_id, {
      name,
      country,
      Description,
      image: savePath,
    });
  }

  @Mutation(() => Person)
  async deletePerson(@Args('_id') _id: string) {
    return this.personService.delete(_id);
  }
  @Mutation(() => Person)
  addPerson(@Args('createPersonDto') createPersonDto: CreatePersonDto) {
    return this.personService.addPerson(createPersonDto);
  }
}
