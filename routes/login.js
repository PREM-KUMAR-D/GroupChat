const express= require('express');

const router = express.Router();
const fs = require('fs');

router.get('/login',(req,res,next)=>{
    res.send('<form onsubmit="localStorage.setItem(`username`, document.getElementById(`username`).value)" action="/message" method="POST"><input id="username" type="text" name="username"><button type="submit">add</button></form>');
});

let userName = "Default";

router.post('/message',(req,res,next)=>{
    console.log(req.body);
    userName =req.body.username;
    res.redirect('/');
});

router.post('/process',(req,res,next)=>{
    console.log(req.body);
    const toStore = {
        "username":userName,
        "message":req.body.message
    }
    fs.appendFileSync('message.txt', JSON.stringify(toStore));
    res.redirect('/');

});
router.use('/',(req,res,next)=>{
    const fileExists = fs.existsSync('message.txt');
    let message = "Message";
    if(fileExists){
        message = fs.readFileSync('message.txt');
    }

    res.send(`<form action="/process" method="POST">${message}<input type="text" name="message"><button type="submit">Send</button></input></form>`);
});



module.exports = router;