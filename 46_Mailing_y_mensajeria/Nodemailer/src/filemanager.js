const fs = require('fs')

function leerDatabase() {
  const datos = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf8')
  const sitioDATABASE = JSON.parse(datos)
        return sitioDATABASE
}

function guardarDatabase(datos) {
        fs.writeFileSync(__dirname + process.env.DATABASE_PATH, JSON.stringify(datos))
}

module.exports = { leerDatabase, guardarDatabase }