//use path module
const path = require('path');
//use express module
const express = require('express');
//use hbs view engine
const hbs = require('hbs');
//use bodyParser middleware
const bodyParser = require('body-parser');
//use mysql database
const mysql = require('mysql');
const app = express();

//Create connection
const conn = mysql.createConnection({
  host: process.env.RDS_HOSTNAME,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
  database: process.env.RDS_DB_NAME,
  insecureAuth : true
});

//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//set views file
app.set('views',path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'hbs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//set public folder as static folder for static file
app.use('/assets',express.static(__dirname + '/public'));

//route for homepage
app.get('/',(req, res) => {
  let sql = "SELECT * FROM RELEASED_GAME";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.render('product_view',{
      results: results
    });
    console.log(results);
  });
});

// add random number generator and hash collision resolution
function rando() {
    num = parseInt(Math.random().toString().slice(2, 10));
    if (num < 10000000) {
        num = num * 10;
    }
    return num;
}

//route for insert data
app.post('/save',(req, res) => {
  let data = {game_id: rando(),
              title: req.body.title,
              specifications: "dope specs",
              pub_id: rando(),
              dev_id: rando(),
              languages: 123,
              price: req.body.price,
              release_date: req.body.release_date,
              copies_sold: req.body.copies_sold};
  let sql = "INSERT INTO RELEASED_GAME SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for update data
app.post('/update',(req, res) => {
  let sql = "UPDATE RELEASED_GAME SET title='"+req.body.title+"', price='"+req.body.price+"', release_date='"+req.body.release_date+"', copies_sold='"+req.body.copies_sold+"' WHERE game_id="+req.body.game_id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.redirect('/');
  });
});

//route for delete data
app.post('/delete',(req, res) => {
  let sql = "DELETE FROM RELEASED_GAME WHERE game_id="+req.body.game_id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.redirect('/');
  });
});

//server listening
app.listen(8000, () => {
  console.log('Server is running at port 8000');
});
