import { EntityRepository, AbstractRepository } from 'typeorm';
import { Admin } from '../entity/Admin';
import { IAdmin } from '../IAdmin';

@EntityRepository(Admin)
export class AdminRepository extends AbstractRepository<Admin> {
  createAndSave(email: string, password: string) {
    const admin: IAdmin = new Admin();
    admin.email = email;
    admin.password = password;
    return this.manager.save(admin);
  }

  async findAdminByEmail(email: string) {
    const adminLogin = await this.repository
      .createQueryBuilder()
      .select('admin')
      .from(Admin, 'admin')
      .where(`admin.email = '${email}'`)
      .getMany();

    if (adminLogin?.length > 0) {
      return adminLogin;
    }

    return null;
  }

  async findAdmin(email: string, cryptPassword: string) {
    const admin = await this.repository
      .createQueryBuilder()
      .select('admin')
      .from(Admin, 'admin')
      .where(`admin.password = '${cryptPassword}'`)
      .andWhere(`admin.email = '${email}'`)
      .getMany();

    if (admin.length == 0 || admin == null) {
      return false;
    }
    return admin;
  }

  async validateLoginAndPassword(login: string, password: string) {
    if (!login || !password) {
      return false;
    }
    return true;
  }
}
