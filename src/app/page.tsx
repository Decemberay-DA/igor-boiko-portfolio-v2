/**
 *  new one
 */
export default async function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center   ">
			{newSection("LandSection - DESIGNER/DEVELOPER")}
			{newSection("AboutSection")}
			{newSection("AboutSection")}
			{newSection("AboutSection")}
			{newSection("AboutSection")}
			{newSection("AboutSection")}
			{newSection("AboutSection")}
		</main>
	)
}

const newSection = (sectionName?: string) => (
	<div id="section" className="h-[500px] w-full flexflex-col">
		<div className="h-[80%] w-full flex flex-row bg-gray-500">
			<p className="text-2xl font-bold text-white">{sectionName}</p>
		</div>
	</div>
)
