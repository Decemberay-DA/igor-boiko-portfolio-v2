"use client"
import { asteroidWorld, startSystemUpdateLoop } from "./asteroidState"

export default function ESCEngineStarter() {
	console.log("created jsx element for starting esc engine")

	/* test deleting random entity on SPACE key press */
	asteroidWorld.onEntityAdded.subscribe((e) => {
		console.log(`world of asteroids, added new entity:`, e)
	})
	asteroidWorld.onEntityRemoved.subscribe((e) => {
		console.log(`world of asteroids, removed an entity:`, e)
	})
	document.addEventListener("keydown", (e) => {
		if (e.key === "Space") {
			const randomEntity =
				asteroidWorld.entities[Math.floor(Math.random() * asteroidWorld.entities.length)]!
			asteroidWorld.remove(randomEntity)
		}
	})

	startSystemUpdateLoop()

	return null
}
