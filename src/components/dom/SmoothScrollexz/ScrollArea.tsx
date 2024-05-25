import React from "react"

let scrollState = {
	realScroll    : 0,
	smoothedScroll: 0,
}

export const useScrollState = () => {
	return scrollState
}

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
