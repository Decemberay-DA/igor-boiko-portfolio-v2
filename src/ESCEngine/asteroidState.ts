import { World } from "miniplex"
import createReactAPI from "miniplex-react"
import { THREE } from "~/exp"

/* Our entity type */
export type Asteroid = {
	position: THREE.Vector3
	velocity: THREE.Vector3
	rotation: THREE.Quaternion
}

/* Create a Miniplex world that holds our entities */
const world = new World<Asteroid>()

/* Create and export React bindings */
export const AsteroidsECS = createReactAPI(world)

const createSwarm = (ammouns: number = 123) => {
	for (let i = 0; i < ammouns; i++) {
		const Asteroid = world.add({
			position: new THREE.Vector3(Math.random() * 100, Math.random() * 100, Math.random() * 100),
			velocity: new THREE.Vector3(0, 0, 0),
			rotation: new THREE.Quaternion(),
		})
	}
}
createSwarm(50)

/* Create functions that perform actions on entities: */
const gravity = ({ position }: Asteroid, gravityVector: THREE.Vector3) => {
	position.add(gravityVector)
}
const randomRotation = ({ rotation }: Asteroid) => {
	rotation.setFromAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI * 2)
}

/* Create a bunch of systems: */
const lolGravitySystem = () => {
	for (const e of world.entities) {
		const gravityVector = new THREE.Vector3(0, Math.sin(performance.now() * 0.5) * 9, 0)
		gravity(e, gravityVector)
	}
}
const randomRotationSystem = () => {
	for (const e of world.entities) {
		randomRotation(e)
	}
}

/* test deleting random entity on SPACE key press */
world.onEntityAdded.subscribe((e) => {
	console.log(`world of asteroids, added new entity:`, e)
})
world.onEntityRemoved.subscribe((e) => {
	console.log("world of asteroids, removed entity:", e)
})

document.addEventListener("keydown", (e) => {
	if (e.key === "Space") {
		const randomEntity = world.entities[Math.floor(Math.random() * world.entities.length)]!
		world.remove(randomEntity)
	}
})
