import express from 'express';
import {
  createContent,
  getAllContent,
  getContentByKey,
  updateContent,
  deleteContent,
  updateImageContent // <--- ADICIONADO AQUI
} from '../controllers/contentController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// --- Rotas Públicas ---
// Qualquer visitante pode carregar o conteúdo do site
router.get('/', getAllContent);
router.get('/:key', getContentByKey);


// --- Rotas de Admin ---
// Aplica middlewares de segurança para as rotas de modificação abaixo
router.post('/', authMiddleware, adminMiddleware, createContent);
router.put('/:key', authMiddleware, adminMiddleware, updateContent);
router.delete('/:key', authMiddleware, adminMiddleware, deleteContent);

// Rota para upload de imagem
router.post('/upload/image', 
  authMiddleware, 
  adminMiddleware, 
  upload.single('imageFile'), // 'imageFile' é o nome do campo do formulário
  updateImageContent
);

export default router;