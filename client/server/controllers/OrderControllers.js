import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51OVF2FFtPsf5aAn444kjK8yDiz9kfNfk6csS9JFZ1eX4EVPySZejEuCUV6jgptl3BCPZ0GgfVsPSZ7QBk7BKCIYm00Ic2vLHkh"
);

export const addOrder = async (req, res, next) => {
  try {
    if (req.body.gigId) {
      const { gigId } = req.body;
      const prisma = new PrismaClient();
      const gig = await prisma.gigs.findUnique({
        where: { id: parseInt(gigId) },
      });

      const paymentIntent = await stripe.paymentIntents.create({
        amount: gig?.price * 100,
        currency: "sgd",
        automatic_payment_methods: {
          enabled: true,
        },
      });

      await prisma.orders.create({
        data: {
          paymentIntent: paymentIntent.id,
          price: gig?.price,
          buyer: { connect: { id: req.userId } },
          gig: { connect: { id: parseInt(gigId) } },
        },
      });
      return res
        .status(200)
        .json({ clientSecret: paymentIntent.client_secret });
    }
    return res.status(400).send("");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    if (req.body.paymentIntent) {
      const prisma = new PrismaClient();
      await prisma.orders.update({
        where: { paymentIntent: req.body.paymentIntent },
        data: { isCompleted: true },
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getBuyerOrders = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const orders = await prisma.orders.findMany({
        where: { buyerId: req.userId, isCompleted: true },
        include: { gig: true },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};

export const getSellerOrders = async (req, res, next) => {
  try {
    if (req.userId) {
      const prisma = new PrismaClient();
      const orders = await prisma.orders.findMany({
        where: {
          gig: {
            createdBy: {
              id: parseInt(req.userId),
            },
          },
          isCompleted: true,
        },
        include: { gig: true, buyer: true },
      });
      return res.status(200).json({ orders });
    }
    return res.status(400).send("User id is required");
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
};
