"use client"

import dynamic from "next/dynamic"
import { useRef } from "react"

const Scene = dynamic(() => import("@/components/canvas/Scene"), { ssr: false })

export const Layout = ({ children }: { children: React.ReactNode }) => {
	const ref = useRef<HTMLDivElement>(null!)

	return (
		<div
			ref={ref}
			// tailwind not worked in starter project
			// className='relative w-[100%] h-[100%] overflow-auto touch-action-auto'
			style={{
				position: "relative",
				width: " 100%",
				height: "100%",
				overflow: "auto",
				touchAction: "auto",
			}}>
			{children}
			<Scene
				// className='absolute top-0 left-0 w-[100vw] h-[100vh] pointer-events-none'
				style={{
					position: "fixed",
					top: 0,
					left: 0,
					width: "100vw",
					height: "100vh",
					pointerEvents: "none",
				}}
				eventSource={ref}
				eventPrefix="client"
			/>
		</div>
	)
}
