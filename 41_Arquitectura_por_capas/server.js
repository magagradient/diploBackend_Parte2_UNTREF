const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

const sequelize = require("./src/conexion/connection");
const Product = require("./src/models/product");
const Category = require("./src/models/category");
const Employee = require("./src/models/employee");
const ProductCategoryView = require("./src/models/productsandcategories");
const OrderDetailsProductsView = require("./src/models/orderdetailsandproducts");


// middleware:
app.use(express.json());
app.use(async (req, res, next) => {
    try {
        await sequelize.authenticate();
        await Product.sync();
        await Category.sync();
        await Employee.sync();
        next();
    } catch (error) {
        res
            .status(500)
            .json({ error: "Error en el servidor", descrption: error.message });
    }
});

// integrar vistas SQL:
// app.get("/productosycategorias", async (req, res) => {
//     try {
//         const allProducts = await ProductCategoryView.findAll();

//         allProducts.length !== 0
//             ? res.status(200).json(allProducts)
//             : res.status(404).json({ error: "No se encontraron productos." });
//     } catch (error) {
//         res
//             .status(500)
//             .json({ error: "Error en el servidor", description: error.message });
//     }
// });

// vista SQL más información adicional
app.get("/productosycategorias", async (req, res) => {
    try {
        const allProducts = await ProductCategoryView.findAll();

        const response = {
            results: [...allProducts],
            info: {
                dateOfQuery: new Date(),
                totalRecords: allProducts.length || 0,
                database: sequelize.getDatabaseName(),
            },
        };

        allProducts.length !== 0
            ? res.status(200).json(response)
            : res.status(404).json({ error: "No se encontraron productos." });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Error en el servidor", description: error.message });
    }
});

//Vista SQL más información adicional
app.get("/OrderDetailsProductsView", async (req, res) => {
    try {
        const allProducts = await OrderDetailsProductsView.findAll();

        const response = {
            results: [...allProducts],
            info: {
                dateOfQuery: new Date(),
                totalRecords: allProducts.length || 0,
                database: sequelize.getDatabaseName(),
            },
        };

        allProducts.length !== 0
            ? res.status(200).json(response)
            : res.status(404).json({ error: "No se encontraron productos." });
    } catch (error) {
        res
            .status(500)
            .json({ error: "Error en el servidor", description: error.message });
    }
});

app.use("/productos", require('./src/routes/productos.router'));

app.use('/categorias', require('./src/routes/categorias.router'));

const empleadosRouter = require('./src/routes/empleados.router');
app.use(empleadosRouter);

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});

// async function main() {
//     try {
//         await sequelize.authenticate(); // abre la conexion con la base de datos
//         console.log("Conexion exitosa a la base de datos");
//         await Product.sync(); // se ocupa de sincronizar la tabla con nuestro modelo de datos
//         const allProducts = await Product.findAll(); // busca todos los registros
//         // console.log(allProducts);
//         const allProductsData = allProducts.map((product) => product.dataValues); // trae los valores de los productos
//         console.table(allProductsData);
//     } catch (error) {
//         console.log("Error al conectar o consultar la base de datos", error);
// } finally {
//     sequelize.close(); // cerramos la conexion a la base de datos una vez que intercatuamos con la tabla.
// }
// };

// main();