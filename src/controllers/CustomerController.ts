import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CustomerRepository } from '../repository/CustomerRepository';

const errorUser = 'Email already exists! ';
const errorParams = 'You must send user name and email!';

export const createCustomer = async (req: Request, res: Response) => {
  try {
    const customerRepository = getCustomRepository(CustomerRepository);
    const email = req.body.email;
    const name = req.body.name;

    const resultValidateCredentials = await customerRepository.validateParams(
      email,
      name
    );

    if (resultValidateCredentials === false) {
      return res.status(400).json(errorParams);
    }

    const resultSearchUser = await customerRepository.findCustomerByEmail(
      email
    );

    if (resultSearchUser !== null) {
      return res.status(400).json(errorUser);
    }

    const savedUser = await customerRepository.createAndSave(name, email);

    res.status(200).json(savedUser);
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customerRepository = getCustomRepository(CustomerRepository);
    const user = await customerRepository.findCustomerById(req.params.id);

    if (!user) {
      res.status(200).json('User not found!');
    }

    await customerRepository.delete(user);
    return res.status(200).json('User deleted with success!');
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

export const getCustomer = async (req: Request, res: Response) => {
  try {
    const customerRepository = getCustomRepository(CustomerRepository);
    const user = await customerRepository.findCustomerById(req.params.id);

    if (!user) {
      res.status(200).json('User not found!');
    }

    res.status(200).json(user);
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

export const getCustomers = async (req: Request, res: Response) => {
  try {
    const customerRepository = getCustomRepository(CustomerRepository);
    const user = await customerRepository.find(undefined);

    res.status(200).json(user);
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

export const updateCustomer = async (req: Request, res: Response) => {
  try {
    const customerRepository = getCustomRepository(CustomerRepository);
    const user = await customerRepository.findCustomerById(req.params.id);
    const email = req.body.email;
    const name = req.body.name;

    if (!user) {
      res.status(200).json('User not found!');
    }

    const resultValidateCredentials = await customerRepository.validateParams(
      email,
      name
    );

    if (resultValidateCredentials === false) {
      return res.status(400).json(errorParams);
    }

    await customerRepository.update(req.params.id, {
      email: email,
      name: name
    });

    res.status(200).json('User updated with success!');
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};
