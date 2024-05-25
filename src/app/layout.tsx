import { Inter } from "next/font/google"
import "~/styles/globals.css"
import { Header } from "~/components/Header"
import { Layout } from "~/components/dom/Layout"
import Head from "~/app/head"
import { startSystemUpdateLoop } from "~/ESCEngine/asteroidESCGame"
import { dynamicESCEngineStarter } from "~/ESCEngine/dynamic"
import { dinamicSpaceThreeScene } from "~/components/SpaceThreeScene/dinamicSpaceThreeScene"

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
})

export const metadata = {
	title: "Create T2 nuts",
	description: "Generated by create-t3-app",
	icons: [{ rel: "icon", url: "/favicon.ico" }],
}

const ESCEngineStarter = dynamicESCEngineStarter()
const SpaceThreeScene = dinamicSpaceThreeScene()

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="antialiased">
			<Head />
			<body className={`font-sans ${inter.variable} `}>
				<Layout>
					<Header className="top-0 sticky" />
					{/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
					{children}

					{/* tmp footer actually */}
					<Header className="bottom-0 sticky" />
					<ESCEngineStarter />
					<div id="bg_div" className="absolute top-0 left-0 h-[900px] w-full opacity-50">
						<SpaceThreeScene />
					</div>
				</Layout>
			</body>
		</html>
	)
}
