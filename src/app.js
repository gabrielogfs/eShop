const express = require('express');
const connection = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port } = require('./config/config')
const handlebars = require('express-handlebars');
const passport = require('./config/passport.config');
const session = require('express-session');

const app = express();

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors({origin: ['htttp://localhost:8080'], methods: ['GET', 'POST', 'PUT', 'DELETE']}));
app.use(session({secret: 'eCommerceFS', resave: false, saveUninitialized: false, cookie: {secure: false}}));
app.use(passport.initialize());
app.use(passport.session());

const userRouter = require('./routes/user.router');
const productRouter = require('./routes/products.router');
const orderRouter = require('./routes/order.router');
const sessionRouter = require('./routes/session.router');

connection();

app.use('/usuario', userRouter);
app.use('/produto', productRouter);
app.use('/pedido', orderRouter);
app.use('/login', sessionRouter);
app.use('/registro', userRouter)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}, para acessar utilize: htttp://localhost:8080/api/`));