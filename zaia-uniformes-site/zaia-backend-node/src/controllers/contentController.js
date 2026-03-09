import ContentItem from '../models/ContentItem.js';

// CREATE: Criar um novo item de conteúdo
export const createContent = async (req, res) => {
  try {
    const { key, value, type } = req.body;
    if (!key || !value) {
      return res.status(400).json({ message: 'A chave (key) e o valor (value) são obrigatórios.' });
    }
    const existingKey = await ContentItem.findOne({ key });
    if (existingKey) {
      return res.status(400).json({ message: 'Esta chave já existe. Use a rota de atualização (PUT) para modificá-la.' });
    }
    const newItem = new ContentItem({ key, value, type });
    await newItem.save();
    res.status(201).json({ message: 'Item de conteúdo criado com sucesso.', item: newItem });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// READ: Obter todos os itens de conteúdo (formatado para o frontend)
export const getAllContent = async (req, res) => {
  try {
    const items = await ContentItem.find();
    // Transforma o array de objetos em um único objeto { key: value }
    const content = items.reduce((acc, item) => {
      acc[item.key] = item.value;
      return acc;
    }, {});
    res.status(200).json(content);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// READ: Obter um item de conteúdo pela chave
export const getContentByKey = async (req, res) => {
    try {
        const item = await ContentItem.findOne({ key: req.params.key });
        if (!item) {
            return res.status(404).json({ message: 'Item de conteúdo não encontrado.' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error: error.message });
    }
};


// UPDATE: Atualizar um item de conteúdo pela chave
export const updateContent = async (req, res) => {
  try {
    const { value } = req.body;
    const updatedItem = await ContentItem.findOneAndUpdate(
      { key: req.params.key },
      { value },
      { new: true, upsert: true } // Se não existir, cria. Útil para o painel admin.
    );
    res.status(200).json({ message: 'Conteúdo atualizado com sucesso.', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// DELETE: Deletar um item de conteúdo pela chave
export const deleteContent = async (req, res) => {
  try {
    const item = await ContentItem.findOneAndDelete({ key: req.params.key });
    if (!item) {
      return res.status(404).json({ message: 'Item de conteúdo não encontrado.' });
    }
    res.status(200).json({ message: 'Item de conteúdo deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};
export const updateImageContent = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Nenhum arquivo enviado.' });
    }

    const { key } = req.body;
    if (!key) {
      return res.status(400).json({ message: 'A chave do conteúdo (key) é obrigatória.' });
    }

    // A URL pública da imagem no Cloudinary está em req.file.path
    const imageUrl = req.file.path;

    const updatedItem = await ContentItem.findOneAndUpdate(
      { key },
      { value: imageUrl },
      { new: true, upsert: true }
    );

    res.status(200).json({ message: 'Imagem salva e conteúdo atualizado.', item: updatedItem });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};