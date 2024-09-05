import type { Metadata } from "next/types";
import * as Commerce from "commerce-kit";
import Link from "next/link";
import { ProductList } from "@/ui/products/productList";
import { CategoryBox } from "@/ui/CategoryBox";
import AccessoriesImage from "@/images/accessories.png";
import ApparelImage from "@/images/electrodomesticos.png";
import { publicUrl } from "@/env.mjs";

export const metadata = {
	alternates: { canonical: publicUrl },
} satisfies Metadata;

export default async function Home() {
	const products = await Commerce.productBrowse({ first: 6 });

	return (
		<main>
			<section className="relative w-full rounded-lg">
				<video
					src="/banner.mp4" // Reemplaza con la ruta de tu video
					width="1200"
					height="100"
					autoPlay
					loop
					muted
					playsInline
					className="h-[400px] w-full rounded-lg object-cover object-center"
					style={{ aspectRatio: "1200/600", objectFit: "cover" }}
				/>
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-[rgba(0,0,0,0.9)] to-[rgba(0,0,0,0.3)] px-4 md:px-6">
					<div className="max-w-2xl space-y-4 text-center">
						<h1 className="text-3xl font-bold text-white sm:text-5xl md:text-5xl">
							Descubri nuestra coleccion de muebles Premium
						</h1>
						<p className="text-lg text-white md:text-xl">
							Discover our collection of expertly crafted furniture designed to bring comfort and
							style to your home.
						</p>
						<Link
							href="#"
							className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							prefetch={false}
						>
							Ver productos
						</Link>
					</div>
				</div>
			</section>

			<ProductList products={products} />

			<section className="w-full py-8">
				<div className="grid gap-8 lg:grid-cols-2">
					{[
						{ categorySlug: "accessories", src: AccessoriesImage },
						{ categorySlug: "apparel", src: ApparelImage },
					].map(({ categorySlug, src }) => (
						<CategoryBox key={categorySlug} categorySlug={categorySlug} src={src} />
					))}
				</div>
			</section>
		</main>
	);
}
