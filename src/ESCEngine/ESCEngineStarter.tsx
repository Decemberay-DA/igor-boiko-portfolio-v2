"use client"
import React, { useRef } from "react"
import { Asteroid, asteroidWorld, startSystemUpdateLoop } from "./asteroidState"
import { THREE } from "~/exp"
import View from "~/components/canvas/View"
import { useFrame } from "@react-three/fiber"
import { dynamicCommon } from "~/components/dinamicImports/3dModels"

const Common = dynamicCommon()

export default function ESCEngineStarter() {
	console.log("created jsx element for starting esc engine")

	startSystemUpdateLoop()

	return null
}

export const KillRanbomEntityButton = ({ ...rest }: React.ComponentProps<"button">) => {
	/* test deleting random entity on SPACE key press */
	asteroidWorld.onEntityAdded.subscribe((e) => {
		console.log(`world of asteroids, added new entity:`, e)
	})
	asteroidWorld.onEntityRemoved.subscribe((e) => {
		console.log(`world of asteroids, removed an entity:`, e)
	})
	const killRanbomEntity = () => {
		const randomEntity =
			asteroidWorld.entities[Math.floor(Math.random() * asteroidWorld.entities.length)]!
		asteroidWorld.remove(randomEntity)
	}
	return <button onClick={killRanbomEntity} {...rest}></button>
}

type AsteroidProps = {
	data: Asteroid
} & React.ComponentProps<"mesh">

export const AsteriodModel = ({ data, ...rest }: AsteroidProps) => {
	return (
		<mesh>
			{/* <primitive object={sphere.current}> */}
			<sphereGeometry args={[0.5, 32, 32]} />
			<meshStandardMaterial color="hotpink" />
			{/* </primitive> */}
		</mesh>
	)
}

export const AsteroidView = () => {
	const allAsteroids = asteroidWorld.entities.map((a) => AsteriodModel({ data: a }))
	return (
		<>
			<View className="relative h-36 w-full">
				{allAsteroids}
				<Common color={"#000000"} />
			</View>
			<KillRanbomEntityButton />
		</>
	)
}
