const getUsers = require('./dbconnection').getUsers;
const createUser = require('./dbconnection').createUser;
const deleteUser = require('./dbconnection').deleteUser;
const updateUser = require('./dbconnection').updateUser;
const getOneUser = require('./dbconnection').getOneUser;
const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const router = express.Router();       
const PORT = 8080;

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next(); 
});

router.route('/getUsers')
    .get(function(req, res, next) {
        getUsers().then((userlist)=>res.json(userlist)).catch((e)=>{
            const message = {message: "Internal error"};
            res.status(500);
            res.json(message);
        });
    });
router.route('/user_id/:id')
    .get(function(req, res, next){
        // if(err){next(err)}
        const id = req.params.id;
        getOneUser(id).then((user)=>res.json(user)).catch((e)=>{
            const message = {message: "Internal error"};
            res.status(500);
            res.json(message);
        });

    });
router.route('/createUser')
    .post(function(req,res, next){
        // if(err){next(err)}
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const sex = req.body.sex;
        const age = req.body.age;
        const password = req.body.password;
        createUser(firstname, lastname, sex, age, password).then((result)=>res.json(result)).catch((e)=>{
            const message = {message: "Internal error"};
            res.status(500);
            res.json(message);
        });
    });
router.route('/deleteUser/user_id/:id')
    .delete(function(req,res, next){
        // if(err){next(err)}
        const id = req.params.id;
        console.log(req.params)
        deleteUser(id).then((result)=>res.json(result)).catch((e)=>{
            const message = {message: "Internal error"};
            res.status(500);
            res.json(message);
        });
    });
router.route('/updateUser/user_id/:id')
    .put(function(req, res, next){
        // if(err){next(err)}
        const id = req.params.id;
        const firstname = req.body.firstname;
        const lastname = req.body.lastname;
        const sex = req.body.sex;
        const age = req.body.age;
        const password = req.body.password;
        // console.log(firstname);
        // console.log(req.body.firstname);
        // console.log(req.body);
        updateUser(id, firstname, lastname, sex, age, password).then((result)=>res.json(result)).catch((e)=>{
            const message = {message: "Internal error"};
            res.status(500);
            res.json(message);
        });

    });

app.use('/api', router);

// err handle
// app.use(function(err, req, res, next) {
//     const message = {
//       message: "Internal error",
//     };
//     res.status(500);
//     res.json(message);
//   });

app.listen(PORT, () => {
    console.log(`Express Server is running on port ${PORT}`);
});