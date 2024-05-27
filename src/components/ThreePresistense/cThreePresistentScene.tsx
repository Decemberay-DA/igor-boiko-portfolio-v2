"use client"

import { Canvas } from "@react-three/fiber"
import { Preload } from "@react-three/drei"
import { ThreePresistentTunnel } from "./ThreePresistentTunnel"
import * as THREE from "three"
import React from "react"

/**
 * Everything defined in here will persist between route changes, only children are swapped
 */
export const cThreePresistentScene = ({ ...props }) => (
	<Canvas {...props} onCreated={(state) => (state.gl.toneMapping = THREE.AgXToneMapping)}>
		<ThreePresistentTunnel.Out />
		<Preload all />
	</Canvas>
)
