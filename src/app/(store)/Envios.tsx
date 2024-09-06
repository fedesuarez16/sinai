/* eslint-disable import/no-default-export */
import Image from "next/image";
import Logo from "./envios.png";

export default function Envios() {
	return (
		<section className="relative my-4 flex h-[20vh] items-center justify-center rounded-sm bg-gray-100 lg:h-[30vh]">
			<div className="relative z-10 flex flex-col items-center py-4 text-center text-white">
				<h1 className="text-lg font-semibold tracking-tighter text-black">
					Hacemos envíos a todo el país
				</h1>
				<p className="font-regular text-[13px] tracking-tighter text-gray-600">
					Recibí tus productos rápido, fácil y a tu puerta.
				</p>
				<div className="mt-2">
					<Image alt="Logo" src={Logo} width={50} height={50} className="object-contain" />
				</div>
			</div>
		</section>
	);
}
