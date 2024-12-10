import Prancha from '../models/Prancha';

class PranchaRepository {
  async create(pranchaData: { quantidade: number; tamanhoEmPes: number; cor: string }) {
    return Prancha.create(pranchaData);
  }

  async findAll() {
    return Prancha.findAll();
  }
}

export default new PranchaRepository();

