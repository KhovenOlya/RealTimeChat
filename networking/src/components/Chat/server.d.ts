import WebSocket from 'ws';

declare module 'websocket/server' {
  const WebSocketServer: typeof WebSocket;
  export default WebSocketServer;
}
