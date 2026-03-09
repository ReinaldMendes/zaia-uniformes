import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configura o Cloudinary com as credenciais do .env
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

// Configura o armazenamento, dizendo para salvar na pasta 'contabilizetech'
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'contabilizetech', // Nome da pasta no Cloudinary
    allowed_formats: ['jpg', 'png', 'jpeg', 'gif', 'webp'],
  },
});

// Cria a instância do multer que usaremos nas rotas
const upload = multer({ storage: storage });

export default upload;