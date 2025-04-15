import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// 🌟 Welcome Mail Function
export const sendWelcomeMail = async (to, username) => {
  const mailOptions = {
    from: `"GroceryGo" <${process.env.MAIL_USER}>`,
    to,
    subject: "Welcome to GroceryGo!",
    html: `<h2>Hi ${username} 👋</h2>
<p>Thanks for signing up at <strong>GroceryGo</strong>!</p>
<p>We’re thrilled to have you on board. Now you can explore a wide range of fresh groceries delivered right to your doorstep — fast, easy, and hassle-free. 🛒</p>
<p><strong>Here’s what you can do next:</strong></p>
<ul>
  <li>🛍️ Browse our latest deals and fresh arrivals.</li>
  <li>🧺 Add your favorites to the cart.</li>
  <li>🚚 Enjoy lightning-fast delivery!</li>
</ul>
<p>If you have any questions, just reply to this email — we’re always here to help.</p>
<p>Thanks for choosing <strong>GroceryGo</strong>. Let’s make shopping easier together! 💚</p>
<p>The GroceryGo Team</p>
<p>📧 GroceryGo@gmail.com</p><br />
<p>☎️ 1234567890</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Welcome email sent to", to);
  } catch (error) {
    console.error("❌ Error sending welcome email:", error);
  }
};

// 💸 Payment Success Mail Function
export const sendPaymentSuccessMail = async (to, username, orderDetails) => {
  const total = orderDetails.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
      <div style="text-align: center;">
        <img src="http://localhost:5000/public/logo.svg" alt="GroceryGo Logo" style="max-width: 150px;" />
        <h2>Hi ${username} 👋</h2>
        <p><strong>✅ Payment Received!</strong></p>
      </div>
      <p>Thank you for shopping with <strong>GroceryGo</strong>! Your payment was successful and we’re processing your order.</p>
      <h3>🧾 Invoice</h3>
      <table style="width: 100%; border-collapse: collapse;">
        <thead>
          <tr style="background-color: #f4f4f4;">
            <th style="border: 1px solid #ddd; padding: 8px;">Item</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Qty</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${orderDetails
            .map(
              (item) => `
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.name}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td>
              <td style="border: 1px solid #ddd; padding: 8px;">₹${item.price}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <p style="text-align: right; font-weight: bold; margin-top: 10px;">Total Paid: ₹${total}</p>
      <p>If you have any questions, feel free to reach out to us!</p>
      <p>Thanks again for choosing <strong>GroceryGo</strong>! 💚</p>
    </div>
  `;

  const mailOptions = {
    from: `"GroceryGo" <${process.env.MAIL_USER}>`,
    to,
    subject: "🧾 Payment Successful - Your GroceryGo Invoice",
    html: htmlContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Payment email sent to", to);
  } catch (error) {
    console.error("❌ Error sending payment email:", error);
  }
};

// Export both functions
export default { sendWelcomeMail, sendPaymentSuccessMail };
