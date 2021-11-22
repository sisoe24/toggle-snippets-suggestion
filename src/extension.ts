import * as vscode from "vscode";

export let statusBarItem: vscode.StatusBarItem;

/**
 * Get the showSnippets setting.
 *
 * @returns state of the showSnippets setting.
 */
export function settingState() {
    const config = vscode.workspace.getConfiguration("editor.suggest");
    return config.get("showSnippets");
}

/**
 * Enable/Disable snippets suggestion.
 *
 * The setting will be updated based on the extension property: global or workspace.
 *
 * @param state state of snippets suggestion.
 */
export async function toggleSnippets(state: boolean) {
    const configGlobal = vscode.workspace.getConfiguration("toggle-snippets-suggestion");

    // If true, update to global settings
    const enableGlobal = configGlobal.get("global") as boolean;

    const config = vscode.workspace.getConfiguration("editor.suggest");
    await config.update("showSnippets", state, enableGlobal);
}

/**
 * Update status bar text with disable text
 */
export function disableSnippetsStatusBar() {
    statusBarItem.text = "$(circle-slash) Snippets";
}

/**
 * Update status bar text with enable text
 */
export function enableSnippetsStatusBar() {
    statusBarItem.text = "$(check) Snippets";
}

/**
 * Turn off `showSnippets`.
 */
export function disableSnippets() {
    toggleSnippets(false);
    disableSnippetsStatusBar();
}

/**
 * Turn on `showSnippets`.
 */
export function enableSnippets() {
    toggleSnippets(true);
    enableSnippetsStatusBar();
}

/**
 * Create the status bar action.
 */
export function createStatusBar() {
    statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);
    statusBarItem.tooltip = "Enable/Disable Snippets suggestions.";
    statusBarItem.command = "toggle-snippets-suggestion.toggle-snippets";
}

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("toggle-snippets-suggestion.toggle-snippets", () => {
            if (settingState()) {
                disableSnippets();
            } else {
                enableSnippets();
            }
        })
    );

    createStatusBar();

    // Set status bar text based on settings state
    if (settingState()) {
        enableSnippetsStatusBar();
    } else {
        disableSnippetsStatusBar();
    }

    statusBarItem.show();
}

export function deactivate() {}
