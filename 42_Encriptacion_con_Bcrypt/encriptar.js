const bcryptjs = require('bcryptjs');  // Se importa la librería 'bcryptjs' para manejar la encriptación de contraseñas.

const encriptar = async () => { // Función asíncrona para encriptar una contraseña.
    const password = "Athg45-.2e"; // Contraseña que se desea encriptar.
    const hash = await bcryptjs.hash(password, 12);  // Se encripta la contraseña usando bcryptjs con un salt de 12 rondas.
    console.log(hash);
};

// encriptar();

const validar = async () => { // Función asíncrona para validar si una contraseña coincide con un hash encriptado.
    const hash = "$2a$12$NyAd43RcFJckFd5fQjdYMOmq4IEhFhNaQ7gImObx8uUlfUdqlZNPO"; // Contraseña en texto plano que se quiere validar
    const password = "Athg45-.2e";  // Contraseña en texto plano que se quiere validar.

    const result = await bcryptjs.compare(password, hash); // Se compara la contraseña con el hash para ver si coinciden.

    console.log(result);  // Imprime 'true' si la contraseña es válida, de lo contrario 'false'.
};


validar();

