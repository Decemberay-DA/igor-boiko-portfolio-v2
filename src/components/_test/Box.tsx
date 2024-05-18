"use client"

import React, { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { THREE } from "~/exp"

export default function TestBox({ ...props }: React.ComponentProps<"mesh">) {
	const ref = useRef<THREE.Mesh>(null!)
	const [hovered, setHovered] = useState(false)
	const [clicked, setClicked] = useState(false)
	
	useFrame((state, delta) => (ref.current.rotation.x += delta))

	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={(event) => setClicked(!clicked)}
			onPointerOver={(event) => setHovered(true)}
			onPointerOut={(event) => setHovered(false)}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	)
}
