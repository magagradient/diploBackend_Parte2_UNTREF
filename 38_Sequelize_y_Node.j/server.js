const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

// configurar sequelize para conectarme
const sequelize = require("./src/conexion/connection"); // para la conexion 
const Product = require("./src/modelos/product"); // traer los productos

app.get('/productos', async (req, res) => {
    try {
        await sequelize.authenticate();
        await Product.sync();

        const allProducts = await Product.findAll();
        const allProductsData = allProducts.map((product) => product.dataValues);
        res.json(allProductsData);
    } catch (error) {
        res.status(500).json({ error: "Error al conectar o consultar la base de datos", 
        descrption: error.message });
    } finally {
        sequelize.close();
    }
});

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