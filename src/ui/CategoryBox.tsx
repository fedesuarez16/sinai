import Image, { type ImageProps } from "next/image";
import { deslugify } from "@/lib/utils";
import { YnsLink } from "@/ui/YnsLink";

export function CategoryBox({
	categorySlug,
	src,
}: {
	categorySlug: string;
	src: ImageProps["src"];
}) {
	return (
		<YnsLink href={`/category/${categorySlug}`} className="group relative block">
			<div className="relative overflow-hidden rounded-lg bg-neutral-100">
				{/* Imagen más oscura con un overlay */}
				<Image
					alt="Cover image"
					className="w-full scale-105 object-cover transition-all group-hover:scale-100"
					sizes="(max-width: 1024x) 100vw, (max-width: 1280px) 50vw, 620px"
					src={src}
				/>
				<div className="absolute inset-0 bg-black opacity-40 transition-opacity group-hover:opacity-50"></div>
			</div>

			{/* Texto encima de la imagen */}
			<div className="absolute inset-0 flex flex-col items-center justify-center px-4 py-2 text-center text-white">
				<h3 className="text-4xl font-semibold tracking-tight">{deslugify(categorySlug)}</h3>
				<p className="mt-2 text-sm">Ver productos</p>
			</div>
		</YnsLink>
	);
}
