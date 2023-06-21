import { Db, MongoClient } from "mongodb";

class MongoSingleton {
  private static instance: MongoSingleton;
  private client: MongoClient;
  public db: Db;

  private constructor() {
    // Configuração da conexão com o MongoDB
    if (!process.env.MONGO_URL) {
      throw new Error("MONGO URL NOT DEFINED");
    }

    const url = process.env.MONGO_URL;
    const dbName = "party404";

    this.client = new MongoClient(url);
    this.db = this.client.db(dbName);

    // Conectar ao MongoDB
    this.connect(dbName);
  }

  private async connect(dbName: string): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(dbName);
      console.log("Conexão com o MongoDB estabelecida com sucesso.");
    } catch (error) {
      console.error("Erro ao conectar ao MongoDB:", error);
      throw error;
    }
  }

  public static getInstance(): MongoSingleton {
    if (!MongoSingleton.instance) {
      MongoSingleton.instance = new MongoSingleton();
    }

    return MongoSingleton.instance;
  }
}

// Uso do singleton
const mongoSingleton = MongoSingleton.getInstance();
const db = mongoSingleton.db;

// Exporte o objeto `db` para usar em outras partes do seu código
export default db;