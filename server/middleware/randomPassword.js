const generator = require('generate-password');
const randomPassword=()=>{
    const passcode = generator.generate({
        length: 10,
        numbers: true
    });
    console.log(passcode);
    return passcode;

}
module.exports=randomPassword;