import { pipe } from "fp-ts/lib/function"
import { World } from "miniplex"
import { THREE } from "~/exp"
import { ESCEntity } from "./ESCEntity"

/* Create a Miniplex world that holds our entities */
export const asteroidWorld = new World<ESCEntity>()

const newVal = () => Math.random() - 0.5
const newVec = (range: number) =>
	new THREE.Vector3(newVal() * range, newVal() * range, newVal() * range)
const createSwarm = (ammouns: number = 123) => {
	for (let i = 0; i < ammouns; i++) {
		const entity = asteroidWorld.add({})
		asteroidWorld.addComponent(entity, "SpatialTransforms", {
			position: newVec(5),
			rotation: new THREE.Euler(),
			scale: new THREE.Vector3(1, 1, 1),
		})
		asteroidWorld.addComponent(entity, "Velocityable", {
			velocity: newVec(0.04),
		})
	}
}
createSwarm(123)

// smth

const velocitySmoothCap = (max: number) => (v: THREE.Vector3) => {
	const targetVelocity = v.clone()
	const currentSpeed = v.length()

	if (currentSpeed > max) {
		const speedDifference = currentSpeed - max
		const capFactor = speedDifference / currentSpeed

		targetVelocity.multiplyScalar(1 - capFactor)
		targetVelocity.add(v.multiplyScalar(capFactor))
	}

	return targetVelocity
}

// SYSTEMS
const velocityApplySystem = (entities: World<ESCEntity>) => {
	for (const entity of entities.with("SpatialTransforms", "Velocityable")) {
		entity.SpatialTransforms.position.add(entity.Velocityable.velocity)
	}
	return entities
}
const velocityFadeSystem = (entities: World<ESCEntity>) => {
	var velocityFading = 0.99
	for (const entity of entities.with("Velocityable")) {
		entity.Velocityable.velocity.multiplyScalar(velocityFading)
	}
	return entities
}
const distanceClampSystem = (entities: World<ESCEntity>) => {
	var centerPoint = new THREE.Vector3(0, 0, 0)
	var radius = 6
	for (const entity of entities.with("SpatialTransforms", "Velocityable")) {
		const distance = centerPoint.distanceTo(entity.SpatialTransforms.position)
		if (distance > radius) {
			entity.Velocityable.velocity.set(0, 0, 0)
		}
	}
	return entities
}
const pointGravitySystem = (entities: World<ESCEntity>) => {
	var gravitationPoint = new THREE.Vector3(0, 0, 0)
	var minGravityMagnitude = 0.0001
	var maxGravityMagnitude = 0.009
	for (const entity of entities.with("SpatialTransforms", "Velocityable")) {
		const direction = gravitationPoint.clone().sub(entity.SpatialTransforms.position).normalize()

		const distance = gravitationPoint.distanceTo(entity.SpatialTransforms.position)
		const gravityMagnitude = 0.005 / distance

		const gravityMagnitude2 = Math.max(
			minGravityMagnitude,
			Math.min(maxGravityMagnitude, gravityMagnitude),
		)

		entity.Velocityable.velocity.add(direction.multiplyScalar(gravityMagnitude2))
	}
	return entities
}
const keepDistanceFromEachOtherSystem = (entities: World<ESCEntity>) => {
	var minDistance = 0.1
	var quered = entities.with("SpatialTransforms", "Velocityable")
	for (const entity of quered) {
		for (const naighbour of quered) {
			if (entity === naighbour) continue

			const directionAB = naighbour.SpatialTransforms.position
				.clone()
				.sub(entity.SpatialTransforms.position)

			directionAB.normalize()

			const currentDistance = entity.SpatialTransforms.position.distanceTo(
				naighbour.SpatialTransforms.position,
			)

			if (currentDistance < minDistance) {
				const adjustmentAmount = (minDistance - currentDistance) / 2
				const adjustmentVector = directionAB.multiplyScalar(adjustmentAmount)

				entity.Velocityable.velocity.add(adjustmentVector)
				naighbour.Velocityable.velocity.sub(adjustmentVector)
			}
		}
	}
	return entities
}

// every frame systems update loop
let frameCount = 0
const systemUpdateLoop = () => {
	pipe(
		asteroidWorld,
		// physycks
		pointGravitySystem,
		keepDistanceFromEachOtherSystem,
		distanceClampSystem,
		// velocity
		velocityApplySystem,
		velocityFadeSystem,
	)

	frameCount++
	if (frameCount % 100 === 0) {
		console.log(`esc frame count: ${frameCount} | entities: ${asteroidWorld.entities.length}`)
	}

	requestAnimationFrame(systemUpdateLoop)
}

let isSystemUpdateLoopRunning = false
export const startSystemUpdateLoop = () => {
	if (isSystemUpdateLoopRunning) return
	console.log("start system update loop for esc engine")
	systemUpdateLoop()
	isSystemUpdateLoopRunning = true
}
