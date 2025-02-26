import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { FindAdminDto } from './dto/find-admin.dto';

@ApiTags('admins')
@Controller('admins')
export class AdminController {
  @Post()
  @ApiOperation({ summary: 'Create admin' })
  create(@Body() createAdminDto: CreateAdminDto) {
    return { message: 'Create admin endpoint', data: createAdminDto };
  }

  @Get()
  @ApiOperation({ summary: 'Find all admins' })
  findAll(@Query() findAdminDto: FindAdminDto) {
    return { message: 'Find all admins endpoint', filters: findAdminDto };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find one admin' })
  findOne(@Param('id') id: string) {
    return { message: 'Find one admin endpoint', id };
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update admin' })
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return { message: 'Update admin endpoint', id, data: updateAdminDto };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove admin' })
  remove(@Param('id') id: string) {
    return { message: 'Remove admin endpoint', id };
  }
} 