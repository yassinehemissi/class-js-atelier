const express = require('express');
const path = require('path');
const http = require('http');
const initialize = require('./database/database');
const app = express();
const PORT = 3000;
const cors = require('cors')
const contactRouter = require("./controllers/contactController")
const userRouter = require('./controllers/userController')

const server = http.createServer(app);

// Middlewares
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');



app.use('/contact', contactRouter)
app.use('/user', userRouter)

app.get("/", (req, res)=>res.render('layout.twig'))
// Start server
server.listen(PORT, async () => {
	await initialize();
	console.log(`Server running on port ${PORT}`);
	console.log(`Database connected!`)
});

