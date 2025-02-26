import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsBoolean, IsOptional } from 'class-validator';

export class CreateAdminDto {
  @ApiProperty({
    description: 'Nome completo do administrador',
    example: 'João Silva',
  })
  @IsString()
  @MinLength(3)
  name: string;

  @ApiProperty({
    description: 'Email do administrador',
    example: 'joao.silva@empresa.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do administrador',
    example: 'Senha@123',
    minLength: 8,
  })
  @IsString()
  @MinLength(8)
  password: string;

  @ApiProperty({
    description: 'Status do administrador',
    example: true,
    default: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
} 