export type VizCardProp = {
	imageURL: string
	category: string
	tags: string[]
}

const categories = [
	"Analytics",
	"History",
	"Market",
	"Economics",
	"Sales",
	"Chart",
	"Forecast",
	"Comparison",
	"Indicators",
]
const imageExamples = ["https://via.placeholder.com/150"]
const tagOptions = [
	["data", "chart", "analytics", "visualization"],
	["history", "data", "trends"],
	["forecast", "market", "future", "trends"],
	["economics", "comparison", "indicators"],
	["sales", "yearly", "bar chart"],
	["charts", "visualization", "data"],
	["forecast", "market", "future", "trends"],
	["comparison", "indicators", "data", "chart"],
	["indicators", "data", "chart", "trends"],
	["data", "chart", "analytics", "visualization"],
]

const getRandomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]!

const generateRandomVizData = (): VizCardProp[] => {
	return Array.from({ length: 24 }, () => ({
		imageURL: getRandomItem(imageExamples),
		category: getRandomItem(categories),
		tags: getRandomItem(tagOptions),
	}))
}

export const vizData: VizCardProp[] = generateRandomVizData()

export const wrapStringInPipe = (str: string) => "| " + str + " |"
