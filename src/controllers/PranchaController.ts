import { Request, Response } from 'express';
import PranchaRepository from '../repositories/PranchaRepository';

class PranchaController {
  async getAll(req: Request, res: Response) {
    try {
      const pranchas = await PranchaRepository.findAll();
      res.status(200).json(pranchas);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao consultar as pranchas', error });
    }
  }

  async create(req: Request, res: Response) {
    const { quantidade, tamanhoEmPes, cor } = req.body;

    if (!quantidade || !tamanhoEmPes || !cor) {
      return res.status(400).json({ message: 'Dados incompletos' });
    }

    try {
      const prancha = await PranchaRepository.create({ quantidade, tamanhoEmPes, cor });
      res.status(201).json(prancha);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao cadastrar a prancha', error });
    }
  }
}

export default new PranchaController();

