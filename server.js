const net = require('net')
const server=net.createServer()


const clients=new Map();
server.on("connection",(socket)=>{
    const id=Date.now().toString(28);
    console.log("A new connection to server!");
    clients.forEach((s,id)=>{
        s.write(`A new user is added in the chart with id = ${id}`)
    })
    socket.write(`id-${id}`)
    socket.on("data",(chunk)=>{
        const id=chunk.toString("utf-8").split('-')[0]
        const message=chunk.toString("utf-8").split('-')[1]

        clients.forEach((s)=>{
            s.write(`> User ${id}: ${message}`)
        })
    })

    clients.set(id,socket)

    socket.on("end",()=>{
        clients.forEach((s,id)=>{
            s.write(`User with id = ${id} left the chat.`)
        })
        clients.delete(id)
    })
})
server.listen(8000,"127.0.0.1",()=>{
    console.log("Opened Server on",server.address())
})
