"use client"

import { ComponentProps, forwardRef, useImperativeHandle, useRef } from "react"
import { OrbitControls, View as ViewImpl } from "@react-three/drei"
import { Three } from "@/helpers/components/Three"
import { THREE } from "~/exp"

type ViewProps = {
	children: React.ReactNode
	orbit?: boolean
	props: ComponentProps<typeof ViewImpl>
}
// type ViewProps = {
// 	children: React.ReactNode
// 	orbit?: boolean
// 	props: {
// 		props: [key: string]
// 	}
// }

const View = forwardRef(
	({ children, orbit, ...props }: ViewProps, ref: React.ForwardedRef<HTMLDivElement>) => {
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
	},
)
// const View = forwardRef((props: ViewProps, ref) => {
// 	const localRef = useRef<HTMLDivElement>(null)
// 	useImperativeHandle(ref, () => localRef.current)

// 	return (
// 		<>
// 			<div ref={localRef} {...props.props} />
// 			<Three>
// 				<ViewImpl track={localRef as React.MutableRefObject<HTMLDivElement>}>
// 					{props.children}
// 					{props.orbit && <OrbitControls />}
// 				</ViewImpl>
// 			</Three>
// 		</>
// 	)
// })
View.displayName = "View"

export default View
