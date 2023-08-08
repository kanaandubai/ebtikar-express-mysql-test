import { validationResult } from 'express-validator';
import { Request, Response } from 'express';
import Product from '../models/Product';

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, quantity } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty())  return res.status(400).json({ errors: errors.array() });
    const newProduct = await Product.create({
      name,
      description,
      price,
      quantity,
    });
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating product' });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching products' });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching product' });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
const { name, description, price, quantity } = req.body;
try {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const product = await Product.findByPk(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  if (name) product.name = name;
  if (description) product.description = description;
  if (price) product.price = price;
  if (quantity) product.quantity = quantity;

  await product.save();

  res.status(200).json({ message: 'Product updated successfully', product });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: 'Error updating product' });
}
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    await product.destroy();
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting product' });
  }
};
