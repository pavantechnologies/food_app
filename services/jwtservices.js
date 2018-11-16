const jwt=require('jsonwebtoken');
/* require('dotenv').config(); */


module.exports=(user)=>{
    let pk='nanu.nenu';
    const claim={
        iss: 'foodapp',
        data: user,
        sub:user.mob_number
    }
    return jwt.sign(claim,pk,{ expiresIn:60 });
}