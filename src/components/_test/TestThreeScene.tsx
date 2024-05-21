"use client"

import React from "react"
import View from "../canvas/View"
import { dynamicBlob, dynamicCommon } from "../dinamicImports/3dModels"

import dynamic from "next/dynamic"
const TestBox = dynamic(() => import("@/components/_test/Box"), { ssr: false })
const Common = dynamicCommon()
const Blob = dynamicBlob()

/**
 * default solution to creating a canvas for threejs
 * this simple one is just works
 */
export default function TestThreeSceneCanvas({ ...props }) {
	const r = Math.random() > 0.5
	return r ? (
		<View className="relative w-full h-full" {...props}>
			<TestBox position={[-1.2, 0, 0]} />
			<TestBox position={[1.2, 0, 0]} />
			<TestBox position={[0, 0, 0]} />
			<Common color={"#000000"} />
		</View>
	) : (
		<View className="relative w-full h-full" {...props}>
			<Blob position={[-1.2, 0, 0]} />
			<Blob position={[1.2, 0, 0]} />
			<Blob position={[0, 0, 0]} />
			<Common color={"#ffffff"} />
		</View>
	)
}
