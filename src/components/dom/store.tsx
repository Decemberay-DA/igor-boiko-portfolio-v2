import { createRef } from "react"

const state = {
	sections: 3,
	pages: 3,
	zoom: 75,
	top: createRef<number>(),
}

export default state
