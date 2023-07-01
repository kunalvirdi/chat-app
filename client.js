const net=require('net')
const readLine=require('readline/promises')




const rl=readLine.createInterface({
    input:process.stdin,
    output:process.stdout
})

const clearLine=(dir)=>{
    return new Promise((resolve)=>{
        process.stdout.clearLine(dir,()=>{
            resolve();
        })
    })
}

const moveCursor=(dx,dy)=>{
    return new Promise((resolve)=>{
        process.stdout.moveCursor(dx,dy,()=>{
            resolve();
        })
    })
}

let id;
const client=net.createConnection({host:"127.0.0.1",port:8000},async ()=>{
    console.log("Connected to server!")
// For getting text from terminal
    const ask=async ()=>{
        const message=await rl.question("Enter a message > ")
        await moveCursor(0,-1)
        await clearLine(0)
        if(message.toLowerCase().includes("exit chat")){
            process.exit()
        }
        client.write(`${id}-${message}`)
    }
    // On receiving data from server
    client.on("data",async (chunk)=>{
        if(chunk.toString("utf-8").substring(0,2)==="id"){
            id=chunk.toString().substring(3);
            console.log(`Your id is ${id}`)
        }else{
            console.log()
            await moveCursor(0,-1)
            await clearLine(0)
            console.log(chunk.toString())
            ask()
        }
        ask()
    })
})

