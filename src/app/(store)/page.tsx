import type { Metadata } from "next/types";
import * as Commerce from "commerce-kit";
import Link from "next/link";
import Image from "next/image";
import Logo from "./logo.png";
import { ProductList } from "@/ui/products/productList";
import { CategoryBox } from "@/ui/CategoryBox";
import Mesa from "@/images/mesa.png";
import Sillon from "@/images/sillones.png";
import Respaldos from "@/images/respaldos.png";
import { publicUrl } from "@/env.mjs";
import Envios from "@/app/(store)/Envios";

export const metadata = {
	alternates: { canonical: publicUrl },
} satisfies Metadata;

export default async function Home() {
	const products = await Commerce.productBrowse({ first: 6 });

	return (
		<main>
			<section className="relative w-full rounded-lg">
				<video
					src="/banner.mp4"
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
						<Image
							alt="idk"
							src={Logo}
							width={250}
							height={160}
							className="mx-auto object-contain text-xl font-bold"
						/>
						<p className="px-4 text-lg tracking-tighter text-gray-300 md:text-xl">
							Descubri nuestra amplia coleccion de muebles diseñados para brindarte estilo y comfort
						</p>
						<Link
							href="#"
							className="my-4 inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
							prefetch={false}
						>
							Ver productos
						</Link>
					</div>
				</div>
			</section>

			<Envios />

			<ProductList products={products} />

			<section className="w-full py-8">
				<div className="grid gap-8 lg:grid-cols-3">
					{[
						{ categorySlug: "sillas y mesas", src: Mesa },
						{ categorySlug: "sillones", src: Sillon },
						{ categorySlug: "respaldos", src: Respaldos },
					].map(({ categorySlug, src }) => (
						<CategoryBox key={categorySlug} categorySlug={categorySlug} src={src} />
					))}
				</div>
			</section>
		</main>
	);
}
