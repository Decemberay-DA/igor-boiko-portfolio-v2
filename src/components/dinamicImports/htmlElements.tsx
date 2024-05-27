"use client"

import dynamic from "next/dynamic"

export const dinScene = () =>
	dynamic(
		() =>
			import("~/components/ThreePresistense/cThreePresistentView").then(
				(mod) => mod.cThreePresistentView,
			),
		{ ssr: false },
	)
