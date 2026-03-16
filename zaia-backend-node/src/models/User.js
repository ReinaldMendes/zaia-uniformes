import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // MELHORIA: Remove espaços em branco do início e fim
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true, // MELHORIA: Garante que o e-mail seja sempre minúsculo
      validate: {
        validator(v) {
          // CORREÇÃO: Adicionado .test(v) para validar o e-mail
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: "Por favor, insira um e-mail válido.", // MELHORIA: Mensagem de erro customizada
      },
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator(v) {
          // CORREÇÃO: Adicionado .test(v) e removido regex redundante
          // A senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula e 1 número.
          return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(v);
        },
        message: "A senha não atende aos requisitos de segurança.",
      },
    },
    role: {
      type: String,
      enum: ["USER", "ADMINISTRATOR"],
      default: "USER",
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para hashear a senha ANTES de salvar
userSchema.pre("save", async function (next) {
  // CORREÇÃO: Hashear a senha apenas se ela foi modificada
  if (!this.isModified("password")) {
    return next();
  }
  
  // Gera o hash da senha
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Método para comparar a senha candidata com a senha hasheada
userSchema.methods.isValidPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

export default User;