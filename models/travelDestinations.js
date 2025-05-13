import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const TravelDestination = sequelize.define('TravelDestination', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    // images: {
    //     type: DataTypes.JSON,
    //     allowNull: true
    // },

    images: {
        type: DataTypes.TEXT,
        allowNull: true,
        get() {
            const rawValue = this.getDataValue('images');
            return rawValue ? JSON.parse(rawValue) : null;
        },
        set(value) {
            this.setDataValue('images', JSON.stringify(value));
        },
    },

    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    startDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },

    caption: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    rating: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: true,
        defaultValue: null,
    },

    price: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    badge: {
        type: DataTypes.ENUM('POPULAR', 'TOP-RATED', 'NEW'),
        allowNull: true,
        defaultValue: null,
    },
}, {
    tableName: 'travel_destinations',
    timestamps: true, // включает createdAt и updatedAt
});

export default TravelDestination;
