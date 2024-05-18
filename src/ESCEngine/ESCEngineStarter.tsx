"use client"
import React, { useRef } from "react"
import { Asteroid, asteroidWorld, startSystemUpdateLoop } from "./asteroidState"
import { THREE } from "~/exp"
import View from "~/components/canvas/View"
import { useFrame } from "@react-three/fiber"
import { dynamicCommon } from "~/components/dinamicImports/3dModels"
import { getRandomColor } from "~/helpers/Extensions/THREEEX"

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
	return (
		<button onClick={killRanbomEntity} {...rest}>
			kill random entity
		</button>
	)
}

type AsteroidProps = {
	data: Asteroid
} & React.ComponentProps<"mesh">
export const AsteriodModel = ({ data, ...rest }: AsteroidProps) => {
	const meshRef = useRef<THREE.Mesh>(null)

	useFrame((state, frame) => {
		if (!meshRef.current) return
		meshRef.current.position.copy(data.position)
	})

	return (
		<mesh ref={meshRef} position={data.position} rotation={data.rotation} {...rest}>
			<sphereGeometry args={[0.5, 32, 32]} />
			<meshStandardMaterial color={getRandomColor()} />
		</mesh>
	)
}

export const AsteroidView = () => {
	// const allAsteroids = asteroidWorld.entities.map((a) => AsteriodModel({ data: a }))
	return (
		<>
			<View orbit className="relative h-[400px] w-full">
				{/* {asteroidWorld.entities.map((a) => AsteriodModel({ data: a }))} */}
				<AsteriodModel data={asteroidWorld.entities[0]!} />
				<AsteriodModel data={asteroidWorld.entities[1]!} />
				<AsteriodModel data={asteroidWorld.entities[2]!} />
				<Common color={"#156545"} />
			</View>
			<KillRanbomEntityButton className="w-full bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" />
		</>
	)
}
