import WebSocket, { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  console.log('New client connected');
  
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('Received: ' + message);
  });

  ws.on('close', function close() {
    console.log('Client disconnected');
  });
});

console.log('WebSocket server is running on ws://localhost:8080');
