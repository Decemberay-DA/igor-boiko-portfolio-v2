export type TagChipProps = {
	tag: string
} & React.ComponentProps<"p">

export default function TagChip({ tag, ...rest }: TagChipProps) {
	return (
		<p
			className="inline-block bg-GACTIVERIGHT text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 text-clip"
			{...rest}>
			{tag}
		</p>
	)
}
