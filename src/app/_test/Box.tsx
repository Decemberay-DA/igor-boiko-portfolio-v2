"use client"
import React, { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { FIBER, THREE } from "~/exp"

// const Box = (props: BoxProps) => {
// 	// This reference gives us direct access to the THREE.Mesh object
// 	const ref = useRef<THREE.Mesh>(null)
// 	// const ref = useRef<THREE.Mesh | null>(null)
// 	// Hold state for hovered and clicked events
// 	const [hovered, hover] = useState(false)
// 	const [clicked, click] = useState(false)
// 	// Subscribe this component to the render-loop, rotate the mesh every frame
// 	// Return the view, these are regular Threejs elements expressed in JSX
// 	useFrame((state, delta) => (ref.current!.rotation.x += delta))
// 	return (
// 		<mesh
// 			{...props.props}
// 			ref={ref}
// 			position={props.position}
// 			scale={clicked ? 1.5 : 1}
// 			onClick={(event) => click(!clicked)}
// 			onPointerOver={(event) => hover(true)}
// 			onPointerOut={(event) => hover(false)}>
// 			<boxGeometry args={[1, 1, 1]} />
// 			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
// 		</mesh>
// 	)
// }
export const TestBox = (props: FIBER.ThreeElements["mesh"]) => {
	const ref = useRef<THREE.Mesh>(null!)
	const [hovered, hover] = useState(false)
	const [clicked, click] = useState(false)
	useFrame((state, delta) => (ref.current.rotation.x += delta))
	return (
		<mesh
			{...props}
			ref={ref}
			scale={clicked ? 1.5 : 1}
			onClick={(event) => click(!clicked)}
			onPointerOver={(event) => hover(true)}
			onPointerOut={(event) => hover(false)}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	)
}
