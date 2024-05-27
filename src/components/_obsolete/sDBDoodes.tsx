import { sTagChip as STagChip } from "./sTagChip"

type DBDoode = {
	id: number
	name: string
	createdAt: Date
	updatedAt: Date
}

export const sDBDoodes = ({ doodes }: { doodes: DBDoode[] }) => (
	<div className="flex flex-col gap-2 w-ull h-fit">
		{doodes.map((doode) => (
			<div key={doode.id} className="flex flex-row gap-2">
				<STagChip tag={`id:${doode.id}`} />
				<STagChip tag={`${doode.name}`} />
				<STagChip tag={`createdAt: ${doode.createdAt.toTimeString()}`} />
				<STagChip tag={`updatedAt: ${doode.updatedAt.toTimeString()}`} />
			</div>
		))}
	</div>
)
