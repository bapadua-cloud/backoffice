import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { 
  CreateAdminDto, 
  UpdateAdminDto, 
  FindAdminDto, 
  AdminResponseDto 
} from './dto';
import { AdminService } from './admin.service';

@ApiTags('Administradores')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Criar novo administrador' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Administrador criado com sucesso',
    type: AdminResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email já cadastrado',
  })
  create(@Body() createAdminDto: CreateAdminDto): AdminResponseDto {
    return new AdminResponseDto({
      id: 'temp-id',
      ...createAdminDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [],
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Listar administradores' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de administradores',
    type: [AdminResponseDto],
  })
  findAll(@Query() findAdminDto: FindAdminDto): AdminResponseDto[] {
    return [
      new AdminResponseDto({
        id: 'temp-id',
        name: 'Admin Teste',
        email: 'admin@test.com',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        roles: [],
      }),
    ];
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Buscar administrador por ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Administrador encontrado',
    type: AdminResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Administrador não encontrado',
  })
  findOne(@Param('id') id: string): AdminResponseDto {
    return new AdminResponseDto({
      id,
      name: 'Admin Teste',
      email: 'admin@test.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [],
    });
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Atualizar administrador' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Administrador atualizado com sucesso',
    type: AdminResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Administrador não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Email já cadastrado',
  })
  update(
    @Param('id') id: string,
    @Body() updateAdminDto: UpdateAdminDto,
  ): AdminResponseDto {
    return new AdminResponseDto({
      id,
      name: 'Admin Atualizado',
      email: 'admin.updated@test.com',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      roles: [],
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remover administrador' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Administrador removido com sucesso',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Administrador não encontrado',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Não é possível remover o administrador root',
  })
  remove(@Param('id') id: string): void {
    return;
  }
} 