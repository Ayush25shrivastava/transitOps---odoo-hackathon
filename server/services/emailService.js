const nodemailer = require('nodemailer');
const Driver = require('../models/Driver');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

exports.checkLicenseExpiry = async () => {
  const now = new Date();
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(now.getDate() + 30);

  const expiringDrivers = await Driver.find({
    licenseExpiry: { $gt: now, $lte: thirtyDaysFromNow }
  });

  for (const driver of expiringDrivers) {
    if (driver.email) {
      await exports.sendEmail(
        driver.email,
        'License Expiring Soon',
        `<p>Your license expires on ${driver.licenseExpiry}. Please renew.</p>`
      );
    }
  }
};

exports.sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to,
    subject,
    html
  });
};
