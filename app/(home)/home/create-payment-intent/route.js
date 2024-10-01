import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(
  "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"
);

const createSession = async (amount, description, req) => {
  return await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: "Kinetik Event Registration",
            description,
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
};

export async function POST(req) {
  try {
    const { eventId, prizeAmount, percentage } = await req.json();
    const amount = Math.max(Math.round(percentage * prizeAmount), 100);

    let session = null;
    const descriptions = {
      10: "We are charging you 10% initially for event registration. After the completion of the challenge, if you like the report and want access to the MVPs, you can pay the remaining 90%.",
      90: "Thank you for completing the challenge with us! We will send you the code and developer information once you have paid the remaining 90%.",
    };

    if (percentage === 10 || percentage === 90) {
      session = await createSession(amount, descriptions[percentage], req);
    }

    if (!session) {
      throw new Error("Invalid percentage value provided.");
    }

    return NextResponse.json({ id: session.id, url: session.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json(
      { error: "An error occurred while creating the checkout session." },
      { status: 500 }
    );
  }
}
