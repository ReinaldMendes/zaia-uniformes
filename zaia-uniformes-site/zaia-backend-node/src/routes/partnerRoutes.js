import express from 'express';
import { getAllPartners, createPartner, deletePartner } from '../controllers/partnerController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { adminMiddleware } from '../middleware/adminMiddleware.js';
import upload from '../config/multerConfig.js';

const router = express.Router();

// Rota pública para listar os parceiros
router.get('/', getAllPartners);

// Rotas de admin para gerenciar parceiros
router.post('/', authMiddleware, adminMiddleware, upload.single('logoFile'), createPartner);
router.delete('/:id', authMiddleware, adminMiddleware, deletePartner);

export default router;