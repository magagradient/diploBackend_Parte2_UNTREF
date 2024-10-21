const fs = require('fs')

function leerDatabase() {
  const datos = fs.readFileSync(__dirname + process.env.DATABASE_PATH, 'utf8')
  const sitioDATABASE = JSON.parse(datos)
        return sitioDATABASE
}

function guardarDatabase(picoli) {
  const datos = JSON.stringify(picoli)
        fs.writeFileSync(__dirname + process.env.DATABASE_PATH, datos)
}

module.exports = { leerDatabase, guardarDatabase }