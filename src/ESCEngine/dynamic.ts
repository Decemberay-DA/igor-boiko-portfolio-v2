import dynamic from "next/dynamic"

export const dynamicESCEngineStarter = () =>
	dynamic(() => import("./ESCEngineStarter"), {
		ssr: false,
	})
