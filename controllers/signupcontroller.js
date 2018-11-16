'use strict'
const bcrypt = require('bcrypt');
const otpgenerator=require('otp-generator');
const con=require('../configurations/dbconfig');
const S=require('../schemas/signup_sql');
var jwtservice=require('../services/jwtservices');


module.exports = {
    'signup': async (req, res) => {
        try {
            var raw_password = req.body.password;
            var password = bcrypt.hashSync(raw_password, 10);
            var mob_number = req.body.mob_number;
            var d=new Date().toString();
            //generate otp with 6 digits
            var otp=otpgenerator.generate(6,{digits:true,alphabets:false,upperCase:false,specialChars:false})
            //new user object with otp
             var user = {
                'email': req.body.email,
                'mob_number': req.body.mob_number,
                'first_name': req.body.first_name,
                'last_name': req.body.last_name,
                'password': password,
                'otp':otp,
                'date':d
            }
            //save user to db 
            var data=await con.query(S.SAVE_USER,user);
            if(data){ //send otp to user
                var msg="Welcome to food app and your otp is "+otp
                var link='http://trans.kapsystem.com/api/web2sms.php?workingkey=A2b40e184f78a8469025a2da1729d6f65&to='+mob_number+'&sender=KAPMSG&message='+msg
                res.redirect(link);
            }
            else{
                console.log("error occured in saving data");
            }
        } catch (error) {
            res.json(error);
        }
        process.on('unhandledRejection', function(reason, p){
            console.log("rejection happend");
        });

    },
    'verify': async (req, res) => {
        try {
            let otp = req.body.otp;
            let mob_number = req.body.mob_number;
            var data=await con.query(S.VERIFY_MOBILE_NUM,mob_number);
            console.log(data)
            
            if(data.length==1){
                if(data[0].otp==otp){
                    var num=data[0].SlNo;
                    var cat_id='CAT-'+num+otp
                    console.log(cat_id)
                  /*  var token=jwtservice(data);
                   console.log(token); */
                   /* res.cookie('jwttoken',token).redirect('/signup/business') */
                }
            }
            else{
                console.log("error in data fetching")
            }
        } catch (error) {
            console.log(error);
            res.json(error);
        }

    },
    'business_details': async (req, res) => {

    }
}