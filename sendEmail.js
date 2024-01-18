const nodeMailer =  require('nodemailer');

// const sendEmail = async (options)=>{
//     const transporter = nodeMailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         service: process.env.SMTP_SERVICE,
//         auth:{
//             user:process.env.SMTP_MAIL,
//             pass:process.env.SMTP_PASSWORD,
//         }
//     })
//     const mailOptions = {
//         from:process.env.SMTP_MAIL,
//         to:options.email,
//         subject:options.subject,
//         text:options.message,
//     };
//     transporter.sendMail(mailOptions);
// }
const nodemailer = require('nodemailer');
// const Chat = require('./models/chatbotmodel');

// Function to send the user's stored response to your email
const sendUserResponseToEmail = async(options)=> {
  try {
    // Fetch the user's stored response from the database
    // const userResponse = await Chat.find().sort({ timestamp: -1 }).limit(1);

    if (options.FinalMessage.length > 0) {
    //   const responseText = userResponse[0].message; // Get the user's response message

      // Create a nodemailer transporter (replace with your email service details)
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_MAIL, // Replace with your email
          pass: process.env.SMTP_PASSWORD, // Replace with your password or app-specific password
        },
      });

      // Email details for  
      const mailOptions = {
        from: process.env.SMTP_MAIL, // Sender email address
        to: process.env.SMTP_SENDER_MAIL, // Recipient email address
        subject: 'User Response from Chatbot',
        text: `User's Response: ${options.FinalMessage}`, // Email body with the user's response
      };

      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.response);
    } else {
      console.log('No user response found from chatbot');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Call the function to send the user's response to your email
// sendUserResponseToEmail();

module.exports = sendUserResponseToEmail;