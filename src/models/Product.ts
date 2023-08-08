import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/config'; // Adjust the path
import { Sequelize } from 'sequelize';

interface ProductAttributes {
  id: number;
  name: string;
  description?: string | null;
  price: number;
  quantity: number;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, 'id'> {}

class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description?: string | null;
  public price!: number;
  public quantity!: number;

  // Other model methods or associations can be added here

  // Model initialization
  public static initModel(sequelize: Sequelize): void {
    Product.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.TEXT,
        },
        price: {
          type: DataTypes.FLOAT,
          allowNull: false,
        },
        quantity: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: 'Product',
      }
    );
  }
}

Product.initModel(sequelize);

export default Product;
