require("dotenv").config();
const express = require("express");
const app = express();
const { v4: uuidv4 } = require("uuid");
const { leerDatabase, guardarDatabase } = require("./filemanager.js");

const urlDatabase = leerDatabase();
const port = process.env.PORT || 3000;

app.listen(port, () =>
  console.log("Aplicación ejecutándose en el puerto:", port)
);
app.use(express.json());

function agregarURLaBBDD(datos) {
  const codigoTransaccion = uuidv4(); //obtenemos un código de transacción
  const shortUUID = codigoTransaccion.split("-")[0]; //Generamos el posible código acortado
  console.log(datos?.tulink);
  // Si llega la propiedad 'tulink' en el body, la utilizamos. Si no, utilizamos el código acortado
  const codigoGenerado =
    datos?.tulink === undefined ? shortUUID : datos.tulink.trim();

  // Armamos el objeto newCodigo, lo insertamos en nuestra bb.dd. y lo retornamos como respuesta

  const newcodigo = {
    codigoTransaccion: codigoTransaccion,
    fechaGestion: new Date(),
    usuario: datos.usuario || "",
    sitio: datos.sitio || "",
    codigo: codigoGenerado,
    utiliza: `https://pico.li/${codigoGenerado}`,
    visitas: 0,
  };

  urlDatabase.push(newcodigo);
  guardarDatabase(urlDatabase);
  return (
    newcodigo || { error: 500, message: "Se ha producido un error inesperado." }
  );
}

function buscarEincrementar(codigo, incrementar = false) {
  let indice = urlDatabase.findIndex((url) => url.codigo === codigo);
  console.clear();
  if (incrementar && indice > -1) {
    urlDatabase[indice].visitas++;
    guardarDatabase(urlDatabase);
  }
  return urlDatabase[indice] || undefined;
}

app.get("/validar/:tulink", (req, res) => {});

app.post("/acorta", (req, res) => {});

app.get("/database", (req, res) => {});

app.get("/:codigo", (req, res) => {
  //ruta raíz, que redirecciona la URL acortada al sitio real
});

app.get("*", (req, res) => {
  res
    .status(404)
    .send({ error: 404, message: "No se ha encontrado la ruta indicada." });
});
