import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Mutex } from 'async-mutex';
import { createHash } from 'crypto';
import { createWriteStream } from 'fs';
import { Model, UpdateQuery } from 'mongoose';
import { join } from 'path';
import { Person, PersonDocument } from './Enitity/person.entity';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/updete-person-dto';
const mutex =new Mutex()
@Injectable()
export class PersonService {
  constructor(
    @InjectModel(Person.name) private personModel: Model<PersonDocument>,
  ) {}
  async addEmail(createPersonDto:CreatePersonDto){
    
   
   
    try{
      const currentDate=new Date()
      const createdAt=`${currentDate.getFullYear()}${currentDate.getMonth()}${currentDate.getDay()}${currentDate.getHours()}`;
      
      const processedValueForHashing = `${createPersonDto.email}${createdAt}${createPersonDto.status}`;
  
      // Hash the combined string
      const hashKey = createHash('sha256').update(processedValueForHashing).digest('hex');
  
      // Set the hashed field in the userDto
      createPersonDto.hashKey= processedValueForHashing;
    
      return await this.personModel.create(createPersonDto)
    }
    catch(e){
      throw new HttpException(
        'Email already exists',
      409,
      );
    }
 
  }


  async addAddPersonUsingAsyncMutex(createPersonDto: CreatePersonDto) {
    const release = await mutex.acquire();
    try {
      const user = await this.personModel.findOne({ email: createPersonDto.email })
      if (!user) {
        console.log("Created Successfully")
        const user = await this.personModel.create(createPersonDto)
        return {
          ...user,
          message: "Successfully Created"
        }
      }
      else {
        return { message: "Email Already Exists" }
      }


    }
    catch (e) {
      console.log("Error")
      throw new HttpException(
        'Email already exists',
        409,
      );
    }
    finally {
      console.log("Released")
      release()
    }
 
  }




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
    console.log('+================', savePath);
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

  // searching

  async findPersonByName(data: string): Promise<Person[]> {
    return await this.personModel
      .find({ $text: { $search: data } }, { score: { $meta: 'textScore' } })
      .sort({ score: { $meta: 'textScore' } });
  }

  async findAll(): Promise<Person[]> {
    return this.personModel.find().exec();
  }
}
