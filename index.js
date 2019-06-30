const bcrypt = require('bcrypt');

const passPlain = 'password';
const passHash = '$2b$08$lX6z7jW9zX.xT5sUg7MobO0DWZwANEhqmmNnITB2r9BY0SH0v9RgO';

const passHash2 = '$2b$08$gAS2M5Q/uiscKBksqRQTHOCVNHxqcLDV3XDphQHewtI0SO5Z8gVJ6';

const passHash3 = '$2b$08$JAAgsYeUmtwIQWrvb64wROiSS6h4rmmzpcrEMEoIZvG6LIU6d5mse';

/**
 *  >>>>>> CALLBACK FUNCTION
 * 
 * To hash a password
 */
//Technique 1 

bcrypt.genSalt(10, (err, salt)=>{
    if(err) console.log({err: true, message: err.message});
    bcrypt.hash(passPlain, salt, (err, hashString) =>{
        if(err) console.log({err: true, message: err.message});
        console.log(`hashString1 - ${hashString}`);
    });
});

//Technique 2
// bcrypt.hash(passPlain, 8, (err, hashString)=>{
//     if(err) console.log({err: true, message: err.message});
//     console.log(`hashString - ${hashString}`);
// })

/**
 * Check to password
 */
bcrypt.compare(passPlain, passHash, (err, data)=>{
    if(err) console.log({err: true, message: err.message});
    console.log(`data1 - ${data}`);
})

/**
 * >>>> PROMISE
 * To hash a password
 */

//Technique 1
bcrypt.genSalt(10)
    .then(salt =>{
        bcrypt.hash(passPlain, salt)
            .then(hashString => console.log(`hashString2 - ${hashString}`))
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));

//Technique 2
// bcrypt.hash(passPlain, 8)
//     .then(hashString => console.log(`hashString2 - ${hashString}`))
//     .catch(err => console.log(err));

//To check a password
bcrypt.compare(passPlain, passHash2)
    .then(data => console.log(`data2 - ${data}`))
    .catch(err => console.log(err));

/**
 * >>> Async Await
 */

const hashHandle = async () =>{
    let salt = await bcrypt.genSalt(8);
    let hashString = await bcrypt.hash(passPlain, salt);
    console.log({hashString});
}

const compareHandle = async () => {
    let data = await bcrypt.compare(passPlain, passHash3);
    console.log({data});
}

hashHandle();
compareHandle();