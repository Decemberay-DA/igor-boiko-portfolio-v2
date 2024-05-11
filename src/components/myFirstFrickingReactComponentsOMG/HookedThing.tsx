"use client"

import { useState, useEffect } from "react"

/**
 * hooks
 */
export default function HookedThing({ ...props }) {
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

	return (
		<div
			{...props}
			className="flex flex-col flex-grow flex-shrink gap-2 border-2 border-red-500 p-4 bg-gray-500 rounded-lg">
			<div className="text-lg text-center">HookedThing:</div>
			<div>frame count: </div>
			<div>{val}</div>
			<button
				onClick={() => setVal(0)}
				className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded">
				reset
			</button>
		</div>
	)
}
