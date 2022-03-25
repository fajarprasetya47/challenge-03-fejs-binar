const express = require('express');
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const multer = require('multer');

const port = 3000;

const {loadOrders} = require('./utils/order');
const {loadCars, addCars} = require('./utils/car');
const {loadUsers} = require('./utils/user');
// const { request } = require('express');
const {checkUser} = require('./middleware/auth');

app.set("view engine", "ejs");
app.use("/public", express.static("./public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
    secret: "Your secret key"
}));

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const uploadImg = multer({storage: storage});

app.get('/', checkUser, (req, res)=> {
    res.redirect('/home');
});

app.get('/sign-in', (req, res)=> {
    if(!req.session.user){
        res.status(200);
        res.render("sign-in", {
            title: "Sign In",
            messageAlert: ""
        });
    }else{
        res.redirect("/");
        
    }
});

app.post('/sign-in', (req, res) => {
    const users = loadUsers();
    users.filter((user)=>{
        if(req.body.email===user.email && req.body.password===user.password){
            console.log("Login Successfully");
            req.session.user = user;
            res.redirect('/home');
        }else{
            res.render('sign-in', {
                title: "Sign In",
                messageAlert: "Masukkan username dan password yang benar. Perhatikan penggunaan huruf kapital. (admin)"
            });
        }
    });
});

app.get('/home', checkUser, (req, res) => {
    const cars = loadCars();
    const orders = loadOrders();
    res.render("home", {
        user: req.session.user.email,
        title: "Home",
        linkHome: "-active",
        linkCars: "",
        sbHead: "DASHBOARD",
        sbLink: "Dashboard",
        orders,
        cars,
    });
});

app.get('/cars', checkUser, (req, res) => {
    const cars = loadCars();
    res.render("cars", {
        user: req.session.user.email,
        title: "Cars",
        linkHome: "",
        linkCars: "-active",
        sbHead: "CARS",
        sbLink: "List Car",
        cars,
        messageAlert: ""

    });
});

app.get('/cars/add-car', checkUser, (req, res) => {
    res.render("add-car", {
        user: req.session.user.email,
        title: "Add Car",
        linkHome: "",
        linkCars: "-active",
        sbHead: "CARS",
        sbLink: "Add Car"
    });
});

app.post('/addcar', uploadImg.single('img'), (req, res)=> {
    let car = {
        ...req.body,
        img: req.file.path,
        created: new Date().toDateString(),
        updated: new Date().toDateString()
    };
    addCars(car);
    res.render("cars", {
        user: req.session.user.email,
        title: "Cars",
        linkHome: "",
        linkCars: "-active",
        sbHead: "CARS",
        sbLink: "List Car",
        cars: loadCars(),
        messageAlert: "Data Berhasil Disimpan"

    });
});

app.get('/logout', checkUser, (req, res)=> {
    req.session.destroy();
    res.redirect('/sign-in');
});

app.use("/", (req, res) => {
    res.status(404);
    res.send("<h1>404<br>Page not found!</h1>");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));