const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');

const pg = require('pg');
const Pool = pg.Pool;

// should we use a SSL connection
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
// which db connection to use
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/reg_numbers';

const app = express();

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

app.use(session({
    secret: 'keyboard cat5 run all 0v3r',
    resave: false,
    saveUninitialized: true
}));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/api/towns', async function (req, res) {
    let results = await pool.query('select * from town');
    res.json(results.rows);
});

app.post('/api/reg_number', async function (req, res) {
    // add a reg_number here
});

app.get('/api/reg_number/:reg_start', async function (req, res) {
    // filter for all reg numbers from a town
});

// app.get('/', function (req, res) {
//     res.render('home', { user: req.user });
// });

const PORT = process.env.PORT || 3010;

app.listen(PORT, function () {
    console.log('started on: ', this.address().port);
});
