"use client"
import React, { useMemo, useRef } from "react"
import { Asteroid, asteroidWorld, startSystemUpdateLoop } from "./asteroidESCGame"
import { THREE } from "~/exp"
import View from "~/components/canvas/View"
import { useFrame } from "@react-three/fiber"
import { dynamicCommon } from "~/components/dinamicImports/3dModels"
import { getRandomColor } from "~/helpers/Extensions/THREEEX"
import createReactAPI from "miniplex-react"

/**
 *
 */
const Common = dynamicCommon()
export const AsteroidsECS = createReactAPI(asteroidWorld)
/**
 *
 */

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
			<boxGeometry args={[0.1, 0.1, 0.1]} />
			<meshStandardMaterial color={getRandomColor()} />
		</mesh>
	)
}

export const AsteroidView = () => {
	// const asteroidEntities = asteroidWorld.entities
	const asteroidComponents = useMemo(() => {
		return asteroidWorld.entities.map((a) => <AsteriodModel key={asteroidWorld.id(a)} data={a} />)
	}, [asteroidWorld.entities])

	return (
		<>
			<View orbit className="relative h-[400px] w-full">
				{asteroidComponents}
				<Common color={"#156545"} />
			</View>
			<KillRanbomEntityButton className="w-full bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" />
		</>
	)
}
