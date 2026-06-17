export class Preset {
	regularExpression: RegExp
	name: string | null
	example: string | null

	constructor(regularExpression: RegExp) {
		this.regularExpression = regularExpression
		this.name = null
		this.example = null
	}

	setName(name: string) {
		this.name = name
		return this
	}

	setExample(example: string) {
		this.example = example
		return this
	}
	static presets = {
		default: new Preset(/(?:(?<=\b[a-zA-Z0-9]*[a-z0-9])[A-Z](?=[a-zA-Z0-9]*\b))|(?:(?<=\b[a-zA-Z0-9]*[A-Z])[A-Z][a-z](?=[a-zA-Z0-9]*\b))/g).setName("Default").setExample("HTMLLinkElement"),
		naive: new Preset(/(?<=[a-zA-Z])[A-Z]/g).setName("Naïve").setExample("NAÏVE"),
	}
}

export default Preset.presets
