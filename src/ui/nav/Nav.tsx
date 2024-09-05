import Image from "next/image";
import Logo from "./logo.png";
import { CartSummaryNav } from "@/ui/nav/CartSummaryNav";
import { SeoH1 } from "@/ui/SeoH1";
import { SearchNav } from "@/ui/nav/SearchNav";
import { NavMenu } from "@/ui/nav/NavMenu";
import { YnsLink } from "@/ui/YnsLink";

const links = [
	{
		label: "Home",
		href: "/",
	},
	{
		label: "Apparel",
		href: "/category/apparel",
	},
	{
		label: "Accessories",
		href: "/category/accessories",
	},
];

export const Nav = () => {
	return (
		<header className="border-b py-4">
			<div className="sm:items-centerm mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 sm:flex-row sm:flex-wrap sm:items-center sm:px-6 md:flex-nowrap lg:px-8">
				<YnsLink href="/">
					<Image
						alt="idk"
						src={Logo}
						width={150}
						height={120}
						className="-mt-0.5 whitespace-nowrap text-xl font-bold"
					/>
				</YnsLink>

				<div className="sm:mr-auto">
					<NavMenu links={links} />
				</div>

				<div className="flex items-center justify-start gap-x-6">
					<SearchNav />
					<CartSummaryNav />
				</div>
			</div>
		</header>
	);
};
