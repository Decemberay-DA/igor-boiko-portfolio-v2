import dynamic from "next/dynamic"

export const dynScene = () => dynamic(() => import("@/components/canvas/Scene"), { ssr: false })
