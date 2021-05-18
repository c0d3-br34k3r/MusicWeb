const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const {json} = require("hbs");
const port = process.env.PORT || 3000;

require("./db/conn");
const Register = require("./models/registers");

const static_path = path.join(__dirname, "../public" );
const template_path = path.join(__dirname, "../templates/views" );
const partials_path = path.join(__dirname, "../templates/partials" );

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

app.get("/", (req, res) => {
    res.render("index")
});

app.get("/register", (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => {
    try{
 
        const password = req.body.password; 
        const confirmpassword = req.body.cpassword; 
        
        if(password === confirmpassword){

            const registerUser = new Register({
                email : req.body.email,
                username : req.body.username,
                password : password,
                cpassword : confirmpassword
            })

            
            const registered = await registerUser.save();

            console.log(registered)

            res.status(201).redirect('login')
            

        }
        else{
            res.redirect("register")
        }       
    
    } catch(error){
        console.log(error)
        res.status(400).send(error);
    }
});

app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/login", async(req, res) => {
   try {

       const email = req.body.email;
       const password = req.body.password;

       const useremail = await Register.findOne({email:email});
      
       if(useremail.password === password){
           res.status(201).redirect("music.html");
       }else{
           res.redirect("login")
       }

   } catch (error) {
       res.status(400).send("Invalid Login Details")
   }
});

app.get("/music.html", (req, res) => {
    res.render("music.html");
});

app.post("/music.html", async (req, res) => {
    try{
            console.log(req.body.search);

            res.send(req.body.search);
              
    
    } catch(error){
        console.log(error)
        res.status(400).send(error);
    }
});

app.listen(port, () => {
    console.log('listening to port no at ${port}');
  })
