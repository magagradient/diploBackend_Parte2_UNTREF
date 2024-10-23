function generarNroRandom() {
    return Math.floor(Math.random() * (999999 - 100000 + 1) + 100000)
}

function generarUUID() {
    const { v4: uuidv4 } = require('uuid')
    return uuidv4()
}

function generarTStamp() {
    return new Date().getTime()
}

function generarNuevoUsuario(email, password) {
    return nuevoUsuario = {
        usrId: generarUUID(),
        email: email,
        password: password,
        validationCode: generarNroRandom(),
        dateSent: generarTStamp(),
        dateValidated: ''
    }
}

module.exports = { generarNroRandom, generarUUID, generarTStamp, generarNuevoUsuario }