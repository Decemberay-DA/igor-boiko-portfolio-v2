"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import { OrbitControls, View as ViewImpl } from "@react-three/drei"
import { Three } from "~/helpers/components/Three"

type ViewProps = {
	children: React.ReactNode
	orbit?: boolean
} & React.ComponentProps<"div">

const View = forwardRef(({ children, orbit, ...rest }: ViewProps, ref) => {
	const localRef = useRef<HTMLDivElement>(null!)
	useImperativeHandle(ref, () => localRef.current)

	return (
		<>
			<div ref={localRef} {...rest} />
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
