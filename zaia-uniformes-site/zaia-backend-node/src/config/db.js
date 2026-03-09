import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // As opções extras não são mais necessárias
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log("✅ MongoDB conectado...");
  } catch (error) {
    console.error("❌ Erro ao conectar MongoDB:", error.message);
    // Em caso de falha na conexão com o DB, encerra a aplicação
    process.exit(1);
  }
};

export default connectDB;