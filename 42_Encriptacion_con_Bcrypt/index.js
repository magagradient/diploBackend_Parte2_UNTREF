const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');

const users = []; // Arreglo en memoria para almacenar usuarios (temporal, no persiste en base de datos).

app.use(express.json()); // Middleware que permite manejar JSON en las peticiones HTTP.

app.get('/', (req, res) => {
    res.json({ message: 'bienvenidos a la api' });  // Respuesta JSON que indica un mensaje de bienvenida.
});


app.post('/register', async (req, res) => {
    const { email, password } = req.body; // Se extraen email y password del cuerpo de la petición.


    const hash = await bcryptjs.hash(password, 12) // Se encripta la contraseña usando bcryptjs con un salt de 12 rondas.


    const user = { // Se crea un nuevo objeto usuario.
        id: Date.now(), // Se asigna un id basado en la marca de tiempo actual.
        email, // Se almacena el email proporcionado.
        password: hash, // Se imprime el arreglo de usuarios en la consola.
    };

    users.push(user);
    console.log(users);

    res.status(201).json({ message: `Se creo un usuario con el id: ${user.id}` });
});

// Ruta POST para el inicio de sesión.
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = users.find(user => user.email == email); // Se busca si el usuario con el email existe en el arreglo.

    // Si no existe el usuario:
    // Responde con un error 404 si no se encuentra el email.
    if (!user) {
        return res.status(404).json({ message: 'no existe el email' });
    };

    const result = await bcryptjs.compare(password, user.password); // Compara la contraseña proporcionada con la encriptada.

     // Si la contraseña no coincide:
    if (!result) {
        return res.status(404).json({ message: 'la contraseña es incorrecta' });
    }

    res.json({ message: `Inicio sesion el usuario: ${user.id}` }); // Respuesta indicando que el inicio de sesión fue exitoso.
});

const PORT = 3000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));


// Este código define una API básica con rutas para registrar usuarios y permitirles iniciar sesión. Al registrar un usuario, la contraseña se encripta usando bcryptjs y se almacena junto con el email en un arreglo en memoria. Al iniciar sesión, se verifica que el email exista y que la contraseña coincida con la encriptada antes de permitir el acceso.