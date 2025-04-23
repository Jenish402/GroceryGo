import Order from "../models/Order.js";
import Product from "../models/Product.js";
import stripe from "stripe";
import User from "../models/User.js";
import { sendPaymentSuccessMail } from "../utils/mailer.js"; // ✅ import mailer
import { log } from "console";

// Place Order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    const user = await User.findById(userId);

    // ✅ Send email after COD order
    await sendPaymentSuccessMail(user.email, user.username, {
      cartItems: items,
      shippingAddress: address,
      paymentId: "Cash on Delivery",
    });

    return res.json({ success: true, message: "Order Placed Successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

// Place Order Stripe : /api/order/stripe
// export const placeOrderStripe = async (req, res) => {
//   try {
//     const { userId, items, address } = req.body;
//     const { origin } = req.headers;
//     console.log("========================" , origin);

//     if (!address || items.length === 0) {
//       return res.json({ success: false, message: "Invalid data" });
//     }

//     let productData = [];
//     let amount = await items.reduce(async (acc, item) => {
//       const product = await Product.findById(item.product);
//       productData.push({
//         name: product.name,
//         price: product.offerPrice,
//         quantity: item.quantity,
//       });
//       return (await acc) + product.offerPrice * item.quantity;
//     }, 0);

//     amount += Math.floor(amount * 0.02);

//     const order = await Order.create({
//       userId,
//       items,
//       amount,
//       address,
//       paymentType: "Online",
//     });
//     console.log(process.env.STRIPE_SECRET_KEY);

//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     const line_items = productData.map((item) => {
//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
//         },
//         quantity: item.quantity,
//       };
//     });

//     // ✅ Add additional metadata fields here
//     const user = await User.findById(userId);

//     const session = await stripeInstance.checkout.sessions.create({
//       line_items,
//       mode: "payment",
//       success_url: `${origin}/success`,
//       cancel_url: `${origin}/cart`,
//       metadata: {
//         orderId: order._id.toString(),
//         userId,
//         cartItems: JSON.stringify(items),
//         shippingAddress: JSON.stringify(address),
//         email: user?.email || "",
//         username: user?.username || "",
//       },
//     });
//     return res.json({ success: true, url: session.url });
//   } catch (error) {
//     return res.json({ success: false, message: error.message });
//   }
// };
export const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    const { origin } = req.headers;
    console.log("Origin:", origin);

    if (!address || items.length === 0) {
      return res.json({ success: false, message: "Invalid data" });
    }

    let productData = [];
    let amount = await items.reduce(async (acc, item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`Product not found: ${item.product}`);
      }
      
      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);

    amount += Math.floor(amount * 0.02);

    const order = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
    });

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const line_items = productData.map((item) => {
      return {
        price_data: {
          currency: "inr", // Change to your currency
          product_data: {
            name: item.name,
          },
          unit_amount: Math.floor(item.price + item.price * 0.02) * 100,
        },
        quantity: item.quantity,
      };
    });

    // Get user details
    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Create Stripe checkout session with proper metadata
    const session = await stripeInstance.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order._id.toString(),
        userId: userId.toString(),
        email: user.email,
        username: user.username
      },
    });

    return res.json({ success: true, url: session.url });
  } catch (error) {
    console.error("Error creating stripe session:", error);
    return res.json({ success: false, message: error.message });
  }
};




// Stripe Webhooks to Verify Payments Action : /stripe
// export const stripeWebhooks = async (request, response) => {
//   console.log(
//     "===================================================================================="
//   );

//   const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY); // strip secrate key
//   const sig = request.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripeInstance.webhooks.constructEvent(
//       request.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET // webhook secrate key
//     );
//   } catch (error) {
//     return response.status(400).send(`Webhook Error: ${error.message}`);
//   }
//   console.log("jenish", event);

//   switch (event.type) {
//     case "payment_intent.succeeded": {
//       const paymentIntent = event.data.object;
//       const paymentIntentId = paymentIntent.id;

//       const session = await stripeInstance.checkout.sessions.list({
//         payment_intent: paymentIntentId,
//       });

