import * as vscode from "vscode"

class SpaceCamel {
	context: vscode.ExtensionContext
	spaceDecorationType: vscode.TextEditorDecorationType
	timeout: NodeJS.Timeout | undefined
	activeEditor: vscode.TextEditor | undefined
	/**/
	constructor(context: vscode.ExtensionContext) {
		this.context = context
		this.spaceDecorationType = this.updateTextEditorDecorationType(vscode.workspace.getConfiguration("spaceCamel").get("separator") ?? " ")
		this.timeout = undefined
		this.activeEditor = vscode.window.activeTextEditor
		if (this.activeEditor) this.triggerUpdateDecorations()
		vscode.window.onDidChangeActiveTextEditor(
			(editor) => {
				this.activeEditor = editor
				if (editor) this.triggerUpdateDecorations()
			},
			null,
			context.subscriptions
		)
		vscode.workspace.onDidChangeTextDocument(
			(event) => {
				if (this.activeEditor && event.document === this.activeEditor.document) this.triggerUpdateDecorations(true)
			},
			null,
			context.subscriptions
		)
		vscode.workspace.onDidChangeConfiguration(
			(event) => {
				this.updateTextEditorDecorationType(vscode.workspace.getConfiguration("spaceCamel").get("separator") ?? " ")
				if (this.activeEditor) this.triggerUpdateDecorations()
			},
			null,
			context.subscriptions
		)
	}

	updateTextEditorDecorationType(separator: string) {
		if (this.spaceDecorationType) {
			this.spaceDecorationType.dispose()
		}
		const decorationType = vscode.window.createTextEditorDecorationType({
			before: {
				contentText: separator,
			},
		})
		this.spaceDecorationType = decorationType
		return decorationType
	}

	updateDecorations() {
		if (!this.activeEditor) return
		const text = this.activeEditor.document.getText()
		const spaces: vscode.DecorationOptions[] = []
		let match
		while ((match = SpaceCamel.regularExpression.exec(text))) {
			const startPos = this.activeEditor.document.positionAt(match.index)
			const endPos = this.activeEditor.document.positionAt(match.index + match[0].length)
			const decoration: vscode.DecorationOptions = { range: new vscode.Range(startPos, endPos) }
			spaces.push(decoration)
		}
		this.activeEditor.setDecorations(this.spaceDecorationType, spaces)
	}

	triggerUpdateDecorations(throttle = false) {
		if (this.timeout) {
			clearTimeout(this.timeout)
			this.timeout = undefined
		}
		if (throttle) {
			this.timeout = setTimeout(() => {
				this.updateDecorations()
			}, 500)
		} else {
			this.updateDecorations()
		}
	}
	/** I'm a regular expression to match capital letters, provided zhey are placed after any letter. */
	static regularExpression = /(?<=[a-zA-Z])[A-Z]/g
}

export function activate(context: vscode.ExtensionContext) {
	new SpaceCamel(context)
}

export function deactivate() {}
