import { Server } from "socket.io";

let io;

export const initSocket = (httpServer) => {
    io = new Server(httpServer, {
        cors: {
            origin: ["http://localhost:5173", "http://localhost:5174"],
            credentials: true
        }
    })

    console.log("socket io server is RUNNING");

    io.on("connection", (socket) => {
        console.log("User connected: ", socket.id);
    })
}

export const getIO = () => {
    if(!io) {
        throw new Error("Socket not initialized");
    }
    return io;
}