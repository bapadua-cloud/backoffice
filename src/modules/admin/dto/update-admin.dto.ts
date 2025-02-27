import { ApiProperty, PartialType, OmitType } from '@nestjs/swagger';
import { CreateAdminDto } from './create-admin.dto';
import { IsArray, IsBoolean, IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateAdminDto extends PartialType(
  OmitType(CreateAdminDto, ['roleIds'] as const),
) {
  @ApiProperty({
    description: 'IDs das roles atribuídas ao administrador (apenas root pode modificar)',
    example: ['role-id-1', 'role-id-2'],
    type: [String],
    required: false,
  })
  @IsArray({ message: 'As roles devem ser um array' })
  @IsString({ each: true, message: 'Cada role deve ser uma string' })
  @IsOptional()
  roleIds?: string[];
} 