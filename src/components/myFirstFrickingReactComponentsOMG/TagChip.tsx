export type TagChipProps = {
	tag: string
	props?: React.ComponentProps<"div">
}

export default function TagChip(p: TagChipProps) {
	return (
		<div
			className="inline-block bg-GACTIVERIGHT text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
			{...p.props}>
			{p.tag}
		</div>
	)
}
