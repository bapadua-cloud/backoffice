import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { Role } from './entities/role.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async findByEmail(email: string): Promise<Admin | null> {
    return this.adminRepository.findOne({ 
      where: { email },
      relations: ['roles']
    });
  }

  async create(createAdminDto: CreateAdminDto): Promise<Admin> {
    const existingAdmin = await this.findByEmail(createAdminDto.email);
    if (existingAdmin) {
      throw new ConflictException('Email já cadastrado');
    }

    const admin = new Admin({
      ...createAdminDto,
      isRoot: false,
      isActive: true,
    });

    return this.adminRepository.save(admin);
  }

  async createRoot(): Promise<Admin> {
    const existingRoot = await this.findByEmail('admin@admin.com');
    if (existingRoot) {
      return existingRoot;
    }

    let adminRole = await this.roleRepository.findOne({ 
      where: { name: 'gerenciar_administradores' }
    });

    if (!adminRole) {
      adminRole = await this.roleRepository.save(
        this.roleRepository.create({
          name: 'gerenciar_administradores',
          description: 'Permite gerenciar administradores do sistema',
          isActive: true,
        })
      );
    }

    const admin = new Admin({
      name: 'Administrador Root',
      email: 'admin@admin.com',
      password: 'admin123',
      isRoot: true,
      isActive: true,
      roles: [adminRole],
    });

    return this.adminRepository.save(admin);
  }
} 