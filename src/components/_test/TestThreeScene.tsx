"use client"
import React from "react"
import { Canvas } from "@react-three/fiber"
import dynamic from "next/dynamic"
// import Common from "../canvas/Common"
import View from "../canvas/View"

const TestBox = dynamic(() => import("@/components/_test/Box"), { ssr: false })
const Common = dynamic(() => import("~/components/canvas/Common"), { ssr: false })

/**
 * default solution to creating a canvas for threejs
 * this simple one is just works
 */
export default function TestThreeSceneCanvas() {
	// works
	// return (
	// 	<Canvas>
	// 		<TestBox position={[-1.2, 0, 0]} />
	// 		<TestBox position={[1.2, 0, 0]} />
	// 		<TestBox position={[0, 0, 0]} />
	// 		<Common color={"#1fb2f5"} />
	// 	</Canvas>
	// )
	// invisin=ble
	return (
		// <View className="w-full h-full">
		<View className="w-full h-full">
			<TestBox position={[-1.2, 0, 0]} />
			<TestBox position={[1.2, 0, 0]} />
			<TestBox position={[0, 0, 0]} />
			<Common color={"#1fb2f5"} />
		</View>
	)
}
