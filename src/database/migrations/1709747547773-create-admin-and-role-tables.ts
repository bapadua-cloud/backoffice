import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateAdminAndRoleTables1709747547773 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela de roles
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '50',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Criar tabela de admins
    await queryRunner.createTable(
      new Table({
        name: 'admins',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'is_active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'is_root',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );

    // Criar tabela de relacionamento admin_roles
    await queryRunner.createTable(
      new Table({
        name: 'admin_roles',
        columns: [
          {
            name: 'admin_id',
            type: 'uuid',
          },
          {
            name: 'role_id',
            type: 'uuid',
          },
        ],
      }),
      true,
    );

    // Criar foreign keys
    await queryRunner.createForeignKey(
      'admin_roles',
      new TableForeignKey({
        columnNames: ['admin_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'admins',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'admin_roles',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
      }),
    );

    // Criar índices
    await queryRunner.createIndex(
      'admins',
      new TableIndex({
        name: 'IDX_ADMIN_EMAIL',
        columnNames: ['email'],
        isUnique: true,
      }),
    );

    await queryRunner.createIndex(
      'roles',
      new TableIndex({
        name: 'IDX_ROLE_NAME',
        columnNames: ['name'],
        isUnique: true,
      }),
    );

    // Inserir role padrão de gerenciar_administradores
    await queryRunner.query(`
      INSERT INTO roles (id, name, description)
      VALUES (
        uuid_generate_v4(),
        'gerenciar_administradores',
        'Permite gerenciar administradores e papéis'
      )
    `);

    // Inserir administrador root
    await queryRunner.query(`
      INSERT INTO admins (id, name, email, password, is_root)
      VALUES (
        uuid_generate_v4(),
        'Administrador Root',
        'admin@admin.com',
        '$2b$10$7r20ZXf2dUOQKOHE0DuYVeIzPcBRjYMyXWpEJCeGHxqQICESo1IxO',
        true
      )
    `);

    // Vincular role ao admin root
    await queryRunner.query(`
      INSERT INTO admin_roles (admin_id, role_id)
      SELECT a.id, r.id
      FROM admins a, roles r
      WHERE a.email = 'admin@admin.com'
      AND r.name = 'gerenciar_administradores'
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('admin_roles');
    await queryRunner.dropTable('admins');
    await queryRunner.dropTable('roles');
  }
} 