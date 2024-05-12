"use client"
import { useState, useEffect, ComponentProps } from "react"

type Props = {
	children?: React.ReactNode
} & ComponentProps<"div">

export default function HookedThing({ children, ...rest }: Props) {
	const [val, setVal] = useState(0)

	useEffect(() => {
		let animationFrameId: number | null = null

		const updateValue = () => {
			setVal((prevVal) => prevVal + 1)
			animationFrameId = requestAnimationFrame(updateValue)
		}

		updateValue()
		return () => {
			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId)
			}
		}
	}, [])

	const [dep, setDep] = useState("0")
	useEffect(() => {
		const d = val % 4 === 0 ? "no4" : `>> ${val} <<`
		setDep(d)
	}, [val])

	return (
		<div
			{...rest}
			className="flex flex-col flex-grow flex-shrink gap-2 border-2 border-red-500 p-4 bg-gray-500 rounded-lg">
			<div className="text-lg text-center">HookedThing:</div>
			<div>frame count: </div>
			<div>{val}</div>
			<button
				onClick={() => setVal(0)}
				className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">
				reset
			</button>
			<div>dep: {dep}</div>
			{children}
		</div>
	)
}
