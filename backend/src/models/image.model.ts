import { Schema, model, Document } from "mongoose";

// Define an interface for the Image model
interface IImage extends Document {
  name: string;
  image: {
    data: string;
    contentType: string;
  };
}

// Define the schema for Image model
const imageSchema = new Schema<IImage>({
  name: { type: String, required: true },
  image: {
    data: { type: String, required: true },
    contentType: { type: String, required: true },
  },
});

// Create and export the model based on the schema
const ImageModel = model<IImage>("Image", imageSchema);

export default ImageModel;
