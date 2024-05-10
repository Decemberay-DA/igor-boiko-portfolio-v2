import { array } from "fp-ts"
import { pipe } from "fp-ts/lib/function"

export type VizCardProp = {
	imageURL: string
	category: string
	tags: string[]
}

const categories = [
	"Analytics",
	"History",
	"Market",
	"Economics",
	"Sales",
	"Chart",
	"Forecast",
	"Comparison",
	"Indicators",
]
const imageExamples = ["https://via.placeholder.com/150"]
const tagOptions = [
	["data", "chart", "analytics", "visualization"],
	["history", "data", "trends"],
	["forecast", "market", "future", "trends"],
	["economics", "comparison", "indicators"],
	["sales", "yearly", "bar chart"],
	["charts", "visualization", "data"],
	["forecast", "market", "future", "trends"],
	["comparison", "indicators", "data", "chart"],
	["indicators", "data", "chart", "trends"],
	["data", "chart", "analytics", "visualization"],
]

function getRandomItem<T>(items: T[]): T {
	return items[Math.floor(Math.random() * items.length)]!
}
const randomTags = (): string[] => getRandomItem(tagOptions)
const randomCategory = (): string => getRandomItem(categories)
const randomImageURL = (): string => getRandomItem(imageExamples)

function generateRandomVizData(): VizCardProp[] {
	return Array.from({ length: 24 }, () => ({
		imageURL: randomImageURL(),
		category: randomCategory(),
		tags: randomTags(),
	}))
}

const vizData: VizCardProp[] = generateRandomVizData()

const wrapStringInPipe = (str: string) => "| " + str + " |"

export const createTagChip = (tag: string) => {
	return (
		<div className="inline-block bg-GACTIVERIGHT text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
			{tag}
		</div>
	)
}

export const createTagRow = (tags: string[]) => {
	return <div className="flex flex-wrap gap-2">{tags.map((tag) => createTagChip(tag))}</div>
}

// three scene stuff ========-====-====-====-============

// loading scene on client side
import dynamic from "next/dynamic"
const Three = dynamic(() => import("./Three").then((m) => m.Three), { ssr: false })
const CommonBG = dynamic(() => import("./commonBG").then((m) => m.CommonBG), { ssr: false })

import { View as ViewImpl } from "@react-three/drei"

export const createVizDataCard = (props: VizCardProp) => {
	const imageContainer = () => <img src={props.imageURL} alt="imageContainer" className="w-full h-auto" />
	const fiberContainer = () => <img src={props.imageURL} alt="fiberContainer" className="w-[50%] h-auto" />
	
	// some problems with loading it on server side for some reason => fix
	// const fiberContainer = () => {
	// 	return (
	// 		<Three>
	// 			{/* <Suspense fallback={<div>Loading...</div>}> */}
	// 			<ViewImpl>
	// 				<CommonBG />
	// 			</ViewImpl>
	// 			{/* </Suspense> */}
	// 		</Three>
	// 	)
	// }

	const isUsingFiberScene = Math.random() > 0.5
	const banana = isUsingFiberScene ? fiberContainer : imageContainer

	return (
		<div className="flex flex-col gap-2 p-4 bg-GACTIVEABLE rounded-lg">
			{banana()}
			<div className="text-lg font-semibold">{props.category}</div>
			{createTagRow(props.tags)}
		</div>
	)
}

export const createVizDataList = () => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
			{pipe(
				vizData,
				array.map((a) => ({ ...a, category: wrapStringInPipe(a.category) })),
				(a) => a.map(createVizDataCard),
				// (a) => (
				// 	<div>{a}</div>
				// ),
			)}
		</div>
	)
}
