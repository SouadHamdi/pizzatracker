const express = require("express");
const {getAllPizzas,getAllUsers} =require("../database/index.js")
const db = require("../database");
const User=require("../database/user.js")
const Pizza=require("../database/pizza.js")
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/../react-client/dist"));

app.get("/api/pizza", (req, res) => {
  db.getAllPizzas((err, results) => {
    err ? res.status(500).send(err) : res.status(200).json(results);
  });
});

//GET DATA FROM PIZZAS dataBase
app.post("/api/pizza", (req, res) => {
  console.log(req.body);
  db.addPizza(
    req.body.photo,
    req.body.name,
    req.body.price,
    req.body.popularity,
    req.body.description
  );
  res.json(req.body);
});

app.delete("/api/employee/:employee_id", function (req, res) {
  console.log(req.params.employee_id);
  let id = req.params.employee_id;
  Employee.remove(
    {
      _id: id,
    },
    function (err) {
      if (err) res.send(err);
      else res.send("Successfully! Employee has been Deleted.");
    }
  );
});

//UPDATE ONE PIZZA
app.put('/api/pizza/:pizza_id', function(req, res) {
	// create mongose method to update a existing record into collection
	let id = req.params.pizza_id;
	var data = {
		photo : req.body.photo,
		name:req.body.name,
		price:req.body.price,
		popularity : req.body.popularity,
		description:req.body.description,
	}
	// save the pizza's data
	Pizza.findByIdAndUpdate(id, data, function(err, pizza) {
	if (err) throw err;
 
	res.send('Successfully! pizza updated  ');
	});
});
//USER PART
//POST A NEW USER
app.post('/api/user', function(req, res) {
	// create mongose method to create a new record into collection
	User.create({
		name : req.body.name,
		email:req.body.email,
		password : req.body.password,
		role : req.body.role
	}, function(err, results) {
    err?res.status((500)).send(err):res.status(200).json(results)
	});

});
//GET USERS DATA FROM DATABASE USERS
app.get('/api/user', (req, res) => {
	getAllUsers((err,results)=>{
	  err?res.status((500)).send(err):res.status(200).json(results)
	 })

  });

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
