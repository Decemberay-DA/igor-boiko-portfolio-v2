"use client"

import { useRef } from "react"
import { dinScene } from "../dinamicImports/htmlElements"

const Scene = dinScene()

/**
 * base of fast threejs canvas
 * @depricated
 */
export const Layout = ({ children }: { children?: React.ReactNode }) => {
	const ref = useRef<HTMLDivElement>(null)

	return (
		<div
			// for some reason tailwind dont working here
			style={{
				position   : "relative",
				width      : " 100%",
				height     : "100%",
				overflow   : "auto",
				touchAction: "auto",
			}}
			// className="relative w-[100%] h-[100%] overflow-auto touch-action-auto"
			ref={ref}>
			{children}
			<Scene
				style={{
					position     : "fixed",
					top          : 0,
					left         : 0,
					width        : "100vw",
					height       : "100vh",
					pointerEvents: "none",
				}}
				// className="fixed top-0 left-0 w-[100vw] h-[100vh] pointer-events-none"
				eventSource={ref}
				eventPrefix="client"
			/>
		</div>
	)
}
