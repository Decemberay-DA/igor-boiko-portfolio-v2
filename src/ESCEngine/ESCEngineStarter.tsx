"use client"

import React, { useMemo, useRef } from "react"
import { asteroidWorld, startSystemUpdateLoop } from "./asteroidESCGame"
import { THREE } from "~/exp"
import { cThreePresistentView as CThreePresistentView } from "~/components/ThreePresistense/cThreePresistentView"
import { useFrame } from "@react-three/fiber"
import { dynamicCommon } from "~/components/dinamicImports/3dModels"
import createReactAPI from "miniplex-react"
import { ESCEntity } from "./ESCEntity"
import { THREEEX } from "~/helpers/THREEEX"

/**
 *
 */
const Common = dynamicCommon()
export const AsteroidsECS = createReactAPI(asteroidWorld)
/**
 *
 */

export const cESCEngineStarter = () => {
	"use client"
	console.log("created jsx element for starting esc engine")
	startSystemUpdateLoop()
	return null
}

export const KillRanbomEntityButton = ({ ...rest }: React.ComponentProps<"button">) => {
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
	data: ESCEntity
} & React.ComponentProps<"mesh">
export const AsteriodModel = ({ data, ...rest }: AsteroidProps) => {
	const meshRef = useRef<THREE.Mesh>(null)

	useFrame((state, frame) => {
		if (!meshRef.current) return
		meshRef.current.position.copy(data.SpatialTransforms!.position)
	})

	return (
		<mesh
			ref={meshRef}
			position={data.SpatialTransforms!.position}
			rotation={data.SpatialTransforms!.rotation}
			scale={data.SpatialTransforms!.scale}
			{...rest}>
			<boxGeometry args={[0.1, 0.1, 0.1]} />
			<meshStandardMaterial color={THREEEX.newRandomColor()} />
		</mesh>
	)
}

export const cAsteroidView = () => {
	"use client"
	// const asteroidEntities = asteroidWorld.entities
	const asteroidComponents = useMemo(() => {
		return asteroidWorld.entities.map((a) => <AsteriodModel key={asteroidWorld.id(a)} data={a} />)
	}, [asteroidWorld.entities])

	return (
		<>
			<CThreePresistentView isOrbitControlsEnabeled className="relative h-[400px] w-full">
				{asteroidComponents}
				<Common color={"#156545"} />
			</CThreePresistentView>
			<KillRanbomEntityButton className="w-full bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" />
		</>
	)
}
