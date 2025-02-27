import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entity';
import { Role } from './entities/role.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { AdminSeed } from './admin.seed';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Role])],
  controllers: [AdminController],
  providers: [AdminService, AdminSeed],
  exports: [AdminService],
})
export class AdminModule {} 