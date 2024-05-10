"use client"

import { Sphere } from "@react-three/drei"
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

import dynamic from "next/dynamic"
import { Suspense } from "react"

const Common = dynamic(
	() =>
		import("@/components/canvas/View").then((mod) => {
			console.log("Common was loaded")
			return mod.Common
		}),
	{ ssr: false },
)
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

const Logo = dynamic(
	() =>
		import("@/components/canvas/Examples").then((mod) => {
			console.log("Logo was loaded")
			return mod.Logo
		}),
	{ ssr: false },
)
const Dog = dynamic(
	() =>
		import("@/components/canvas/Examples").then((mod) => {
			console.log("Dog was loaded")
			return mod.Dog
		}),
	{ ssr: false },
)
const Duck = dynamic(() => import("@/components/canvas/Examples").then((mod) => mod.Duck), { ssr: false })

const View = dynamic(
	() =>
		import("@/components/canvas/View").then((mod) => {
			console.log("View was loaded")
			return mod.View
		}),
	{
		ssr: false,
		loading: () => <Loading />,
	},
)

// export const TestThreeScene = () => {
// 	return (
// 		<div className="w-full text-center md:w-3/5">
// 			<View orbit className="relative h-full sm:h-48 sm:w-full">
// 				{/* <Dog scale={2} position={[0, -1.6, 0]} rotation={[0.0, -0.3, 0]} /> */}
// 				<Sphere position={[0, -1.6, 0]} args={[0.5, 32, 32]} />
// 				<Common color={"lightpink"} />
// 			</View>
// 		</div>
// 	)
// }

// when using simple canvas
import { createRoot } from "react-dom/client"
import React, { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { THREE } from "~/exp"

type BoxProps = {
	position?: THREE.Vector3
	props?: {
		[x: string]: any
	}
}
const Box = (props: BoxProps) => {
	// This reference gives us direct access to the THREE.Mesh object
	const ref = useRef<THREE.Mesh>(null)
	// const ref = useRef<THREE.Mesh | null>(null)
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	// Subscribe this component to the render-loop, rotate the mesh every frame
	// Return the view, these are regular Threejs elements expressed in JSX
	useFrame((state, delta) => (ref.current!.rotation.x += delta))

	return (
		<mesh
			{...props.props}
			ref={ref}
			position={props.position}
			scale={clicked ? 1.5 : 1}
			onClick={(event) => click(!clicked)}
			onPointerOver={(event) => hover(true)}
			onPointerOut={(event) => hover(false)}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	)
}
export const TestThreeScene = () => {
	return (
		<div className="w-full text-center md:w-3/5">
			<Canvas>
				<ambientLight intensity={Math.PI / 2} />
				<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
				<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
				{/* <Box position={[-1.2, 0, 0]} /> */}
				<Box position={new THREE.Vector3(1.2, 0, 0)} />
			</Canvas>
		</div>
	)
}
// loading scene on client side
export const createVizDataCard = (props: VizCardProp) => {
	const imageContainer = () => <img src={props.imageURL} alt="imageContainer" className="w-full h-auto" />
	// const fiberContainer = () => <img src={props.imageURL} alt="fiberContainer" className="w-[50%] h-auto" />
	const fiberContainer = TestThreeScene
	const isThree = Math.random() > 0.5
	const banana = isThree ? fiberContainer : imageContainer
	const thePoint = isThree ? (
		<p className="bg-red-500 w-fit h-fit">three scene</p>
	) : (
		<p className="bg-green-500 w-fit h-fit">fiber scene</p>
	)

	return (
		<div className="flex flex-col gap-2 p-4 bg-GACTIVEABLE rounded-lg">
			<div className="w-full h-fit p-4 flex flex-col allign-items-center">
				{banana()}
				<div className="items-center justify-center">{thePoint}</div>
			</div>
			<div className="text-lg font-semibold">{props.category}</div>
			{createTagRow(props.tags)}
		</div>
	)
}

export const TestVizDataList = () => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
			{pipe(
				vizData,
				array.map((a) => ({ ...a, category: wrapStringInPipe(a.category) })),
				(a) => a.map(createVizDataCard),
			)}
		</div>
	)
}
