import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsBoolean, IsOptional, IsArray } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Nome completo do administrador',
    example: 'John Doe',
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres' })
  name: string;

  @ApiProperty({
    description: 'Email do administrador (único no sistema)',
    example: 'john.doe@example.com',
  })
  @IsEmail({}, { message: 'Email inválido' })
  email: string;

  @ApiProperty({
    description: 'Senha do administrador (mínimo 8 caracteres)',
    example: 'senha@123',
    minLength: 8,
  })
  @IsString({ message: 'A senha deve ser uma string' })
  @MinLength(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
  password: string;

  @ApiProperty({
    description: 'Status do administrador (ativo/inativo)',
    example: true,
    default: true,
  })
  @IsBoolean({ message: 'O status deve ser um booleano' })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'IDs das roles atribuídas ao administrador',
    example: ['role-id-1', 'role-id-2'],
    type: [String],
  })
  @IsArray({ message: 'As roles devem ser um array' })
  @IsString({ each: true, message: 'Cada role deve ser uma string' })
  @IsOptional()
  roleIds?: string[];
} 