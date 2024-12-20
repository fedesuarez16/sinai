import Image from "next/image";
import { getLocale } from "next-intl/server";
import type * as Commerce from "commerce-kit";
import { JsonLd, mappedProductsToJsonLd } from "@/ui/JsonLd";
import { YnsLink } from "@/ui/YnsLink";
import { formatMoney } from "@/lib/utils";

export const ProductList = async ({ products }: { products: Commerce.MappedProduct[] }) => {
	const locale = await getLocale();

	return (
		<>
			<ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-2 lg:grid-cols-5">
				{products.map((product, idx) => {
					return (
						<li key={product.id} className="group">
							<YnsLink href={`/product/${product.metadata.slug}`}>
								<article className="overflow-hidden rounded border bg-white">
									{product.images[0] && (
										<div className="aspect-square w-full overflow-hidden bg-neutral-100">
											<Image
												className="group-hover:rotate hover-perspective w-full bg-neutral-100 object-contain object-center transition-opacity group-hover:opacity-75"
												src={product.images[0]}
												width={768}
												height={768}
												loading={idx < 5 ? "eager" : "lazy"}
												priority={idx < 5}
												sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 700px"
												alt=""
											/>
										</div>
									)}
									<div className="p-4">
										<h2 className="text-md font-semibold text-neutral-600">{product.name}</h2>
										<footer className="font-regular text-sm text-neutral-900">
											{product.default_price.unit_amount && (
												<p className="">
													{formatMoney({
														amount: product.default_price.unit_amount,
														currency: product.default_price.currency,
														locale,
													})}
												</p>
											)}
											<p className="mt-1 text-[13px] text-green-700">
												Hasta 6 cuotas sin interes <br />
												Envio sin cargo
											</p>
										</footer>
									</div>
								</article>
							</YnsLink>
						</li>
					);
				})}
			</ul>
			<JsonLd jsonLd={mappedProductsToJsonLd(products)} />
		</>
	);
};
