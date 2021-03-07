import * as vscode from 'vscode';

let statusBarItem: vscode.StatusBarItem;

const configEditor = vscode.workspace.getConfiguration('editor.suggest');

function toggleSnippets(state: boolean) {

    const configGlobal = vscode.workspace.getConfiguration('toggle-snippets-suggestion');
    const enableGlobal = configGlobal.get('global') as boolean;

    configEditor.update('showSnippets', state, enableGlobal);

}

export function activate(context: vscode.ExtensionContext) {
    const snippetsDisabled = "$(circle-slash) Snippets";
    const snippetsEnabled = "$(check) Snippets";

    vscode.commands.registerCommand('toggle-snippets-suggestion.disable-snippets', () => {
        toggleSnippets(false);
        statusBarItem.text = snippetsDisabled;
        statusBarItem.command = 'toggle-snippets-suggestion.enable-snippets';
    });

    vscode.commands.registerCommand('toggle-snippets-suggestion.enable-snippets', () => {
        toggleSnippets(true);
        statusBarItem.text = snippetsEnabled;
        statusBarItem.command = 'toggle-snippets-suggestion.disable-snippets';
    });

    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    statusBarItem.tooltip = "Enable/Disable Snippets suggestion for workspace";

    if (configEditor.get('showSnippets')) {
        console.log('snippets is true');
        statusBarItem.text = snippetsEnabled;
        statusBarItem.command = 'toggle-snippets-suggestion.disable-snippets';
    } else {
        console.log('snippets is false');
        statusBarItem.text = snippetsDisabled;
        statusBarItem.command = 'toggle-snippets-suggestion.enable-snippets';
    }

    statusBarItem.show();

    context.subscriptions.push(statusBarItem);
}

export function deactivate() { }
