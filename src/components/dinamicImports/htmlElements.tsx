import dynamic from "next/dynamic"

export const dinScene = () => dynamic(() => import("@/components/canvas/Scene"), { ssr: false })
