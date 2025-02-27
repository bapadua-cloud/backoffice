import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class FindAdminDto {
  @ApiProperty({
    description: 'Nome do administrador para filtrar',
    example: 'John',
    required: false,
  })
  @IsString({ message: 'O nome deve ser uma string' })
  @IsOptional()
  name?: string;

  @ApiProperty({
    description: 'Email do administrador para filtrar',
    example: 'john.doe@example.com',
    required: false,
  })
  @IsEmail({}, { message: 'Email inválido' })
  @IsOptional()
  email?: string;

  @ApiProperty({
    description: 'Status do administrador para filtrar',
    example: true,
    required: false,
  })
  @Transform(({ value }) => value === 'true')
  @IsBoolean({ message: 'O status deve ser um booleano' })
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    description: 'ID da role para filtrar administradores',
    example: 'role-id-1',
    required: false,
  })
  @IsString({ message: 'O ID da role deve ser uma string' })
  @IsOptional()
  roleId?: string;
} 