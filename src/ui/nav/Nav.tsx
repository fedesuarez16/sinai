import Image from "next/image";
import Logo from "./logo.png";
import { CartSummaryNav } from "@/ui/nav/CartSummaryNav";
import { SearchNav } from "@/ui/nav/SearchNav";
import { NavMenu } from "@/ui/nav/NavMenu";
import { YnsLink } from "@/ui/YnsLink";

export const Categories = [
	{ name: "electrodomesticos", slug: "electrodomesticos" },
	{ name: "Accessorios", slug: "accessorios" },
];

export const Nav = () => {
	return (
		<header className="border-b py-4">
			<div className="sm:items-centerm mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6 md:flex-nowrap lg:px-8">
				{/* En mobile, el logo aparece al lado del NavMenu */}
				<div className="flex w-full items-center sm:w-auto">
					<YnsLink href="/" className="mr-4 sm:mr-0">
						<Image
							alt="idk"
							src={Logo}
							width={120}
							height={80}
							className="whitespace-nowrap text-xl font-bold"
						/>
					</YnsLink>

					{/* Logo al lado del NavMenu solo en mobile */}
					<div className="ml-20 block sm:hidden">
						<NavMenu />
					</div>
				</div>

				{/* NavMenu solo en desktop */}
				<div className="hidden sm:mr-auto sm:block">
					<NavMenu />
				</div>

				<div className="flex items-center justify-start gap-x-6">
					<SearchNav />
					<CartSummaryNav />
				</div>
			</div>
		</header>
	);
};
