const express = require('express');
const connection = require('./config/db');
const bodyParser = require('body-parser');
const cors = require('cors');
const { port } = require('./config/config')
const handlebars = require('express-handlebars');
const passport = require('./config/passport.config');
const session = require('express-session');
const path = require('path');

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
app.use(express.static(path.join(__dirname, '..', 'public')));

const userRouter = require('./routes/user.router');
const productRouter = require('./routes/products.router');
const orderRouter = require('./routes/order.router');
const loginRouter = require('./routes/login.router');
const registerRouter = require('./routes/register.router');
const addressRouter = require('./routes/address.router');
// const logoutRouter = require('./routes/logout.router');

connection();

app.use('/usuario', userRouter);
app.use('/produto', productRouter);
app.use('/pedido', orderRouter);
app.use('/login', loginRouter);
app.use('/registro', registerRouter);
app.use('/endereco', addressRouter);
// app.use('/logout', logoutRouter)

app.listen(port, () => console.log(`Servidor rodando na porta ${port}, para acessar utilize: http://localhost:8080/api/`));