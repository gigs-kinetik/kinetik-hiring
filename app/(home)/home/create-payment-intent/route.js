import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Psqxk2NzaRLv3FP8yub2iweMS0thMguUu18oOZYWVGR5LuTXTIPt1QqhghCIK7akZy0I2rWql0RjEpZImaYXtEF00qYkABKMQ"
);

export async function POST(req) {
  try {
    const { eventId, prizeAmount } = await req.json();
    const amount = Math.max(Math.round(prizeAmount * 10), 100);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Event Registration Fee",
              description: "Hello",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/home`,
      cancel_url: `${req.headers.get("origin")}/home`,
    });
    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the checkout session." },
      { status: 500 }
    );
  }
}
