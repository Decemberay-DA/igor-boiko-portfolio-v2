import dynamic from "next/dynamic"

export const dinamicSpaceThreeScene = () =>
	dynamic(() => import("./SpaceThreeScene"), {
		ssr: false,
	})
