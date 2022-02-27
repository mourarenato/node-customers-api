import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../repository/ProductRepository';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const productRepository = getCustomRepository(ProductRepository);
    const data = req.body;

    const resultValidateCredentials = await productRepository.validateParams(
      data
    );

    if (resultValidateCredentials === false) {
      return res.status(400).json('You must send a valid json');
    }

    const savedProduct = await productRepository.createAndSave(data);

    res.status(200).json(savedProduct);
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.findProductById(req.params.id);

    if (!product) {
      res.status(200).json('Product not found!');
    }

    res.status(200).json(product);
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;
    const jump = (page - 1) * limit;

    const productRepository = getCustomRepository(ProductRepository);
    const product = await productRepository.find({
      skip: jump,
      take: limit
    });

    res.status(200).json(product);
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};
