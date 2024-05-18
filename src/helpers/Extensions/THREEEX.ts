import { public_colorKeywords } from "three"
import { THREE } from "~/exp"

/**
 *
 */
export const getRandomColor = () => {
	return new THREE.Color(Math.random(), Math.random(), Math.random())
}
