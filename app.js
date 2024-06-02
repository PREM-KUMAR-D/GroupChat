const express = require('express');
const bodyParser = require('body-parser');


const loginRouter = require('./routes/login');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(loginRouter);


app.use((req,res,next)=>{
    res.status(404);
    res.send('<h1>Page Not Found</h1>');
})

app.listen(4000);