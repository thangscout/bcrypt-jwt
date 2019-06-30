const jwt = require('jsonwebtoken');

const KEY = 'MERN_STACK_0106';
const objDemo = {username: 'abc', image: 'aaa.png'};

jwt.sign(objDemo, KEY, (err, token) =>{
    if(err) console.log({err: true, message: err.message});
    console.log({token});
});

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsImltYWdlIjoiYWFhLnBuZyIsImlhdCI6MTU2MTkzNjU4N30.JcUjzaXKRlwEo_kMHbf5mDLBRLyPpd-rmXbQM-oL9dY';
jwt.verify(TOKEN, KEY, (err, data)=>{
    if(err) console.log({err: true, message: err.message});
    console.log({data});
})

/**
 * >> PROMISE
 * 
 */

const verifyPromise =  () => {
    return new Promise(resolve =>{
        jwt.verify(TOKEN, KEY, (err, data)=>{
            if(err){
                if(err.message === 'invalid signature'){
                    return resolve({err: true, message: 'INVALID SINGNATURE'});
                }
                return resolve({err: true, message: 'INVALID TOKEN'});
            }
            resolve({err: false, data});
        })
    })
}

verifyPromise()
    .then(result => console.log(result));