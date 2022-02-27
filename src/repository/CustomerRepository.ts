import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entity/Customer';
import { ICustomer } from '../ICustomer';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  createAndSave(name: string, email: string) {
    const customer: ICustomer = new Customer();
    customer.name = name;
    customer.email = email;
    return this.manager.save(customer);
  }

  delete(customer: any) {
    return this.manager.delete(Customer, customer);
  }

  async findCustomerByEmail(email: string) {
    const customerLogin = await this.createQueryBuilder()
      .select('customer')
      .from(Customer, 'customer')
      .where(`customer.email = '${email}'`)
      .getMany();

    if (customerLogin?.length > 0) {
      return customerLogin;
    }

    return null;
  }

  async findCustomerById(id: any) {
    const customerLogin = await this.createQueryBuilder()
      .select('customer')
      .from(Customer, 'customer')
      .where(`customer.id = '${id}'`)
      .getMany();

    if (customerLogin?.length > 0) {
      return customerLogin;
    }

    return null;
  }

  async validateParams(email: string, name: string) {
    if (!email || !name) {
      return false;
    }
    return true;
  }
}
