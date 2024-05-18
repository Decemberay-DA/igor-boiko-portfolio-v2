import { Inter } from "next/font/google"
import "~/styles/globals.css"
import { Layout } from "~/components/dom/Layout"
import { Header } from "~/components/Header"
import Head from "~/app/head"
import { startSystemUpdateLoop } from "~/ESCEngine/asteroidState"
import { dynamicESCEngineStarter } from "~/ESCEngine/dynamic"

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

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="antialiased">
			<Head />
			<body className={`font-sans ${inter.variable}`}>
				<Layout>
					<Header className="top-0 sticky" />
					{/* To avoid FOUT with styled-components wrap Layout with StyledComponentsRegistry https://beta.nextjs.org/docs/styling/css-in-js#styled-components */}
					{children}

					{/* tmp footer actually */}
					<Header className="bottom-0 sticky" />
					<ESCEngineStarter />
				</Layout>
			</body>
		</html>
	)
}
