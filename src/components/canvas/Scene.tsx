"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { r3f } from "@/helpers/global"
import * as THREE from "three"

/**
 * Everything defined in here will persist between route changes, only children are swapped
 */
export const Scene = ({ ...props }) => (
	<Canvas {...props} onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}>
		<r3f.Out />
		<Preload all />
	</Canvas>
)
