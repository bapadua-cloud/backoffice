import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class AdminResponseDto {
  @Expose()
  @ApiProperty({
    description: 'ID do administrador',
    example: 'c3ece45f-6851-4b28-b5e9-a236d5665793',
  })
  id: string;

  @Expose()
  @ApiProperty({
    description: 'Nome completo do administrador',
    example: 'John Doe',
  })
  name: string;

  @Expose()
  @ApiProperty({
    description: 'Email do administrador',
    example: 'john.doe@example.com',
  })
  email: string;

  @Expose()
  @ApiProperty({
    description: 'Status do administrador',
    example: true,
  })
  isActive: boolean;

  @Expose()
  @ApiProperty({
    description: 'Data de criação do registro',
    example: '2024-02-26T18:43:08.817Z',
  })
  createdAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Data da última atualização',
    example: '2024-02-26T18:43:08.817Z',
  })
  updatedAt: Date;

  @Expose()
  @ApiProperty({
    description: 'Roles atribuídas ao administrador',
    example: [
      {
        id: 'role-id-1',
        name: 'gerenciar_administradores',
        description: 'Permite gerenciar administradores',
      },
    ],
  })
  roles: Array<{
    id: string;
    name: string;
    description: string;
  }>;

  constructor(partial: Partial<AdminResponseDto>) {
    Object.assign(this, partial);
  }
} 