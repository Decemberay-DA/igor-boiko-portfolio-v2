"use client"

import React from "react"
// import Common from "../canvas/Common"
import View from "../canvas/View"
import { dynBlob, dynCommon } from "../dinamicImports/3dModels"

import dynamic from "next/dynamic"
const TestBox = dynamic(() => import("@/components/_test/Box"), { ssr: false })
const Common = dynCommon()
const Blob = dynBlob()

/**
 * default solution to creating a canvas for threejs
 * this simple one is just works
 */
export default function TestThreeSceneCanvas() {
	const r = Math.random() > 0.5
	return r ? (
		<View className="relative w-full h-32 ">
			<TestBox position={[-1.2, 0, 0]} />
			<TestBox position={[1.2, 0, 0]} />
			<TestBox position={[0, 0, 0]} />
			<Common color={"#000000"} />
		</View>
	) : (
		<View className="relative w-full h-32 ">
			<Blob position={[-1.2, 0, 0]} />
			<Blob position={[1.2, 0, 0]} />
			<Blob position={[0, 0, 0]} />
			<Common color={"#ffffff"} />
		</View>
	)
}
