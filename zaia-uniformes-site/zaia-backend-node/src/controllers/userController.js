import User from '../models/User.js';

// CREATE: Função para um admin criar um novo usuário (já existente)
export const createUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Nome, email e senha são obrigatórios.' });
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Este email já está em uso.' });
    }
    const user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: 'Novo usuário criado com sucesso.', user });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: 'Dados inválidos.', error: error.message });
    }
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// READ: Obter todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclui a senha da resposta
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// READ: Obter um único usuário pelo ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// UPDATE: Atualizar um usuário pelo ID
export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    // Nota: não permitimos a atualização da senha aqui para simplicidade.
    // Isso geralmente é feito em uma rota separada '/change-password'.

    const updatedUser = await user.save();
    res.status(200).json({ message: 'Usuário atualizado com sucesso.', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// DELETE: Deletar um usuário pelo ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado.' });
    }
    await user.deleteOne(); // Usando deleteOne() no documento
    res.status(200).json({ message: 'Usuário deletado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};