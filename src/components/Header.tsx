"use client"

import { useRouter } from "next/navigation"

export const Header = ({ ...props }: React.ComponentProps<"header">) => (
	<header
		{...props}
		className="flex h-16 w-full items-center justify-between bg-[#0a192f] px-4 py-2 text-white sticky top-0 ">
		<h2 className="text-2xl font-bold z-[9999999999999]">Igor Boiko The Dev V4</h2>
		<h1
			className=" bg-green-500 hover:bg-green-300 text-white py-2 px-4 roundedtext-2xl font-bold"
			onClick={() => useRouter().push("/")}>
			main
		</h1>
		<h2 className="text-2xl font-bold">Igor Boiko The Dev V4</h2>
	</header>
)
