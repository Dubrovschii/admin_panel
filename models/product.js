import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Product = sequelize.define('Product', {
    product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    product_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    product_subcategory: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    product_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    product_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    product_descr: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    // product_img: {
    //     type: DataTypes.JSON,  // Массив путей к изображениям
    //     allowNull: true,
    //     defaultValue: [],
    // },
    product_img: {
        type: DataTypes.JSONB,
        allowNull: true,
        defaultValue: [],
    },
    // get() {
    //     const rawValue = this.getDataValue('product_img');
    //     return rawValue ? JSON.parse(rawValue) : [];
    // },
    // set(val) {
    //     this.setDataValue('product_img', JSON.stringify(val));
    // },

    product_rating: {
        type: DataTypes.DECIMAL(3, 2),
        defaultValue: 0.0,
    },
}, {
    tableName: 'backend_product',
    timestamps: false,
});

export default Product;
