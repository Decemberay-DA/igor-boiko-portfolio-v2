"use client"

import { THREE } from "~/exp"
import { Suspense } from "react"
import { PerspectiveCamera } from "@react-three/drei"

export default function CommonMerged({ color, ...rest }: { color?: THREE.ColorRepresentation }) {
	return (
		<Suspense fallback={null} {...rest}>
			{color && <color attach="background" args={[color]} />}
			<ambientLight intensity={Math.PI / 2} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
			<PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
		</Suspense>
	)
}
