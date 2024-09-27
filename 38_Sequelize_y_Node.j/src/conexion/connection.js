const { Sequelize } = require("sequelize"); // importamos la dependencia sequelize
const dotenv = require("dotenv");
dotenv.config();

// variables de entorno para una correcta configuracion de los parametros de conexion: 
const sequelize = new Sequelize(
    process.env.DATABASE, // indicamos la base de datos a conectarnos
    process.env.DBUSER, // el usuario MySQL definido en la instalacion del motor, usualmente root. 
    process.env.PASSWORD, // la contraseña correspondiente a MySQL
    {
        host: process.env.HOST, // definimos el host de la bb.dd. Si es local, directamente ponemos localhost.
        dialect: "mysql", // le indicamos el dialecto a utilizar. En nuestro caso mysql (qu tipo de sitaxis)
        pool: {
            max: 5, // Máximo de conexiones en el grupo
            min: 0, // Mínimo de conexiones en el grupo
            acquire: 30000, // Tiempo máximo, para liberar conexiones inactivas
            idle: 10000, // Tiempo máximo para cerrar conexiones inactivas
        },
    }
);

// exportamos como un modulo js para utilizarlo desde el archivo principal de nuestro proyecto: 
module.exports = sequelize;