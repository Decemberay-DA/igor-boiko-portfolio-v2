import dynamic from "next/dynamic"

export const dynamicESCEngineStarter = () =>
	dynamic(() => import("./ESCEngineStarter"), {
		ssr: false,
	})
export const dynamicAsteroidView = () =>
	dynamic(() => import("./ESCEngineStarter").then((mod) => mod.AsteroidView), {
		ssr: false,
	})
