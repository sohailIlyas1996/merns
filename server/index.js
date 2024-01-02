const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')
const studentModel = require('./models/student')

const app = express()
app.use(cors(
    {
        origin: ["https://deploy-mern-frontend.vercel.app"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
app.use(express.json())

mongoose.connect('mongodb+srv://sohaililyas487:admin123@cluster0.biprxao.mongodb.net/Attendance?retryWrites=true&w=majority')

app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/all', (req, res) => {
    const {name, email, password} = req.body;
    RegisterModel.findOne({email: email})
    .then(user => {
        if(user) {
            res.json("Already have an account")
        } else {
            RegisterModel.create({name: name, email: email, password: password})
            .then(result => res.json(result))
            .catch(err => res.json(err))
        }
    }).catch(err => res.json(err))
})



router.get('/allstudents',async (req, res) => {
    try {
      const allStudents = await studentModel.find({});
    // Create a new PDF document
    
  

  
    
      // res.render('studentData', { students: allStudents}); // Render 'index.ejs' and pass fetched data
    res.send(allStudents);
    
    
    } catch (err) {
      console.error('Error fetching student data:', err);
      res.status(500).send('Error fetching student data');
    }
  });

app.listen(3001, () => {
    console.log("Server is Running")
})
