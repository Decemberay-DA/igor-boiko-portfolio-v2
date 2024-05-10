"use client"

import { forwardRef, Suspense, useImperativeHandle, useRef } from "react"
import { OrbitControls, PerspectiveCamera, View as ViewImpl } from "@react-three/drei"
import { Three } from "@/helpers/components/Three"
import * as THREE from "three"

/**
 * Common component to apply to all canvases
 */
export const Common = ({ color }: { color?: THREE.ColorRepresentation }, fallback: React.ReactNode = null) => (
	<Suspense fallback={fallback}>
		{color && <color attach='background' args={[color]} />}
		<ambientLight />
		<pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
		<pointLight position={[-10, -10, -10]} color='blue' decay={0.2} />
		<PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
	</Suspense>
)

type ViewProps = {
	children: React.ReactNode
	orbit?: boolean
	[key: string]: any
}

const View = forwardRef(({ children, orbit, ...props }: ViewProps, ref) => {
	const localRef = useRef<HTMLDivElement>(null)
	useImperativeHandle(ref, () => localRef.current)

	return (
		<>
			<div ref={localRef} {...props} />
			<Three>
				<ViewImpl track={localRef as React.MutableRefObject<HTMLDivElement>}>
					{children}
					{orbit && <OrbitControls />}
				</ViewImpl>
			</Three>
		</>
	)
})
View.displayName = "View"

export { View }
