const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura CORS para permitir todas las solicitudes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'], // Puedes ajustar los métodos según tus necesidades
}));


// Agrega un endpoint para mostrar un mensaje en el navegador
app.get('/', (req, res) => {
    res.send('¡El servidor WebSocket está en línea!');
});

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('notification', ({ message, type }) => {
        console.log('Notificación recibida:', message, type);
        io.emit('newNotification', { message, type }); 
    });

    socket.on('disconnect', () => {
        console.log('Usuario desconectado:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Servidor en línea en el puerto 3001');
});
