import * as vscode from 'vscode';

function toggleSnippets(state: boolean) {

	const configEditor = vscode.workspace.getConfiguration('editor.suggest');

	const configGlobal = vscode.workspace.getConfiguration('toggle-snippets-suggestion');
	const enableGlobal = configGlobal.get('global') as boolean;

	configEditor.update('showSnippets', state, enableGlobal);

}

export function activate() {
	vscode.commands.registerCommand('toggle-snippets-suggestion.disable-snippets', () => {
		toggleSnippets(false);
	});

	vscode.commands.registerCommand('toggle-snippets-suggestion.enable-snippets', () => {
		toggleSnippets(true);
	});

}

export function deactivate() { }