//       const { orderId, userId } = session.data[0].metadata;

//       await Order.findByIdAndUpdate(orderId, { isPaid: true });

//       await User.findByIdAndUpdate(userId, { cartItems: {} });

//       // ✅ Send success mail after Stripe payment confirmation
//       const user = await User.findById(userId);
//       const order = await Order.findById(orderId).populate("items.product");

//       if (user && order) {
//         console.log(user);
//         await sendPaymentSuccessMail(user.email, user.username, {
//           cartItems: order.items,
//           shippingAddress: order.address,
//           paymentId: paymentIntentId,
//         });
//       }

//       break;
//     }

//     case "payment_intent.payment_failed": {
//       const paymentIntent = event.data.object;
//       const paymentIntentId = paymentIntent.id;

//       const session = await stripeInstance.checkout.sessions.list({
//         payment_intent: paymentIntentId,
//       });

//       const { orderId } = session.data[0].metadata;
//       await Order.findByIdAndDelete(orderId);
//       break;
//     }

//     default:
//       console.error(`Unhandled event type ${event.type}`);
//       break;
//   }

//   response.json({ received: true });
// };

// Get Orders by User ID : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// Get All Orders ( for seller / admin) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// export const stripeWebhooks = async (req, res) => {
//     console.log("loda");
    
//     const signature = req.headers['stripe-signature'];
    
//     try {
//       // Create a new Stripe instance using your secret key
//       const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
      
//       // Verify the event signature
//       const event = stripeInstance.webhooks.constructEvent(
//         req.body,
//         signature,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );
      
//       console.log("Webhook verified! Event type:", event.type);
      
//       // Handle the checkout.session.completed event
//       if (event.type === 'checkout.session.completed') {
//         const session = event.data.object;
//         console.log("Processing completed checkout session:", session.id);
        
//         // Extract metadata
//         const { orderId } = session.metadata;
        
//         // Update the order
//         await Order.findByIdAndUpdate(
//           orderId,
//           {
//             paymentStatus: "Paid",
//             orderStatus: "Processing"
//           },
//           { new: true }
//         );
        
//         console.log("Order updated successfully:", orderId);
//       }
      
//       // Return a 200 response to acknowledge receipt of the event
//       res.status(200).send({ received: true });
//     } catch (err) {
//       console.log(`Webhook Error: ${err.message}`);
//       return res.status(400).send(`Webhook Error: ${err.message}`);
//     }
//   };

export const stripeWebhooks = async (req, res) => {
  console.log("📦 Stripe Webhook Hit");
  const signature = req.headers['stripe-signature'];

  try {
    console.log(process.env.STRIPE_SECRET_KEY);
    
    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
    
    // This line will throw an error if the signature is invalid
    const event = stripeInstance.webhooks.constructEvent(
      req.body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("✅ Webhook verified! Event type:", event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      // Extract orderId and userId from metadata
      const { orderId, userId, cartItems, shippingAddress, email, username } = session.metadata;
      
      if (!orderId || !userId) {
        console.error("❌ Missing orderId or userId in session metadata");
        return res.status(400).send("Missing required metadata");
      }

      // Update order status
      await Order.findByIdAndUpdate(
        orderId,
        {
          isPaid: true,
          paymentStatus: "Paid",
          orderStatus: "Processing"
        }
      );
      
      // Get user and order details
      const order = await Order.findById(orderId).populate("items.product");
      const user = await User.findById(userId);
      
      if (!user || !order) {
        console.error("❌ Could not find user or order", { userId, orderId });
        return res.status(200).send({ received: true }); // Still return 200 to Stripe
      }
      
      // Format order items for email
      const orderItems = order.items.map(item => ({
        name: item.product.name,
        quantity: item.quantity,
        price: item.product.offerPrice
      }));
      
      // Send email
      await sendPaymentSuccessMail(user.email, user.username, orderItems);
      console.log("📧 Payment success email sent to", user.email);
    }

    res.status(200).send({ received: true });
  } catch (err) {
    console.error("❌ Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};