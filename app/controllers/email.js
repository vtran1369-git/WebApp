const nodemailer = require('nodemailer')


function email(props){
    console.log("email props: ", props)
    let transporter = nodemailer.createTransport({
        host:'outlook.office365.com',
        port: 587,
        auth: {
            user: "vien.tran@thermofisher.com",
            pass: "Nhatoi@4"
        }
    })
    let propsText = props.message
    let textSend = propsText + "\n"
    textSend += "First Name: " + props.firstName + "\n"
    textSend += "Last Name: " + props.lastName + "\n"
    textSend += "Email: " + props.email 
    let message = {
        from: props.email,
        to: "vien.tran@thermofisher.com",
        subject:"Web App " + propsText,
        text: textSend
       /*  text: propsText + ">>first name: " + props.firstName  + " " +
        "last name: " + props.lastName + " " +
        "email: " + props.email  */
     
    }
    
    transporter.sendMail(message, function(err, info) {
        if(err) {
            console.log(err)
        }else{
            console.log(info);
        }
    })
}

module.exports = email