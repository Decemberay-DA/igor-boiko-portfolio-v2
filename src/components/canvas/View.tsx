"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import { OrbitControls, View as ViewImpl } from "@react-three/drei"
import { Three } from "@/helpers/components/Three"

type ViewProps = {
	children: React.ReactNode
	orbit?: boolean
	[key: string]: any
}

// const View = forwardRef(({ children, orbit, ...props }: ViewProps, ref) => {
// 	const localRef = useRef<HTMLDivElement>(null)
// 	useImperativeHandle(ref, () => localRef.current)

// 	return (
// 		<>
// 			<div ref={localRef} {...props} />
// 			<Three>
// 				<ViewImpl track={localRef as React.MutableRefObject<HTMLDivElement>}>
// 					{children}
// 					{orbit && <OrbitControls />}
// 				</ViewImpl>
// 			</Three>
// 		</>
// 	)
// })
const View = forwardRef((props: ViewProps, ref) => {
	const localRef = useRef<HTMLDivElement>(null)
	useImperativeHandle(ref, () => localRef.current)

	return (
		<>
			<div ref={localRef} {...props.props} />
			<Three>
				<ViewImpl track={localRef as React.MutableRefObject<HTMLDivElement>}>
					{props.children}
					{props.orbit && <OrbitControls />}
				</ViewImpl>
			</Three>
		</>
	)
})
View.displayName = "View"

export default View
