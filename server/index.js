const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const RegisterModel = require('./models/Register');

const app = express();

// CORS middleware configuration
app.use(cors({
    origin: 'https://merns-seven.vercel.app', // Allow requests from this origin
    methods: ['POST', 'GET'], // Specify allowed HTTP methods
    credentials: true, // If you're using credentials in your requests
}));

app.use(express.json());


mongoose.connect('mongodb+srv://sohaililyas487:admin123@cluster0.biprxao.mongodb.net/Attendance?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Sample route handling
app.get('/', (req, res) => {
    res.json('Hello from server!');
});

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;

    RegisterModel.findOne({ email: email })
        .then(user => {
            if (user) {
                res.json('Already have an account');
            } else {
                RegisterModel.create({ name, email, password })
                    .then(result => res.json(result))
                    .catch(err => res.json(err));
            }
        })
        .catch(err => res.json(err));
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
