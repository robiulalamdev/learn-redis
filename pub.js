const express = require("express");
const redis = require("redis");
const app = express();


let publisher = redis.createClient({
    url: "redis://localhost:6379"
})


publisher.on("error", (err) => console.log(err));
publisher.on("connect", (success) => console.log(success));


const connect = async () => {
    await publisher.connect();
}




app.get("/", (req, res) => {
    res.send("Publisher Active from 3001");
})


app.get("/publish", async (req, res) => {
    const id = Math.floor(Math.random() * 10);
    const data = {
        id,
        message: `Message - ${id}`
    }
    await publisher.publish("message", JSON.stringify(data));
    res.send({
        message: "Data Published!"
    })
})

app.listen(3001, () => {
    console.log("Server Running on 3001")
})
connect();