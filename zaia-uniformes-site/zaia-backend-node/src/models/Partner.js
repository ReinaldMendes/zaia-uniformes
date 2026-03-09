import { Schema, model } from 'mongoose';

const PartnerSchema = new Schema({
  name: { // Usado para o 'alt' da imagem e identificação
    type: String,
    required: true,
  },
  imageUrl: { // URL da imagem vinda do Cloudinary
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Partner = model('Partner', PartnerSchema);
export default Partner;