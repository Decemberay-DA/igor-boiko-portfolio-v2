// so hard so only tendered on client hahah
"use client"

import { useMemo } from "react"
import { dynamicCommon, dynamicView } from "~/components/dinamicImports/3dModels"
import { asteroidWorld } from "~/ESCEngine/asteroidESCGame"
import { dynamicAsteroidView } from "~/ESCEngine/dynamic"
import { AsteriodModel } from "~/ESCEngine/ESCEngineStarter"
import { OrbitControls, View } from "@react-three/drei"
const AsteroidView = dynamicAsteroidView()
const Common = dynamicCommon()
// const View = dynamicView()

type SpaceThreeSceneProps = {
	children?: React.ReactNode
} & React.ComponentProps<"div">

/**
 * the planet nad the asteroids on bg canves
 */
export default function SpaceThreeScene({ children, ...rest }: SpaceThreeSceneProps) {
	// return (
	// 	<View className="relative">
	// 		{/* <Blob /> */}
	// 		<Common />
	// 	</View>
	// )
	// const asteroidEntities = asteroidWorld.entities

	// const asteroidComponents = useMemo(() => {
	// 	return asteroidWorld.entities.map((a) => <AsteriodModel key={asteroidWorld.id(a)} data={a} />)
	// }, [asteroidWorld.entities])

	// return (
	// 	<View orbit className="relative h-full w-full" {...rest}>
	// 		{asteroidComponents}
	// 		{children}
	// 		<Common color={"#156545"} />
	// 	</View>
	// )

	return (
		<View>
			{children}
			<OrbitControls />
		</View>
	)
}
