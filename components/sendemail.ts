"use server"
import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface UserDetails {
  firstname: string;
  email: string;
  phoneno: string;
}

const sendEmail = async (customerDetails: UserDetails[], ownerDetails: UserDetails[]) => {
  console.log("Customer",customerDetails)
  console.log("Seller",ownerDetails)
  try {
    
    const mailOptionForHouseSeller = {
      from: process.env.EMAIL_USER,
      to: customerDetails[0].email,
      subject: 'Rentify - Owner Details',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Owner Details</title>
          <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
        td {
            color: #333;
        }
        .footer {
            margin-top: 20px;
        }
    </style>

      </head>
      <body>
          <div class="container">
              <h1 style="text-align:center;"><strong>Rentify Team</strong></h1>
              <h2>Contact Owner</h2>
              <p>Dear User,</p>
              <p>Thank you for showing interest in our property. Here are the details of the owner:</p>
              <table>
                  <tr>
                      <th>Name:</th>
                      <td>${ownerDetails[0]?.firstname || 'N/A'}</td>
                  </tr>
                  <tr>
                      <th>Email:</th>
                      <td>${ownerDetails[0]?.email || 'N/A'}</td>
                  </tr>
                  <tr>
                      <th>Phone Number:</th>
                      <td>${ownerDetails[0]?.phoneno || 'N/A'}</td>
                  </tr>
              </table>
              <div class="footer">
                  <p>If you have any further questions, feel free to reach out to us.</p>
                  <p>Best Regards,</p>
                  <p>Rentify Team</p>
              </div>
          </div>
      </body>
      </html>
      `,
    };

    const mailOptionForHouseBuyer = {
      from: process.env.EMAIL_USER,
      to: ownerDetails[0].email,
      subject: 'Rentify - Customer Details',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Customer Details</title>
          <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
        }
        p {
            color: #555;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #f2f2f2;
            text-align: left;
        }
        td {
            color: #333;
        }
        .footer {
            margin-top: 20px;
        }
    </style>

      </head>
      <body>
          <div class="container">
              <h1 style="text-align:center;"><strong>Rentify Team</strong></h1>
              <h2>Contact Owner</h2>
              <p>Dear User,</p>
              <p>Thank you for showing interest in our property. Here are the details of the owner:</p>
              <table>
                  <tr>
                      <th>Name:</th>
                      <td>${customerDetails[0]?.firstname || 'N/A'}</td>
                  </tr>
                  <tr>
                      <th>Email:</th>
                      <td>${customerDetails[0]?.email || 'N/A'}</td>
                  </tr>
                  <tr>
                      <th>Phone Number:</th>
                      <td>${customerDetails[0]?.phoneno || 'N/A'}</td>
                  </tr>
              </table>
              <div class="footer">
                  <p>If you have any further questions, feel free to reach out to us.</p>
                  <p>Best Regards,</p>
                  <p>Rentify Team</p>
              </div>
          </div>
      </body>
      </html>
      `,
    };

    await transporter.sendMail(mailOptionForHouseSeller);
    await transporter.sendMail(mailOptionForHouseBuyer);

    return NextResponse.json(
      { message: 'Email Sent Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Failed to Send Email' },
      { status: 500 }
    );
  }
};

export default sendEmail;
