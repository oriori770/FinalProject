import nodemailer from "nodemailer";

export const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // קוד בן 6 ספרות
};

const transporter = nodemailer.createTransport({
  tls: {
    rejectUnauthorized: false, // התעלמות משגיאות תעודה
  },
  service: "gmail", // או שירות מייל אחר כמו Yahoo, Outlook
  auth: {
    user: "appproject770@gmail.com", // המייל שלך
    pass: "fsey zbky paio tqik", // הסיסמה שלך או App Password
  },
});

const sendVerificationEmail = async (email: string, code: string) => {
  const mailOptions = {
    from: "appproject770@gmail.com",
    to: email,
    subject: "Verification Code for best page",
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verification Email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 0;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }
        .header {
          background-color: #007BFF;
          color: #ffffff;
          text-align: center;
          padding: 20px;
          font-size: 24px;
        }
        .content {
          padding: 20px;
          text-align: center;
        }
        .content p {
          font-size: 16px;
          margin-bottom: 20px;
        }
        .code {
          display: inline-block;
          font-size: 20px;
          font-weight: bold;
          color: #007BFF;
          background: #f0f8ff;
          padding: 10px 15px;
          border-radius: 5px;
          letter-spacing: 2px;
        }
        .footer {
          background-color: #f1f1f1;
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #666;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          Welcome to App Project
        </div>
        <div class="content">
          <p>Hi,</p>
          <p>תודה שנרשמת שנכנסת לאתר, מקבלים בברכה צוות האלופים:</p>
          <p class="code">${code}</p>
          <p>If you did not request this email, please ignore it.</p>
        </div>
        <div class="footer">
          &copy; 2024 App Project. All rights reserved.
        </div>
      </div>
    </body>
    </html>
  `,
};

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default sendVerificationEmail;
