import app from "./app.js";

const port = process.env.PORT;
const host = process.env.HOST;

app.listen((port), () => {
    console.log(`Server runnig at ${host}:${port}`)
})