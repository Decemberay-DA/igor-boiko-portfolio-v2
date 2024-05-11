import Link from "next/link"
import TestThreeSceneCanvas from "~/components/_test/TestThreeScene"
import DBDoodes from "../../components/_test/DBDoodes"
import { getAllDoodesFromDB } from "~/server/queries"
import HookedThing from "~/components/myFirstFrickingReactComponentsOMG/HookedThing"
import HookedThingReferenced from "~/components/myFirstFrickingReactComponentsOMG/HookedThingReferenced"

// to always get current bd data
// export const dynamic = "force-dynamic"

export default async function Layer2Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#24984c] to-[#152c2b] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<Link
					className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"
					href="https://github.com/Decemberay-DA?tab=overview&from=2024-05-01&to=2024-05-10">
					Layer2Page
				</Link>
				<div className="flex flex-row gap-2 w-full h-fit content-stretch">
					<HookedThing />
					<HookedThing />
					<HookedThingReferenced />
				</div>
				<div className="w-full h-fit bg-slate-900 flex flex-col gap-4">
					<TestThreeSceneCanvas />
					<p className="text-2xl font-bold">meet the DBDoodes:</p>
					<DBDoodes doodes={await getAllDoodesFromDB()} />
				</div>
			</div>
		</main>
	)
}
