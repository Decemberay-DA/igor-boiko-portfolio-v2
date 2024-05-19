import { THREE } from "~/exp"
import { pipe } from "fp-ts/lib/function"
import { World } from "miniplex"
import createReactAPI from "miniplex-react"

// base
// /**
//  * entity that represent some scene
//  */
// type CScenePresentation = {
// 	identificator: string
// }
// // scenes that can be represented
// type CHTMLScenePresence = {
// 	htmlElement: HTMLElement
// }
// type CThreeScenePresence = {
// 	threeObject: THREE.Object3D
// }

const component_htmlScene = "htmlScene"
const component_threeScene = "threeScene"
type CScenedObject = {
	identificator: string
    // is it the only way to do components in miniplex?
	htmlScene?: {
		scene: HTMLElement
	}
	threeScene?: {
		scene: THREE.Object3D
	}
}

const _world = new World<CScenedObject>()

const obj = _world.add({
	identificator: "obj",
})
_world.addComponent(obj, component_htmlScene, { scene: document.createElement("div") })

const htnledEntities = _world.with(component_htmlScene)




