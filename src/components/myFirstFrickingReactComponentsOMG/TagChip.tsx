export type TagChipProps = {
	tag: string
	props?: Record<string, string>
}

export default function TagChip(props: TagChipProps) {
	return (
		<div
			className="inline-block bg-GACTIVERIGHT text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2"
			{...props.props}>
			{props.tag}
		</div>
	)
}
