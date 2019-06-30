const express = require('express');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');

const users = [
    {username: 'abc', password:'$2b$08$JAAgsYeUmtwIQWrvb64wROiSS6h4rmmzpcrEMEoIZvG6LIU6d5mse'}
]

app.get('/add-user/:username/:password', async (req, res)=>{
    const {username, password} = req.params;

    let passHash = await bcrypt.hash(password, 8);
    users.push({username, password: passHash});
    res.send({users, passHash});
});

app.get('/login/:username/:password', async (req, res)=>{
    const { username, password } = req.params;

    let infoUser = users.find(user => Object.is(username.toString(), user.username.toString()));
    
    let isMatching = await bcrypt.compare(password, infoUser.password);
    if(isMatching) res.send({message: 'PASSWORD MATCHING'});
    return res.send({message: 'PASSWORD NOT MATCHING'});
})

app.listen(port, ()=> console.log(`Server start at port ${port}`));