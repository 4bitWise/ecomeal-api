import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { MeasureunitsService } from './measureunits.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateMeasureunitDto,
  UpdateMeasureunitDto,
} from 'src/dtos/measureunit/measureunit.dto';
import { Measureunit } from 'src/schemas/measureunit/measureunit.schema';

@ApiTags('Measureunits')
@Controller('measureunits')
export class MeasureunitsController {
  constructor(private readonly measureunitsService: MeasureunitsService) {}

  @Post()
  async create(
    @Body() createMeasureunitDto: CreateMeasureunitDto,
  ): Promise<Measureunit> {
    try {
      return await this.measureunitsService.create(createMeasureunitDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error: Measureunit not created!',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async findAll(): Promise<Measureunit[]> {
    return this.measureunitsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Measureunit> {
    try {
      return await this.measureunitsService.findOne(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Measureunit with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMeasureunitDto: UpdateMeasureunitDto,
  ): Promise<Measureunit> {
    try {
      return await this.measureunitsService.update(id, updateMeasureunitDto);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Measureunit with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Measureunit> {
    try {
      return await this.measureunitsService.remove(id);
    } catch (err) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: `Measureunit with ID ${id} not found`,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
