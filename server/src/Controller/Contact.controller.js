 import nodemailer from 'nodemailer'
 
 export const contact = async (req,res) =>{

    const {name ,email ,message} = req.body


    try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from:` "${name}" <${email}>`,
      to: process.env.MY_EMAIL,
      subject:` New Contact Form Message from ${name}`,
      text:` Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (err) {
    console.error('Email sending failed:', err);
    res.status(500).json({ message: 'Failed to send email' });
  }


 }



