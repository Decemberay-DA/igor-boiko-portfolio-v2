import TagChip from "~/components/myFirstFrickingReactComponentsOMG/TagChip"
import { db } from "~/server/db"

type Doode = {
	id: number
	name: string
	createdAt: Date
	updatedAt: Date
}

type DBDoodesProps = {
	doodes: Doode[]
}

export const getDoodesFromDB = async () => await db.query.posts.findMany()

export default function DBDoodes({ doodes }: DBDoodesProps) {
	return (
		<div className="flex flex-col gap-2 w-ull h-fit">
			{doodes.map((doode) => (
				<div key={doode.id} className="flex flex-row gap-2">
					<TagChip tag={`id:${doode.id}`} />
					<TagChip tag={`${doode.name}`} />
					<TagChip tag={`createdAt: ${doode.createdAt.toTimeString()}`} />
					<TagChip tag={`updatedAt: ${doode.updatedAt.toTimeString()}`} />
				</div>
			))}
		</div>
	)
}
