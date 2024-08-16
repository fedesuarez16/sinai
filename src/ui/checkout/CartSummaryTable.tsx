"use client";

import Image from "next/image";
import { useOptimistic } from "react";
import { useLocale, useTranslations } from "next-intl";
import type * as Commerce from "commerce-kit";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/ui/shadcn/table";
import {
	CartItemLineTotal,
	CartItemQuantity,
	CartAmountWithSpinner,
} from "@/ui/checkout/CartItems.client";
import { calculateCartTotalPossiblyWithTax, formatMoney, formatProductName } from "@/lib/utils";
import { YnsLink } from "@/ui/YnsLink";
import { FormatDeliveryEstimate } from "@/ui/checkout/ShippingRatesSection";

export const CartSummaryTable = ({ cart }: { cart: Commerce.Cart }) => {
	const t = useTranslations("/cart.page.summaryTable");
	const locale = useLocale();

	const [optimisticCart, dispatchOptimisticCartAction] = useOptimistic(
		cart,
		(prevCart, action: { productId: string; action: "INCREASE" | "DECREASE" }) => {
			const modifier = action.action === "INCREASE" ? 1 : -1;

			return {
				...prevCart,
				lines: prevCart.lines.map((line) => {
					if (line.product.id === action.productId) {
						return { ...line, quantity: line.quantity + modifier };
					}
					return line;
				}),
			};
		},
	);

	const currency = optimisticCart.lines[0]!.product.default_price.currency;
	const total = calculateCartTotalPossiblyWithTax(optimisticCart);

	// Function to generate the WhatsApp message
	const generateWhatsAppMessage = () => {
		const messageLines = optimisticCart.lines.map((line) => {
			const productName = formatProductName(line.product.name, line.product.metadata.variant);
			const price = formatMoney({
				amount: line.product.default_price.unit_amount ?? 0,
				currency: line.product.default_price.currency,
				locale,
			});
			return `*${productName}*\nPrecio: ${price}\nCantidad: ${line.quantity}\n`;
		});

		const totalAmount = formatMoney({
			amount: total,
			currency: currency,
			locale,
		});

		return `Hola, me gustaría comprar los siguientes productos:\n\n${messageLines.join("\n")}\nTotal: ${totalAmount}`;
	};

	// Function to handle the WhatsApp button click
	const handleWhatsAppClick = () => {
		const message = encodeURIComponent(generateWhatsAppMessage());
		const phoneNumber = "+5491127355725"; // Replace with your business's WhatsApp number
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<form>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="hidden w-24 sm:table-cell">
							<span className="sr-only">{t("imageCol")}</span>
						</TableHead>
						<TableHead className="">Producto</TableHead>
						<TableHead className="w-1/6 min-w-32">Precio</TableHead>
						<TableHead className="w-1/6 min-w-32">Cantidad</TableHead>
						<TableHead className="w-1/6 min-w-32 text-right">{t("totalCol")}</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{optimisticCart.lines.map((line) => (
						<TableRow key={line.product.id}>
							<TableCell className="hidden sm:table-cell sm:w-24">
								{line.product.images[0] && (
									<Image
										className="aspect-square rounded-md object-cover"
										src={line.product.images[0]}
										width={96}
										height={96}
										alt=""
									/>
								)}
							</TableCell>
							<TableCell className="font-medium">
								<YnsLink
									className="transition-colors hover:text-muted-foreground"
									href={`/product/${line.product.metadata.slug}`}
								>
									{formatProductName(line.product.name, line.product.metadata.variant)}
								</YnsLink>
							</TableCell>
							<TableCell>
								{formatMoney({
									amount: line.product.default_price.unit_amount ?? 0,
									currency: line.product.default_price.currency,
									locale,
								})}
							</TableCell>
							<TableCell>
								<CartItemQuantity
									cartId={cart.cart.id}
									quantity={line.quantity}
									productId={line.product.id}
									onChange={dispatchOptimisticCartAction}
								/>
							</TableCell>
							<TableCell className="text-right">
								<CartItemLineTotal
									currency={line.product.default_price.currency}
									quantity={line.quantity}
									unitAmount={line.product.default_price.unit_amount ?? 0}
									productId={line.product.id}
								/>
							</TableCell>
						</TableRow>
					))}
					{cart.shippingRate && (
						<TableRow>
							<TableCell className="hidden sm:table-cell sm:w-24"></TableCell>
							<TableCell className="font-medium" colSpan={3}>
								{cart.shippingRate.display_name}{" "}
								<span className="text-muted-foreground">
									<FormatDeliveryEstimate estimate={cart.shippingRate.delivery_estimate} />
								</span>
							</TableCell>
							<TableCell className="text-right">
								{cart.shippingRate.fixed_amount &&
									formatMoney({
										amount: cart.shippingRate.fixed_amount.amount,
										currency: cart.shippingRate.fixed_amount.currency,
										locale,
									})}
							</TableCell>
						</TableRow>
					)}
				</TableBody>
				<TableFooter>
					{optimisticCart.cart.taxBreakdown.map((tax, idx) => (
						<TableRow key={idx + tax.taxAmount} className="font-normal">
							<TableCell className="hidden w-24 sm:table-cell"></TableCell>
							<TableCell colSpan={3} className="text-left">
								{tax.taxType.toLocaleUpperCase()} {tax.taxPercentage}%
							</TableCell>
							<TableCell className="text-left">
								<CartAmountWithSpinner total={tax.taxAmount} currency={currency} />
							</TableCell>
						</TableRow>
					))}
					<TableCell></TableCell>

					<TableRow className="text-left text-lg font-semibold text-gray-800">
						<TableCell colSpan={3} className="w-24 text-left">
							{t("totalSummary")}:
							<CartAmountWithSpinner total={total} currency={currency} /> ARS
						</TableCell>
					</TableRow>
					<TableCell colSpan={5} className="text-left">
						<button
							type="button"
							onClick={handleWhatsAppClick}
							className="mt-4 rounded-full bg-gray-900 px-12 py-3 text-[1.1rem] text-white hover:bg-gray-800"
						>
							Comprar
						</button>
					</TableCell>
				</TableFooter>
			</Table>
		</form>
	);
};
