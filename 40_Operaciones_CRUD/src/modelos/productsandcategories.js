const { DataTypes } = require("sequelize");
const sequelize = require("../conexion/connection"); 

const ProductCategoryView = sequelize.define(
    "ProductCategoryView",
    {
        ProductID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        ProductName: {
            type: DataTypes.STRING,
        },
        CategoryID: {
            type: DataTypes.INTEGER,
        },
        CategoryName: {
            type: DataTypes.STRING,
        },
        QuantityPerUnit: {
            type: DataTypes.STRING,
        },
        UnitPrice: {
            type: DataTypes.DOUBLE,
        },
        UnitsInStock: {
            type: DataTypes.SMALLINT,
        },
    },
    {
        tableName: "productsandcategories",
        timestamps: false,
    }
);

module.exports = ProductCategoryView;