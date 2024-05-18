import Link from "next/link"
import DBDoodes from "../../components/_test/DBDoodes"
import { getAllDoodesFromDB } from "~/server/queries"

import { dynamicBlob, dynamicCommon, dynamicView } from "~/components/dinamicImports/3dModels"
import dynamic from "next/dynamic"

const HookedThing = dynamic(() => import("~/components/myFirstFrickingReactComponentsOMG/HookedThing"), {
	ssr: false,
})
const HookedThingReferenced = dynamic(
	() => import("~/components/myFirstFrickingReactComponentsOMG/HookedThingReferenced"),
	{
		ssr: false,
	},
)
const Blob = dynamicBlob()
const Common = dynamicCommon()
const View = dynamicView()

export default async function Layer2Page() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#24984c] to-[#152c2b] text-white">
			<div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
				<Link
					className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]"
					href="https://github.com/Decemberay-DA?tab=overview&from=2024-05-01&to=2024-05-10">
					Layer2Page
				</Link>

				<div className="flex flex-row gap-2 w-full h-48 content-stretch">
					<HookedThing />
					<HookedThing />
					<HookedThingReferenced />
				</div>

				<View className="relative h-20 w-full ">
					<Blob position={[-1.2, 0, 0]} />
					<Blob position={[0, 0, 0]} />
					<Blob position={[1.2, 0, 0]} />
					<Common />
				</View>

				<div className="w-full h-fit bg-slate-900 flex flex-col gap-4">
					<p className="text-2xl font-bold">meet the DBDoodes:</p>
					<DBDoodes doodes={await getAllDoodesFromDB()} />
				</div>
			</div>
		</main>
	)
}
