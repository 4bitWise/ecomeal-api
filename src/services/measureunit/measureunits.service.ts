import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  CreateMeasureunitDto,
  UpdateMeasureunitDto,
} from 'src/dtos/measureunit/measureunit.dto';
import {
  Measureunit,
  MeasureunitDocument,
} from 'src/schemas/measureunit/measureunit.schema';

@Injectable()
export class MeasureunitsService {
  constructor(
    @InjectModel(Measureunit.name)
    private measureunitModel: Model<MeasureunitDocument>,
  ) {}

  async create(
    createMeasureunitDto: CreateMeasureunitDto,
  ): Promise<Measureunit> {
    const createdMeasureunit = new this.measureunitModel(createMeasureunitDto);
    return createdMeasureunit.save();
  }

  async findAll(): Promise<Measureunit[]> {
    return this.measureunitModel.find().exec();
  }

  async findOne(id: string): Promise<Measureunit> {
    const measureunit = await this.measureunitModel.findOne({ id }).exec();
    if (!measureunit) {
      throw new NotFoundException(`Measureunit with ID ${id} not found`);
    }
    return measureunit;
  }

  async update(
    id: string,
    updateMeasureunitDto: UpdateMeasureunitDto,
  ): Promise<Measureunit> {
    const updatedMeasureunit = await this.measureunitModel
      .findOneAndUpdate({ id }, updateMeasureunitDto, { new: true })
      .exec();
    if (!updatedMeasureunit) {
      throw new NotFoundException(`Measureunit with ID ${id} not found`);
    }
    return updatedMeasureunit;
  }

  async remove(id: string): Promise<Measureunit> {
    const deletedMeasureunit = await this.measureunitModel
      .findOneAndDelete({ id })
      .exec();
    if (!deletedMeasureunit) {
      throw new NotFoundException(`Measureunit with ID ${id} not found`);
    }
    return deletedMeasureunit;
  }
}
