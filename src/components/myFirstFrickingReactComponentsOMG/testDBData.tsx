import { array } from "fp-ts"
import { pipe } from "fp-ts/lib/function"

export const createTagRow = (tags: string[]) => {
	return <div className="flex flex-wrap gap-2">{tags.map((tag) => TagChip({ tag: tag }))}</div>
}

// when using simple canvas
import React from "react"
import TestThreeSceneCanvas from "../_test/TestThreeScene"
import { VizCardProp, vizData, wrapStringInPipe } from "./testData"
import TagChip from "./TagChip"

// loading scene on client side
export const createVizDataCard = (props: VizCardProp) => {
	const imageContainer = () => <img src={props.imageURL} alt={props.category} className="w-full h-auto" />
	const fiberContainer = () => <TestThreeSceneCanvas />

	const isThree = Math.random() > 0.5
	const scene = isThree ? fiberContainer : imageContainer
	const thePoint = isThree ? (
		<p className="bg-red-500 w-fit h-fit text-center">three scene</p>
	) : (
		<p className="bg-green-500 w-fit h-fit text-center">fiber scene</p>
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
	const a = pipe(
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
	)
	return <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">{a}</div>
}
