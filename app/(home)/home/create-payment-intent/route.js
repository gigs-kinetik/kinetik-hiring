import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "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"
);

export async function POST(req) {
  try {
    const { eventId, prizeAmount,percentage } = await req.json();
    const amount = Math.max(Math.round(percentage * prizeAmount), 100);
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Kinetik Event Registration",
              description:
                "We are charging you 10% intitially for Event registration. After the completion of the challenge, if you like the report and want access to the MVPs, you can pay the remaining 90%.",
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
