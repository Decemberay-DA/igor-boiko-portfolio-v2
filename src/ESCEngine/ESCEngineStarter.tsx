"use client"

import React, { useMemo, useRef } from "react"
import { asteroidWorld, startSystemUpdateLoop } from "./asteroidESCGame"
import { THREE } from "~/exp"
import { cThreePresistentView as CThreePresistentView } from "~/components/ThreePresistense/cThreePresistentView"
import { useFrame } from "@react-three/fiber"
import createReactAPI from "miniplex-react"
import { ESCEntity } from "./ESCEntity"
import { THREEEX } from "~/helpers/THREEEX"
import { cCommon as CCommon } from "~/components/ThreePresistense/cCommon"

/**
 *
 */
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
	// const asteroidEntities = asteroidWorld.entities
	const asteroidComponents = useMemo(() => {
		return asteroidWorld.entities.map((a) => <AsteriodModel key={asteroidWorld.id(a)} data={a} />)
	}, [asteroidWorld.entities])

	return (
		<CThreePresistentView isOrbitControlsEnabeled className="relative h-[400px] w-full">
			{asteroidComponents}
			<CCommon color={"#156545"} />
		</CThreePresistentView>
	)
}
