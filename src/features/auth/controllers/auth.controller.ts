import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { validateLogin, validateRegister } from '../validations/auth.validation';
import { success, error } from '../../../utils/respons';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  register = async (req: Request, res: Response): Promise<void> => {
    const validation = validateRegister(req.body);

    if (!validation.valid) {
      res.status(400).json(error(validation.error));
      return;
    }

    try {
      const result = await this.authService.register(validation.data);
      res.status(201).json(success('Registrasi berhasil', result));
    } catch (err: any) {
      res.status(409).json(error(err.message));
    }
  };

  login = async (req: Request, res: Response): Promise<void> => {
    const validation = validateLogin(req.body);

    if (!validation.valid) {
      res.status(400).json(error(validation.error));
      return;
    }

    try {
      const result = await this.authService.login(validation.data);
      res.json(success('Login berhasil', result));
    } catch (err: any) {
      res.status(401).json(error(err.message));
    }
  };
}
