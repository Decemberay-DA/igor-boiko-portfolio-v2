import { array } from "fp-ts";
import { pipe } from "fp-ts/lib/function";

export type IVizData = {
	imageURL: string;
	category: string;
	tags: string[];
};

export const vizData: IVizData[] = [
	{
		imageURL:
			"https://randompicturegenerator.com/img/picture-generator/57e5d74a4f57af14f1dc8460962e33791c3ad6e04e50744172297cd69745c5_640.jpg",
		category: "Analytics",
		tags: ["data", "chart", "analytics", "visualization"],
	},
	{
		imageURL:
			"https://randompicturegenerator.com/img/picture-generator/57e5d74a4f57af14f1dc8460962e33791c3ad6e04e50744172297cd69745c5_640.jpg",
		category: "History",
		tags: ["history", "data", "trends"],
	},
	{
		imageURL: "https://randompicturegenerator.com/img/picture-generator/gummibarchen-318362_640.jpg",
		category: "Market",
		tags: ["forecast", "market", "future", "trends"],
	},
	{
		imageURL:
			"https://randompicturegenerator.com/img/picture-generator/54e0d2474a51ac14f1dc8460962e33791c3ad6e04e5074417c2e7dd1914bc4_640.jpg",
		category: "Economics",
		tags: ["economics", "comparison", "indicators"],
	},
	{
		imageURL:
			"https://randompicturegenerator.com/img/picture-generator/54e0d2474a51ac14f1dc8460962e33791c3ad6e04e5074417c2e7dd1914bc4_640.jpg",
		category: "Sales",
		tags: ["sales", "yearly", "bar chart"],
	},
	{
		imageURL: "https://randompicturegenerator.com/img/picture-generator/gummibarchen-318362_640.jpg",
		category: "Market",
		tags: ["forecast", "market", "future", "trends"],
	},
	{
		imageURL:
			"https://randompicturegenerator.com/img/picture-generator/54e0d2474a51ac14f1dc8460962e33791c3ad6e04e5074417c2e7dd1914bc4_640.jpg",
		category: "Economics",
		tags: ["economics", "comparison", "indicators"],
	},
	{
		imageURL:
			"https://randompicturegenerator.com/img/picture-generator/54e0d2474a51ac14f1dc8460962e33791c3ad6e04e5074417c2e7dd1914bc4_640.jpg",
		category: "Sales",
		tags: ["sales", "yearly", "bar chart"],
	},
];

/**
 * rotates array by random amount
 */
function rotateArray<T>(array: T[]): T[] {
	const randomAmount = Math.floor(Math.random() * array.length);
	return array.slice(randomAmount, array.length).concat(array.slice(0, randomAmount));
}

const loremIpsunWords = ["lorem", "solo", "ipsum", "dolor", "sit", "amet", "do"];
const createloremIpsumSentence = (wordCount: number) => {
	return loremIpsunWords.slice(0, wordCount).join(" ");
};
const breacSentenceToWords = (sentence: string) => {
	return sentence.split(" ");
};

const getRandomChipWords = (wordCount: number) =>
	pipe(
		createloremIpsumSentence(wordCount), //
		breacSentenceToWords,
		rotateArray,
	);

const createIVizData = (imageURI: string) => {
	return {
		imageURL: imageURI,
		category: createloremIpsumSentence(3),
		tags: rotateArray(loremIpsunWords.slice(0, 3)),
	};
};

const wrapStringInPipe = (str: string) => "| " + str + " |";

export const createTagChip = (tag: string) => {
	return (
		<div className="inline-block bg-GACTIVERIGHT text-white rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">
			{tag}
		</div>
	);
};

export const createTagRow = (tags: string[]) => {
	return <div className="flex flex-wrap gap-2">{tags.map((tag) => createTagChip(tag))}</div>;
};

export const createVizDataCard = (data: IVizData) => {
	return (
		// container
		<div className="flex flex-col gap-2 p-4 bg-GACTIVEABLE rounded-lg">
			{/* image */}
			<img src={data.imageURL} alt="viz data card image" className="w-full h-auto" />
			{/* category */}
			<div className="text-lg font-semibold">{data.category}</div>
			{/* tags */}
			{createTagRow(data.tags)}
		</div>
	);
};

export const createVizDataList = () => {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
			{pipe(
				vizData,
				rotateArray,
				array.map((a) => ({ ...a, category: wrapStringInPipe(a.category) })),
				(a) => a.map(createVizDataCard),
				// (a) => (
				// 	<div>{a}</div>
				// ),
			)}
		</div>
	);
};
