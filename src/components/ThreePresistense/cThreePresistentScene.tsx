"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { r3f } from "./PresistentTunnel"
import * as THREE from "three"
import React from "react"

/**
 * Everything defined in here will persist between route changes, only children are swapped
 */
export const cThreePresistentScene = ({ ...props }) => (
	<Canvas {...props} onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}>
		<r3f.Out />
		<Preload all />
	</Canvas>
)
