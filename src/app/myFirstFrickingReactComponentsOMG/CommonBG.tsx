import { OrbitControls, PerspectiveCamera } from "@react-three/drei"
import { Suspense } from "react"

export const CommonBG = () => {
	return (
		<Suspense fallback={<div>Loading...</div>}>
			<color attach="background" args={["lightpink"]} />
			<ambientLight />
			<pointLight position={[20, 30, 10]} intensity={3} decay={0.2} />
			<pointLight position={[-10, -10, -10]} color="blue" decay={0.2} />
			<PerspectiveCamera makeDefault fov={40} position={[0, 0, 6]} />
			<OrbitControls />
		</Suspense>
	)
}
