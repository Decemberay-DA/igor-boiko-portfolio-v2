"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import { OrbitControls, View as ViewImpl } from "@react-three/drei"
import { Three } from "~/helpers/components/Three"

type ViewProps = {
	children: React.ReactNode
	orbit?: boolean
	[key: string]: any
}

const View = forwardRef(({ children, orbit, ...props }: ViewProps, ref) => {
	const localRef = useRef<HTMLDivElement>(null!)
	useImperativeHandle(ref, () => localRef.current)

	return (
		<>
			<div ref={localRef} {...props} />
			<Three>
				<ViewImpl track={localRef}>
					{children}
					{orbit && <OrbitControls />}
				</ViewImpl>
			</Three>
		</>
	)
})
View.displayName = "View"

export default View
