import { array } from "fp-ts"
import { pipe } from "fp-ts/lib/function"

export const createTagRow = (tags: string[]) => {
	return <div className="flex flex-wrap gap-2">{tags.map((tag) => TagChip({ tag: tag }))}</div>
}

// three scene stuff ========-====-====-====-============

import dynamic from "next/dynamic"
import { Suspense } from "react"

const Common = dynamic(() => import("@/components/canvas/View"), { ssr: false })
const Loading = () => (
	<div className="flex h-96 w-full flex-col items-center justify-center">
		<svg
			className="animate-spin h-12 w-12 text-black"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24">
			<circle
				className="opacity-25"
				cx="12"
				cy="12"
				r="10"
				stroke="currentColor"
				strokeWidth="4"></circle>
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
		</svg>
	</div>
)

const Logo = dynamic(() => import("@/components/canvas/Examples").then((mod) => mod.Logo), { ssr: false })
const Dog = dynamic(() => import("@/components/canvas/Examples").then((mod) => mod.Dog), { ssr: false })
const Duck = dynamic(() => import("@/components/canvas/Examples").then((mod) => mod.Duck), { ssr: false })

const View = dynamic(() => import("@/components/canvas/View"), {
	ssr: false,
	loading: () => <Loading />,
})

// when using simple canvas
import React from "react"
import TestThreeSceneCanvas from "../_test/TestThreeScene"
import { VizCardProp, vizData, wrapStringInPipe } from "./testData"
import { id } from "fp-ts/lib/Refinement"
import TagChip from "./TagChip"

// loading scene on client side
export const createVizDataCard = (props: VizCardProp) => {
	const imageContainer = () => <img src={props.imageURL} alt="imageContainer" className="w-full h-auto" />
	const fiberContainer = () => <TestThreeSceneCanvas />

	const isThree = Math.random() > 0.5
	const scene = isThree ? fiberContainer : imageContainer
	const thePoint = isThree ? (
		<p className="bg-red-500 w-fit h-fit">three scene</p>
	) : (
		<p className="bg-green-500 w-fit h-fit">fiber scene</p>
	)

	return (
		<div className="flex flex-col gap-2 p-4 bg-GACTIVEABLE rounded-lg">
			<div className="w-full h-fit p-4 flex flex-col allign-items-center">
				<div className="w-full h-full justify-start items-center">{scene()}</div>
				<div className="items-center justify-center">{thePoint}</div>
			</div>
			<div className="text-lg font-semibold">{props.category}</div>
			{createTagRow(props.tags)}
		</div>
	)
}

const data = vizData

export const TestVizDataList = () => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
			{pipe(
				data,
				array.mapWithIndex((index, a) =>
					pipe(
						{
							...a,
							category: wrapStringInPipe(a.category),
							id: index,
						},
						createVizDataCard,
					),
				),
			)}
		</div>
	)
}
