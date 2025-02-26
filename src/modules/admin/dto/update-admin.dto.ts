import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsArray, IsOptional, IsBoolean } from 'class-validator';

export class UpdateAdminDto {
  @ApiProperty({
    description: 'Nome completo do administrador',
    example: 'João Silva',
    required: false,
  })
  @IsString()
  @MinLength(3)
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Email do administrador',
    example: 'joao.silva@empresa.com',
    required: false,
  })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Senha do administrador',
    example: 'Senha@123',
    minLength: 8,
    required: false,
  })
  @IsString()
  @MinLength(8)
  @IsOptional()
  password?: string;

  @ApiProperty({
    description: 'Role IDs',
    example: ['c3ece45f-6851-4b28-b5e9-a236d5665793'],
    required: false,
  })
  @IsArray()
  @IsOptional()
  roleIds?: string[];

  @ApiProperty({
    description: 'Status do administrador',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 