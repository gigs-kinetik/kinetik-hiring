import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe('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');

export async function POST(req) {
    try {
      const { eventId } = await req.json();
  
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Event Registration Fee',
              },
              unit_amount: 2000, // $20.00 in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.get('origin')}`,
        cancel_url: `${req.headers.get('origin')}`,
      });
  
      return NextResponse.json({ id: session.id, url: session.url });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      return NextResponse.json(
        { error: 'An error occurred while creating the checkout session.' },
        { status: 500 }
      );
    }
  }