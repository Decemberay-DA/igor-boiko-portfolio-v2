/**
 *  new one hahaahahhaaaaaaaaaaaaaaaaaaaaahelpmebtwhaha
 */
export default async function HomePage() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center   ">
			{_newSection("LandSection - DESIGNER/DEVELOPER")}
			{_newSection("AboutSection")}
			{_newSection("AboutSection")}
			{_newSection("AboutSection")}
			{_newSection("AboutSection")}
			{_newSection("AboutSection")}
			{_newSection("AboutSection")}
		</main>
	)
}

/**
 *
 */
const _newSection = (sectionName?: string) => (
	<div id="section" className="h-[500px] w-full flexflex-col">
		<div className="h-[70%] w-full flex flex-row bg-gray-500">
			<p className="text-2xl font-bold text-white">{sectionName}</p>
		</div>
	</div>
)
