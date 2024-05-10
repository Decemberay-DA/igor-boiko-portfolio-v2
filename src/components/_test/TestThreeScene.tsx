"use client"
import React from "react"
import { Canvas } from "@react-three/fiber"
import { THREE } from "~/exp"
import dynamic from "next/dynamic"

const TestBox = dynamic(() => import("@/components/_test/Box"), { ssr: false })

/**
 * default solution to creating a canvas for threejs
 */
export default function TestThreeSceneCanvas() {
	return (
		<Canvas className="w-full h-full">
			<ambientLight intensity={Math.PI / 2} />
			<spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
			<pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
			<TestBox position={[-1.2, 0, 0]} />
			<TestBox position={[1.2, 0, 0]} />
		</Canvas>
	)
}
