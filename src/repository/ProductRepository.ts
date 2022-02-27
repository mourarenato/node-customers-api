import { EntityRepository, Repository } from 'typeorm';
import { Product } from '../entity/Product';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  createAndSave(data: JSON) {
    const product = new Product();
    product.price = data['price'];
    product.image = data['image'];
    product.brand = data['brand'];
    product.title = data['title'];
    product.reviewScore = data['reviewScore'];
    return this.manager.save(product);
  }

  async findProductById(id: any) {
    const product = await this.createQueryBuilder()
      .select('product')
      .from(Product, 'product')
      .where(`product.id = '${id}'`)
      .getMany();

    if (product?.length > 0) {
      return product;
    }

    return null;
  }

  async validateParams(data: JSON) {
    if (!data) {
      return false;
    }
    return true;
  }
}
