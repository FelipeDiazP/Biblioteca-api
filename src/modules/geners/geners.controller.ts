import { Request, Response } from "express";
import { GenersService } from "./geners.service";

export class GenersController {
    private readonly genersService = new GenersService();

    create = async (req: Request, res: Response): Promise<void> => {
        const geners = await this.genersService.create(req.body);
        res.status(201).json(geners);
    };

    findAll = async (req: Request, res: Response): Promise<void> => {
        const available = req.query.available as string | undefined;
        const geners = await this.genersService.findAll(available);
        res.status(200).json(geners);
    };

    update = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        const geners = await this.genersService.update(req.params.id, req.body);
        res.status(200).json(geners);
    };

    delete = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
        await this.genersService.delete(req.params.id);
        res.status(204).send();
    };
}