import nodemailer from "nodemailer";

export const sendVerification = async (email: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "jibola619@gmail.com",
        pass: process.env.MAIL,
      },
    });

    const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`


    const mailOptions = {
      from: "jibola619@gmail.com",
    //   to: `jibola619@gmail.com,${mail}`,
      to: email,
      subject: "Auth System: Email Confirmation",
      html: `<p> Click <a href="${confirmLink}">here</a> to confirm mail`,
    };

    await transporter.sendMail(mailOptions);
    return { success: "Mail sent" };

  } catch (error) {
    console.error(error);
    // res.status(500).json({ message: error });
    return { error: "Error sending mail"};

  }
}