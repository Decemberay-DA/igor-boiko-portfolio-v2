"use client"
import { useState, useEffect, useRef, ComponentProps } from "react"

type Props = {
	props?: ComponentProps<"div">
	children?: React.ReactNode
}

export default function HookedThingReferenced(p?: Props) {
	const count = useRef(0)
	const [val, _setVal] = useState(() => {
		const storedCount = localStorage.getItem("count")
		return storedCount ? parseInt(storedCount, 10) : 0
	})

	useEffect(() => {
		localStorage.setItem("count", count.current.toString())
	}, [count.current])

	const setVal = (fn: (v: number) => number) => {
		count.current = fn(count.current)
		_setVal(count.current)
	}

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
			{...p?.props}
			className="flex flex-col flex-grow flex-shrink gap-2 border-2 border-red-500 p-4 bg-gray-500 rounded-lg">
			<div className="text-lg text-center">HookedThingReferenced:</div>
			<div>frame count: </div>
			<div>{val}</div>
			<button
				onClick={() => setVal((v) => 0)}
				className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded">
				reset
			</button>
			{p?.children}
		</div>
	)
}
