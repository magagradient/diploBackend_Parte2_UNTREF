require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app = express()
const { leerDatabase, guardarDatabase } = require('./src/filemanager.js')
const { generarTStamp, generarNuevoUsuario } = require('./src/generadores.js') 
const usersDatabase = leerDatabase()
const PORT = process.env.PORT || 3000

app.listen(PORT, ()=> console.log("Aplicación ejecutándose en el puerto:", PORT))
app.use(cors())
app.use(express.json())
app.use(express.static('frontend'))

app.post("/register", (req, res)=> {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(409).json({error: "El correo electrónico ya ha sido utilizado."})
    }

    const resultado = usersDatabase.find(user => user.email === email)
    if (!resultado) {
        usersDatabase.push(generarNuevoUsuario(email, password))
        guardarDatabase(usersDatabase)
        res.status(201).json(
            {
                message: "Usuario creado exitosamente. Verifique su correo electrónico e ingrese el código de validación.",
                userData: {
                    usrId: nuevoUsuario.usrId,
                    email: nuevoUsuario.email,
                    dateSent: nuevoUsuario.dateSent
                }
            })
        console.table(usersDatabase)
    }
})

app.post("/validate", (req, res)=> {
    const { validationCode, usrId } = req.body

    if (!validationCode || !usrId) {
        return res.status(500).json({message: "Error de servidor. Verifique la información enviada."})
    }

    const idxUsr = usersDatabase.findIndex(usr => usr.usrId === usrId)

    if (idxUsr > -1 && usersDatabase[idxUsr].dateValidated === '') {
        if (usersDatabase[idxUsr].validationCode === parseInt(validationCode)) {
            usersDatabase[idxUsr].dateValidated = generarTStamp()
            guardarDatabase(usersDatabase)
            return res.status(201).json({message: "Usuario validado exitosamente."})
        } else {
            return res.status(403).json({message: "Código inválido. Verifíquelo o solicite uno nuevo."})
        }
    } else {
        return res.status(403).json({message: "El usuario es inválido o ya ha sido validado."})
    }
})

app.get("/database", (req, res)=> {
    console.table(usersDatabase)
    return res.status(200).json(usersDatabase)
})