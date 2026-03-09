import Partner from '../models/Partner.js';

// Listar todos os parceiros
export const getAllPartners = async (req, res) => {
  try {
    const partners = await Partner.find().sort({ createdAt: 'desc' });
    res.status(200).json(partners);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar parceiros.', error: error.message });
  }
};

// Criar um novo parceiro (com upload de imagem)
export const createPartner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'A imagem do logo é obrigatória.' });
    }
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'O nome do parceiro é obrigatório.' });
    }

    const newPartner = new Partner({
      name,
      imageUrl: req.file.path, // URL vinda do Cloudinary/multer
    });

    await newPartner.save();
    res.status(201).json({ message: 'Parceiro criado com sucesso!', partner: newPartner });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar parceiro.', error: error.message });
  }
};

// Deletar um parceiro
export const deletePartner = async (req, res) => {
  try {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
      return res.status(404).json({ message: 'Parceiro não encontrado.' });
    }
    // Opcional: deletar a imagem do Cloudinary aqui para economizar espaço
    res.status(200).json({ message: 'Parceiro deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao deletar parceiro.', error: error.message });
  }
};