"use client"

import { forwardRef, useImperativeHandle, useRef } from "react"
import { OrbitControls, View as ViewImpl } from "@react-three/drei"
import { cThreePresistentTunnel as CThreePresistentTunnel } from "./cThreePresistentTunnel"

type ViewProps = {
	children?: React.ReactNode
	isOrbitControlsEnabeled?: boolean
} & React.ComponentProps<"div">

/**
 * some optimization i dont know actually
 */
const _cThreePresistentView = forwardRef(
	({ children, isOrbitControlsEnabeled: isOrbitControlsEnabeled, ...rest }: ViewProps, ref) => {
		const localRef = useRef<HTMLDivElement>(null!)
		useImperativeHandle(ref, () => localRef.current)

		return (
			<>
				<div ref={localRef} {...rest} />
				<CThreePresistentTunnel>
					<ViewImpl track={localRef}>
						{children}
						{isOrbitControlsEnabeled && <OrbitControls />}
					</ViewImpl>
				</CThreePresistentTunnel>
			</>
		)
	},
)
_cThreePresistentView.displayName = "ThreePresistentView"

export const cThreePresistentView = _cThreePresistentView
