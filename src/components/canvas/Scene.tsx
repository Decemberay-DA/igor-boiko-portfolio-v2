"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { r3f } from "@/helpers/global"
import * as THREE from "three"

/**
 * Everything defined in here will persist between route changes, only children are swapped
 * explanation:
 * 1. Everything defined in here will persist between route changes: This part of the comment indicates that the state and lifecycle of the components defined within the Scene component will remain consistent across different routes in your application. This is crucial for maintaining the application's state, especially for global states or components that need to maintain their state across different views or pages. For example, if you have a navigation bar or a sidebar that should always be visible regardless of the current route, defining these components within the Scene component ensures they persist across route changes.
 * 2. Only children are swapped: This part of the comment refers to the concept of "child components" in React. When you navigate between different routes in a React application, the components that are directly associated with the current route (i.e., the "children" of the Scene component) are replaced or "swapped" with the components associated with the new route. This allows for dynamic content loading based on the current route, while the global or persistent components (like the Scene component itself or any other components defined within it) remain unchanged.
 */
export const Scene = ({ ...props }) => (
	<Canvas {...props} onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}>
		<r3f.Out />
		<Preload all />
	</Canvas>
)
