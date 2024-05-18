import React from "react"
import { THREE } from "~/exp"

let scrollState = {
	realScroll: 0,
	smoothedScroll: 0,
}

export const useScrollState = () => {
	return scrollState
}

const GetSmoothedScroll = (nextScroll: number, smoothing: number) => {
	return THREE.MathUtils.lerp(scrollState.smoothedScroll, nextScroll, smoothing * 0.1)
}

// // every frame update to get smooth smoothed scroll
// requestAnimationFrame(() => {
//     // scrolledState.smoothedScroll = GetSmoothedScroll(scrolledState.realScroll, 0.1) 
// }


/**
 * captures scroll and puts its value to the scroll state
 */
export default function ScrollArea({ ...props }: React.ComponentProps<"div">) {
	const [state, setState] = React.useState({
		pages: 0,
	})

	const scrollArea = React.useRef<HTMLDivElement>(null)

	const onScroll = React.useCallback(() => {
		const scrollTop = scrollArea.current?.scrollTop ?? 0
		const pages = Math.ceil(scrollTop / 100)
		setState({ pages })
	}, [scrollArea])

	return <div className="scrollArea" ref={scrollArea} onScroll={onScroll}></div>
}
