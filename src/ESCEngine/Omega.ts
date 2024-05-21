import { THREE } from "~/exp"

export type SphereCollider = {
	radius: () => number
	bouncing: () => number
}
export type Gravitation = {
	gravityForce: () => number
	gravityDistance: () => number
}
export type SpatialMass = {
	mass: () => number
}
export type Velocityable = {
	velocity: THREE.Vector3
}
export class VelocityableH {
	public static setToZero(self: Velocityable) {
		self.velocity.set(0, 0, 0)
		return self
	}
}
export type SpatialTransforms = {
	position: THREE.Vector3
	rotation: THREE.Euler
	scale: THREE.Vector3
}
export type SceneIdentificator = {
	readonly sceneNameID: string
}
export type THREESceneRepresentation = {
	readonly scene: THREE.Object3D
}
export type HTMLSceneRepresentation = {
	readonly scene: HTMLElement
}
export type HTMLScrollTransforming = {
	effectStart: () => number
	effectEnd: () => number
	effectExecuting: (interpolation: number) => void
}

/**
 * all possible components can be added to this object.
 * the ok solution for miniplex.
 *      - i have thoughtcrimed about rust & bevy
 */
export type Omega = {
	SphereCollider?: SphereCollider
	Gravitation?: Gravitation
	SpatialMass?: SpatialMass
	Velocityable?: Velocityable
	SpatialTransforms?: SpatialTransforms
	SceneIdentificator?: SceneIdentificator
	THREESceneRepresentation?: THREESceneRepresentation
	HTMLSceneRepresentation?: HTMLSceneRepresentation
	HTMLScrollTransforming?: HTMLScrollTransforming
}
