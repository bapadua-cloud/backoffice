import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { AdminService } from './admin.service';

@Injectable()
export class AdminSeed implements OnApplicationBootstrap {
  constructor(private readonly adminService: AdminService) {}

  async onApplicationBootstrap() {
    await this.createRootAdmin();
  }

  private async createRootAdmin() {
    try {
      await this.adminService.createRoot();
      console.log('✅ Administrador root criado com sucesso');
    } catch (error) {
      console.error('❌ Erro ao criar administrador root:', error.message);
    }
  }
} 