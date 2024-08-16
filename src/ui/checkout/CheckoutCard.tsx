import * as Commerce from "commerce-kit";
import amex from "@/images/payments/amex.svg";
import blik from "@/images/payments/blik.svg";
import google_pay from "@/images/payments/google_pay.svg";
import klarna from "@/images/payments/klarna.svg";
import link from "@/images/payments/link.svg";
import mastercard from "@/images/payments/mastercard.svg";
import p24 from "@/images/payments/p24.svg";
import visa from "@/images/payments/visa.svg";
import { StripePayment } from "@/ui/checkout/stripePayment";

export const paymentMethods = {
	amex,
	blik,
	google_pay,
	klarna,
	link,
	mastercard,
	p24,
	visa,
};

export const CheckoutCard = async ({ cart }: { cart: Commerce.Cart["cart"] }) => {
	const shippingRates = await Commerce.shippingBrowse();

	return (
		<section className="max-w-md pb-12">
			<StripePayment
				shippingRateId={cart.metadata.shippingRateId}
				shippingRates={structuredClone(shippingRates.data)}
			/>
		</section>
	);
};
