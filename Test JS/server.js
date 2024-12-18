const express = require("express")
const { Server } = require("socket.io")
const http = require("http")
const db = require('./database/database')

const productController = require("./controller/productController")
const path = require("path")
const { initSocketServer } = require("./services/socketServer")



const app = express()

const httpServer = http.createServer(app)



app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');


app.use('/products', productController)


app.get('/', (req, res) => {
	res.render('index.twig')
})

httpServer.listen(3000, () => {
	console.log("Server is running on port 3000")
	initSocketServer(httpServer)
})


