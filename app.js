const express = require('express');
const { default: mongoose } = require('mongoose');
const path = require("path");
const app = express();

const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

const port =8000;

var contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    desc: String,
    address: String

});

var Contact = mongoose.model('Contact', contactSchema);




//express specific stuff
app.use('/static', express.static('static'))  //for serving static files
app.use(express.urlencoded())
 

//pug specific stuff
app.set('view engine', 'pug')  // set the template engine as pug 
app.set('views', path.join(__dirname, 'views')) // set the views directory
 

//endpoints
app.get('/', (req,res) =>{
    const params = {}
    res.status(200).render('home.pug');
})

app.post('/contact', (req,res) =>{
    var myData = new contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to database")
    }).catch(() =>{
        res.status(400).send("item was not saved to databse")
    
    });
    const params = {}
    //res.status(200).render('contact.pug', params);
})



// start the server
app.listen(port, ()=>{
    console.log('the application started successfully on port ${8000}');
});