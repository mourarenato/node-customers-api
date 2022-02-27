import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import hash from 'crypto';
import { AdminRepository } from '../repository/AdminRepository';

const errorUser = 'Email or password is wrong!';
const errorLogin = 'You must send user email and password!';

export const signup = async (req: Request, res: Response) => {
  try {
    const adminRepository = getCustomRepository(AdminRepository);

    const resultValidateCredentials =
      await adminRepository.validateLoginAndPassword(
        req.body.email,
        req.body.password
      );

    if (resultValidateCredentials === false) {
      return res.status(400).json(errorLogin);
    }

    const resultSearchUser = await adminRepository.findAdminByEmail(
      req.body.email
    );

    if (resultSearchUser !== null) {
      const errorUser = 'Email already exists! ';
      return res.status(400).json(errorUser);
    }

    const savedUser = await adminRepository.createAndSave(
      req.body.email,
      req.body.password
    );

    res.status(200).json(savedUser);
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const adminRepository = getCustomRepository(AdminRepository);

    const email = req.body.email;
    const password = req.body.password;

    const resultValidateCredentials =
      await adminRepository.validateLoginAndPassword(email, password);

    if (resultValidateCredentials === false) {
      return res.status(400).json(errorLogin);
    }

    const cryptPassword = hash.createHmac('sha256', password).digest('hex');

    const user = await adminRepository.findAdmin(email, cryptPassword);

    if (!user) {
      return res.status(400).json(errorUser);
    }

    const token: string = jwt.sign(
      { id: user },
      process.env.TOKEN_SECRET || 'tokentest',
      {
        expiresIn: 60 * 60 * 24
      }
    );

    return res.status(200).json(token);
  } catch (e) {
    return res.status(500).json(`${e}`);
  }
};

// export const profile = async (req: Request, res: Response) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const resultValidateCredentials = await validateLoginAndPassword(
//       email,
//       password
//     );

//     if (resultValidateCredentials === false) {
//       return res.status(400).json(errorLogin);
//     }

//     const userRepository = getRepository(User);
//     const cryptPassword = JSON.stringify(
//       hash.createHmac('sha256', password).digest('hex')
//     );

//     const user = await findUser(userRepository, email, cryptPassword);

//     if (!user) {
//       return res.status(404).json('No User found!');
//     }
//     return res.json(user);
//   } catch (e) {
//     return res.status(500).json(`${e}`);
//   }
// };

// export const deleteUser = async (req: Request, res: Response) => {
//   try {
//     const email = req.body.email;
//     const password = req.body.password;

//     const resultValidateCredentials = await validateLoginAndPassword(
//       email,
//       password
//     );

//     if (resultValidateCredentials === false) {
//       return res.status(400).json(errorLogin);
//     }

//     const userRepository = getRepository(User);
//     const cryptPassword = JSON.stringify(
//       hash.createHmac('sha256', password).digest('hex')
//     );

//     const user = await findUser(userRepository, email, cryptPassword);

//     if (!user) {
//       return res.status(404).json('No User found!');
//     }

//     const tokenDecoded: JSON = jwtDecode(req.query.API_KEY);

//     if (tokenDecoded.id[0].id !== user[0].id) {
//       return res.status(401).json(`You can just only delete your own user`);
//     }

//     await userRepository.delete(user);
//     return res.status(200).json('User deleted with success!');
//   } catch (e) {
//     return res.status(500).json(`${e}`);
//   }
// };
