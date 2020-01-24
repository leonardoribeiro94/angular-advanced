import { InMemoryDbService } from "angular-in-memory-web-api";

export class InMemoryDataBase implements InMemoryDataBase {
  createDb() {
    const categories = [
      { id: 1, name: "Moradia", description: "Pagamentos de Contas da Casa" },
      { id: 2, name: "Saúde", description: "Plande Saúde e Remédios" },
      { id: 3, name: "Lazer", description: "Cinema, parques, praia, etc" },
      { id: 4, name: "Salário", description: "Trabalhos como freelancer" }
    ];

    return { categories };
  }
}
