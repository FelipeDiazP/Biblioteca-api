import { Request, Response } from "express";
import { LoanService } from "./loan.service";

export class LoanController {
  private loanService: LoanService;

  constructor() {
    this.loanService = new LoanService();
  }

  create = async (req: Request, res: Response) => {
    const loan = await this.loanService.create(req.body);

    res.status(201).json(loan);
  };

  findAll = async (_req: Request, res: Response) => {
    const loans = await this.loanService.findAll();

    res.status(200).json(loans);
  };

  findById = async (req: Request<{ id: string }>, res: Response) => {
    const loan = await this.loanService.findById(req.params.id);

    res.status(200).json(loan);
  };

  returnLoan = async (req: Request<{ id: string }>, res: Response) => {
    const loan = await this.loanService.returnLoan(req.params.id);

    res.status(200).json(loan);
  };

  delete = async (req: Request<{ id: string }>, res: Response) => {
    await this.loanService.delete(req.params.id);

    res.status(204).send();
  };
}
