const express = require('express');
const session = require('express-session');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(
  session({
    secret: 'Forbidden For Public Access',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);
app.use(require('./routers'));

// app.get('/'); // menampilkan tombol login dan register
// app.get('/login'); // menampilkan form login
// app.post('/login'); // memproses data login
// app.get('/register'); // menampilkan form register
// app.post('/register'); // memproses data register
// app.get('/logout'); // memproses logout user
// app.get('/diseases'); // menampilkan data seluruh diseases
// app.get('/diseases/add'); // menampilkan form input diseases
// app.post('/diseases/add'); // memproses data input diseases

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
