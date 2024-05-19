import asyncio
import json
import websockets
from datetime import datetime

clients = {}

async def send_error(ws, error_message):
    error_response = {
        "sender": "server",
        "timestamp": datetime.utcnow().isoformat(),
        "error": True,
        "message": error_message
    }
    await ws.send(json.dumps(error_response))

async def handle_message(ws, path):
    username = None
    try:
        async for message in ws:
            data = json.loads(message)
            
            if "username" in data:
                username = data["username"]
                clients[ws] = username
                continue
            
            if username is None:
                await send_error(ws, "Username is required.")
                continue
            
            response = {
                "sender": username,
                "timestamp": datetime.utcnow().isoformat(),
                "error": False,
                "message": data.get("message", "")
            }
            
            if response["message"] == "":
                response["error"] = True
                response["message"] = "Invalid message."

            await asyncio.wait([client.send(json.dumps(response)) for client in clients if client != ws])
    except websockets.ConnectionClosed:
        if ws in clients:
            del clients[ws]

start_server = websockets.serve(handle_message, "localhost", 8080)

asyncio.get_event_loop().run_until_complete(start_server)
print("WebSocket server is running on ws://localhost:8080")
asyncio.get_event_loop().run_forever()
