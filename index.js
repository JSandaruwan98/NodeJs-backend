var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
const userSchema =require('./models/User')
const UserRoutes =require('./routes/userRoutes')



const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

const dbUrl = 'mongodb+srv://janithsanda256:Asdf%401234@jscoding.xlspylj.mongodb.net/'

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(dbUrl,connectionParams)
.then(()=>{
    console.info("connect to db")
})
.catch((e)=>{
    console.log("Error",e)
})


app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    var user1 = new userSchema()


    user1.name =name
    user1.email=email
    user1.password=password

    user1.save()
        .then((data) => {
            console.log("inserted")
        }).catch((err)=>{
            console.log(err)
        })
    

    return res.redirect('signin.html')

})

app.post("/sign_in", async (req,res) =>{
    userSchema.findOne({ email: req.body.email })
    .then((data)=>{
        const result = req.body.password === data.password;
        if (result) {
            return res.redirect('user.html');
        } else {
            res.status(400).json({ error: "password doesn't match" });
        }
        
    })
    .catch((err) => {
        res.status(401).json({ message: 'Invalid email or password' });

    })
    
})


  

app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
})




app.listen(3000, ()=>{
    console.log("Listening on Port: 3000")
})
