module.exports=function(req,res,next){

    var num=req.body.num; 
    console.log(num)
    var msg="0817";
    var link='http://trans.kapsystem.com/api/web2sms.php?workingkey=A2b40e184f78a8469025a2da1729d6f65&to='+num+'&sender=KAPMSG&message='+msg
    res.redirect(link)
    res.send("message has been sent")

}
