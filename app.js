require("dotenv").config();

const express = require('express')
const app = express()
app.use(express.json())
const port = process.env.PORT;
const allRoutes = require("./modules/index")
const connect = require("./DB/connection")
const path = require("path")
connect();
// app.use(allRoutes.authRouter, allRoutes.userRouter);
app.use("/api/v1/auth", allRoutes.authRouter);
app.use("/api/v1/user", allRoutes.userRouter)
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))