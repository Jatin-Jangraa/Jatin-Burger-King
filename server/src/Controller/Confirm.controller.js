import nodemailer from 'nodemailer';

export const confirmOrder = async (req, res) => {
  const { email, orderId, orderitems } = req.body;

  try {
    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,     
        pass: process.env.MY_APP_PASSWORD     
      }
    });

    // // Email message
    // const mailOptions = {
    //   from:` "Burger King Orders" <${process.env.MAIL_USER}>`,
    //   to: email,
    //   subject:` Order Confirmation - Order #${orderId}`,
    //   html: `
    //     <h2>Thank you for your order!</h2>
    //     <p>Your order <b>#${orderId}</b> has been confirmed .  </p>
    //     <h4>Order Summary:</h4>
    //     <ul>
    //       ${orderitems.customername}
    //     </ul>
    //     <p><strong>Total:</strong> ₹${1000}</p>
    //   `
    // };

    const mailOptions = {
  from: `"Burger King Orders" <${process.env.MAIL_USER}>`,
  to: email,
  subject:` Order Confirmation - Order #${orderId}`,
  html: `
    <h2>Thank you for your order, ${orderitems.customername}!</h2>
    <p>Your order <b>#${orderId}</b> has been confirmed.</p>

    <h3>Order Summary:</h3>
    <table border="1" cellspacing="0" cellpadding="8" style="border-collapse: collapse;">
      <thead>
        <tr>
          <th>Item</th>
          <th>Size</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Additional Items</th>

        </tr>
      </thead>
      <tbody>
        ${orderitems.orderitems.map(item => `
         <tr>
            <td>${item.name}</td>
            <td>${item.size}</td>
            <td>${item.quantity}</td>
            <td>₹${item.price}</td>
            <td>
              ${item.additional && item.additional.length > 0 ? `
                <ul style="padding-left: 20px; margin: 0;">
                  ${item.additional.map(addon => `
                    <li>${addon.name} - ₹${addon.price}</li>
                  `).join('')}
                </ul>
              ` : 'None'}
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>

    <h3>Payment Mode: ${orderitems.paymentmode}</h3>

    <h3>Shipping Address:</h3>
    <p>
      ${orderitems.shippinginfo.flat}, ${orderitems.shippinginfo.address},<br/>
      ${orderitems.shippinginfo.city}, ${orderitems.shippinginfo.state}, ${orderitems.shippinginfo.country}<br/>
      Contact No: ${orderitems.shippinginfo.Contactno}
    </p>

    <h3>Billing:</h3>
    <ul>
      <li>Subtotal: ₹${orderitems.subtotal}</li>
      <li>Tax: ₹${orderitems.tax}</li>
      <li>Shipping Charges: ₹${orderitems.shippingcharges}</li>
      <li><strong>Total: ₹${orderitems.total}</strong></li>
    </ul>

    <p>We hope you enjoy your meal! 🍔</p>
  `
};


    // Send the email
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Order confirmed and email sent." });

  } catch (error) {
    console.error("Email Error:", error);
    res.status(500).json({ message: "Failed to send email." });
  }
};









