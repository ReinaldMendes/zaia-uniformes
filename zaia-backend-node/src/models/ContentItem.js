import mongoose from 'mongoose';

const ContentItemSchema = new mongoose.Schema({
  // Ex: 'hero_title', 'cta_button_text', etc.
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  
  // Ex: 'Soluções Contábeis Inteligentes'
  value: {
    type: String,
    required: true,
  },

  // Ex: 'text', 'url', 'image_path'
  type: {
    type: String,
    default: 'text',
  },
});

const ContentItem = mongoose.model('ContentItem', ContentItemSchema);

export default ContentItem;