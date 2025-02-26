### **Requisitos Funcionais:**

#### **1. Autenticação do Administrador:**
1. **RF01 - Login de Administrador:**
   - O sistema deve permitir que administradores autenticados façam login com e-mail e senha.
   - Após o login, o sistema deve gerar e retornar um token JWT válido por um período definido (ex: 1 hora).

2. **RF02 - Validação de Token:**
   - Todas as requisições às rotas protegidas devem incluir um token JWT válido no cabeçalho `Authorization`.
   - O sistema deve validar o token antes de permitir o acesso a qualquer funcionalidade protegida.

---

#### **2. Cadastro de Administradores:**
3. **RF03 - Cadastro de Novo Administrador:**
   - O sistema deve permitir que administradores autenticados com a role **"gerenciar_administradores"** cadastrem novos administradores.
   - Campos obrigatórios:
     - Nome completo.
     - E-mail (único no sistema).
     - Senha (mínimo de 8 caracteres).
     - Status (ativo/inativo, padrão: ativo).
   - O sistema deve criptografar a senha antes de armazená-la no banco de dados.

4. **RF04 - Atribuição de Roles:**
   - Durante o cadastro, o sistema deve permitir a atribuição de 1..n roles ao novo administrador.
   - Apenas o administrador root pode atribuir ou revogar roles.

5. **RF05 - Validação de Dados:**
   - O sistema deve validar os dados fornecidos durante o cadastro:
     - Nome: Campo obrigatório.
     - E-mail: Formato válido e único no sistema.
     - Senha: Mínimo de 8 caracteres.
     - Roles: Pelo menos uma role deve ser atribuída (exceto para o administrador root).

6. **RF06 - Confirmação de Cadastro:**
   - Após o cadastro bem-sucedido, o sistema deve retornar uma confirmação com os dados do administrador cadastrado (exceto a senha).

---

#### **3. Gerenciamento de Administradores:**
7. **RF07 - Listagem de Administradores:**
   - O sistema deve permitir que administradores autenticados com a role **"gerenciar_administradores"** listem todos os administradores cadastrados.
   - A listagem deve incluir:
     - Nome.
     - E-mail.
     - Status.
     - Data de criação.
     - Roles atribuídas.

8. **RF08 - Edição de Administrador:**
   - O sistema deve permitir que administradores autenticados com a role **"gerenciar_administradores"** editem os dados de um administrador existente.
   - Campos editáveis:
     - Nome.
     - E-mail (desde que único no sistema).
     - Status.
     - Senha (com criptografia).
   - Apenas o administrador root pode editar as roles de outros administradores.

9. **RF09 - Exclusão de Administrador:**
   - O sistema deve permitir que administradores autenticados com a role **"gerenciar_administradores"** excluam um administrador existente.
   - O administrador root não pode ser excluído.

10. **RF10 - Ativação/Desativação de Administrador:**
    - O sistema deve permitir que administradores autenticados com a role **"gerenciar_administradores"** ativem ou desativem um administrador existente.
    - O administrador root não pode ser desativado.

---

#### **4. Controle de Acesso Baseado em Roles:**
11. **RF11 - Definição de Roles:**
    - O sistema deve permitir que o administrador root defina as roles disponíveis no sistema.
    - Exemplos de roles:
      - **gerenciar_administradores:** Permite cadastrar, editar, excluir e visualizar outros administradores.
      - **visualizar_conteudo_restrito:** Permite acessar conteúdo restrito do sistema.
      - **gerenciar_usuarios:** Permite gerenciar usuários comuns do sistema.
      - **gerar_relatorios:** Permite gerar relatórios do sistema.

12. **RF12 - Atribuição de Roles:**
    - O sistema deve permitir que o administrador root atribua ou revogue roles para outros administradores.
    - Um administrador pode ter múltiplas roles.

13. **RF13 - Verificação de Permissões:**
    - O sistema deve verificar as roles do administrador autenticado antes de permitir o acesso a qualquer funcionalidade protegida.
    - Exemplo:
      - Apenas administradores com a role **"visualizar_conteudo_restrito"** podem acessar conteúdo restrito.

---

#### **5. Auditoria e Logs:**
14. **RF14 - Log de Cadastro:**
    - O sistema deve registrar em um log de auditoria todas as operações de cadastro de administradores, incluindo:
      - ID do administrador que realizou a operação.
      - Data e hora da operação.
      - Dados do administrador cadastrado.

15. **RF15 - Log de Edição/Exclusão:**
    - O sistema deve registrar em um log de auditoria todas as operações de edição ou exclusão de administradores, incluindo:
      - ID do administrador que realizou a operação.
      - Data e hora da operação.
      - Dados alterados ou excluídos.

---

#### **6. Administrador Root:**
16. **RF16 - Criação do Administrador Root:**
    - O sistema deve criar automaticamente o administrador root durante a inicialização (seed) ou permitir sua criação manual por um superusuário.
    - O administrador root tem permissões totais e não pode ser excluído ou desativado.

17. **RF17 - Imutabilidade do Administrador Root:**
    - O e-mail do administrador root não pode ser alterado.
    - O administrador root não pode perder a role **"gerenciar_administradores"**.

---

### **Resumo dos Requisitos Funcionais:**
| **ID**  | **Requisito Funcional**                          | **Descrição**                                                                 |
|---------|-------------------------------------------------|-------------------------------------------------------------------------------|
| RF01    | Login de Administrador                          | Autenticação com e-mail e senha, retornando um token JWT.                     |
| RF02    | Validação de Token                              | Verificação do token JWT em requisições protegidas.                           |
| RF03    | Cadastro de Novo Administrador                  | Cadastro de administradores com campos obrigatórios e criptografia de senha.  |
| RF04    | Atribuição de Roles                             | Atribuição de 1..n roles durante o cadastro.                                  |
| RF05    | Validação de Dados                              | Validação de nome, e-mail, senha e roles.                                     |
| RF06    | Confirmação de Cadastro                         | Retorno dos dados do administrador cadastrado (exceto senha).                 |
| RF07    | Listagem de Administradores                     | Listagem de todos os administradores cadastrados.                             |
| RF08    | Edição de Administrador                         | Edição de dados de administradores existentes.                                |
| RF09    | Exclusão de Administrador                       | Exclusão de administradores (exceto o root).                                  |
| RF10    | Ativação/Desativação de Administrador           | Ativação ou desativação de administradores (exceto o root).                   |
| RF11    | Definição de Roles                              | Definição das roles disponíveis no sistema.                                   |
| RF12    | Atribuição de Roles                             | Atribuição ou revogação de roles para administradores.                        |
| RF13    | Verificação de Permissões                       | Verificação das roles antes de permitir acesso a funcionalidades protegidas.  |
| RF14    | Log de Cadastro                                 | Registro de operações de cadastro em log de auditoria.                        |
| RF15    | Log de Edição/Exclusão                          | Registro de operações de edição ou exclusão em log de auditoria.              |
| RF16    | Criação do Administrador Root                   | Criação automática ou manual do administrador root.                           |
| RF17    | Imutabilidade do Administrador Root             | Restrições sobre a edição ou exclusão do administrador root.                  |

