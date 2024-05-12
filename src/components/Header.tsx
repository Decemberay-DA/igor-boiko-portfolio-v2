"use client"

import { useRouter } from "next/navigation"

export const Header = ({ ...props }) => {
	const router = useRouter()
	return (
		<header
			className="flex h-16 w-full items-center justify-between bg-[#0a192f] px-4 py-2 text-white sticky top-0"
			{...props}>
			<h2 className="text-2xl font-bold">Igor Boiko The Dev V2</h2>
			<h1
				className=" bg-green-500 hover:bg-green-300 text-white py-2 px-4 roundedtext-2xl font-bold"
				onClick={() => router.push("/")}>
				main
			</h1>
			<h1
				className=" bg-green-500 hover:bg-green-300 text-white py-2 px-4 roundedtext-2xl font-bold"
				onClick={() => router.push("/layer2")}>
				l2
			</h1>
			<h1
				className=" bg-green-500 hover:bg-green-300 text-white py-2 px-4 roundedtext-2xl font-bold"
				onClick={() => router.push("/page2")}>
				p2
			</h1>
			<h2 className="text-2xl font-bold">Igor Boiko The Dev V3</h2>
		</header>
	)
}
