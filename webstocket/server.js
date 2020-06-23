const { Server } = require('ws');
const wsServer = new Server({ port: 8888 });

wsServer.on('connection', (socket) => {
  socket.on('message', (mes) => {
    console.log(mes);
    socket.send('服务器发给你的');
  });
});
