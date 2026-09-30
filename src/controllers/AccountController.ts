import { Request, Response, NextFunction, Router } from 'express';
import { AccountService } from '../services/AccountService';
import { CreateAccountDTO } from '../dto/CreateAccountDTO';
import { UpdateAccountDTO } from '../dto/UpdateAccountDTO';
import { validationMiddleware } from '../middlewares/validation';

const router = Router();

export class AccountController {
  private accountService: AccountService;

  constructor(accountService: AccountService) {
    this.accountService = accountService;
    this.initRoutes();
  }

  private initRoutes(): void {
    router.get('/', this.getAllAccounts.bind(this));
    router.get('/:id', this.getAccountById.bind(this));
    router.post('/', validationMiddleware(CreateAccountDTO), this.createAccount.bind(this));
    router.put('/:id', validationMiddleware(UpdateAccountDTO), this.updateAccount.bind(this));
    router.delete('/:id', this.deleteAccount.bind(this));
    router.get('/:id/balance', this.getBalance.bind(this));
  }

  public getRouter(): Router {
    return router;
  }

  private async getAllAccounts(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const clientId = req.query.clientId as string | undefined;

      const accounts = await this.accountService.getAllAccounts(page, limit, clientId);
      res.status(200).json({
        success: true,
        data: accounts,
        pagination: {
          page,
          limit,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  private async getAccountById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const account = await this.accountService.getAccountById(id);

      if (!account) {
        res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: account,
      });
    } catch (error) {
      next(error);
    }
  }

  private async createAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountData: CreateAccountDTO = req.body;
      const newAccount = await this.accountService.createAccount(accountData);

      res.status(201).json({
        success: true,
        message: 'Cuenta creada exitosamente',
        data: newAccount,
      });
    } catch (error) {
      next(error);
    }
  }

  private async updateAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const updateData: UpdateAccountDTO = req.body;

      const updatedAccount = await this.accountService.updateAccount(id, updateData);

      if (!updatedAccount) {
        res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada para actualizar',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Cuenta actualizada exitosamente',
        data: updatedAccount,
      });
    } catch (error) {
      next(error);
    }
  }

  private async deleteAccount(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const deleted = await this.accountService.deleteAccount(id);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada para eliminar',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Cuenta eliminada exitosamente',
      });
    } catch (error) {
      next(error);
    }
  }

  private async getBalance(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const balance = await this.accountService.getBalance(id);

      if (balance === null) {
        res.status(404).json({
          success: false,
          message: 'Cuenta no encontrada',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: {
          accountId: id,
          balance,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}