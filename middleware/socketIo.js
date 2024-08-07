// socket.js
const {Server} = require('socket.io');

let io; // Cette variable retiendra l'instance de Socket.IO

// Fonction d'initialisation
function init(httpServer) {
    io = new Server(httpServer, {
        cors: {
            origin: "http://localhost:8100",  // Assurez-vous que ceci correspond à l'URL/port de votre serveur client Angular
            methods: ["GET", "POST", "UPDATE", "DELETE"]
          }
    });

    io.on('connection', (socket) => {
        console.log('Un utilisateur s\'est connecté');

        socket.on('disconnect', () => {
            console.log('Un utilisateur s\'est déconnecté');
        });

        socket.on('statusChange', (data) => {
            console.log('Status Change Reçu:', data);
            io.emit('statusUpdate', data);
            console.log('Status Update Émis:', data);
        });

        // Gérer d'autres événements...
    });

    return io; // Retourne l'instance pour une utilisation ultérieure
}

// Getter pour l'instance Socket.IO
function getIO() {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
}

module.exports = { init, getIO };
