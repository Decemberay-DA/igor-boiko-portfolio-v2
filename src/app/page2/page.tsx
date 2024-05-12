import { dynBlob, dynCommon, dynView } from "~/components/dinamicImports/3dModels"
const Blob = dynBlob()
const Common = dynCommon()
const View = dynView()

export default function Page() {
	return (
		<>
			<div className="flex flex-col gap-12">
				<div className="mx-auto flex w-full flex-col flex-wrap items-center md:flex-row  lg:w-4/5">
					<div className="flex w-full flex-col items-start justify-center p-12 text-center md:w-2/5 md:text-left">
						<p className="w-full uppercase">Next + React Three Fiber</p>
						<h1 className="my-4 text-5xl font-bold leading-tight">Next 3D Starter</h1>
						<p className="mb-8 text-2xl leading-normal">
							A minimalist starter for React, React-three-fiber and Threejs.
						</p>
					</div>
				</div>
			</div>

			<View className="absolute top-0 flex h-screen w-full flex-col items-center justify-center">
				<Blob />
				<Common />
			</View>
			<div className="flax flex-col gap-12">
				<View className="relative h-36 hover:h-48 w-full flex-col items-center justify-center">
					<Blob position={[-1.2, 0, 0]} />
					<Blob position={[1.2, 0, 0]} />
					<Common color={"#c586c0"} />
				</View>
				<View className="relative h-36 hover:h-48 w-full flex-col items-center justify-center">
					<Blob />
					<Common color={"#23909d"} />
				</View>
				<View className="relative h-36 hover:h-48 w-full flex-col items-center justify-center">
					<Blob />
					<Common color={"#5f4eac"} />
				</View>
			</div>
		</>
	)
}
