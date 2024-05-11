"use client"

import { THREE } from "~/exp"
import { Suspense } from "react"
import { PerspectiveCamera } from "@react-three/drei"

/**
 * Common component to apply to all canvases
 */
export default function Common(
	{ color }: { color?: THREE.ColorRepresentation },
	fallback: React.ReactNode = null,
	{ ...rest },
) {
	return (
		<Suspense fallback={fallback} {...rest}>
			{color && <color attach="background" args={[color]} />}
			<ambientLight />
			<pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
			<pointLight position={[-10, -10, -10]} color="blue" decay={0.2} />
			<PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
		</Suspense>
	)
}
