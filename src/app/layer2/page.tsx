import Link from "next/link"
import TestThreeSceneCanvas from "~/components/_test/TestThreeScene"
import DBDoodes, { getDoodesFromDB } from "./DBDoodes"

export default async function Layer2Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#24984c] to-[#152c2b] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<Link
					className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"
					href="https://github.com/Decemberay-DA?tab=overview&from=2024-05-01&to=2024-05-10">
					Layer2Page
				</Link>
				<div className="w-full h-fit bg-slate-900 flex flex-col gap-4">
					<TestThreeSceneCanvas />
					<DBDoodes doodes={await getDoodesFromDB()} />
				</div>
			</div>
		</main>
	)
}
