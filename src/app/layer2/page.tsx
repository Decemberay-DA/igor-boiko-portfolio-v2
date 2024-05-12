import Link from "next/link"
import DBDoodes from "../../components/_test/DBDoodes"
import { getAllDoodesFromDB } from "~/server/queries"
import HookedThing from "~/components/myFirstFrickingReactComponentsOMG/HookedThing"
import HookedThingReferenced from "~/components/myFirstFrickingReactComponentsOMG/HookedThingReferenced"

// to always get current db data
// export const dynamic = "force-dynamic"

import dynamic from "next/dynamic"
const Blob = dynamic(() => import("~/components/canvas/Examples").then((mod) => mod.Blob), { ssr: false })
const Common = dynamic(() => import("~/components/canvas/Common"), { ssr: false })
const View = dynamic(() => import("~/components/canvas/View"), {
	ssr: false,
	loading: () => (
		<div className="flex h-96 w-full flex-col items-center justify-center">
			<svg
				className="-ml-1 mr-3 h-5 w-5 animate-spin-reverse text-black"
				fill="none"
				viewBox="0 0 24 24">
				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		</div>
	),
})

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

				{/* <TestThreeSceneCanvas /> */}

				<div className="h-20 w-full">
					<View className="absolute top-0 flex h-full w-full flex-col items-center justify-center">
						<Blob position={[-1.2, 0, 0]} scale={0.2} />
						<Blob position={[0, 0, 0]} scale={0.2} />
						<Blob position={[1.2, 0, 0]} scale={0.2} />
						{/* <OrbitControls /> */}
						{/* <Common color={"#1fb200"} /> */}
						<Common />
					</View>
				</div>

				<div className="w-full h-fit bg-slate-900 flex flex-col gap-4">
					<p className="text-2xl font-bold">meet the DBDoodes:</p>
					<DBDoodes doodes={await getAllDoodesFromDB()} />
				</div>
			</div>
		</main>
	)
}
