import * as assert from "assert";

import * as vscode from "vscode";
import * as myExtension from "../../extension";

suite("Extension Test Suite", () => {
    myExtension.createStatusBar();

    test("settingsState", () => {
        const state = myExtension.settingState();
        assert.strictEqual(typeof state, "boolean");
    });

    test("disableSnippetsStatusBar", () => {
        myExtension.disableSnippetsStatusBar();
        assert.strictEqual(myExtension.statusBarItem.text, "$(circle-slash) Snippets");
    });

    test("enableSnippetsStatusBar", () => {
        myExtension.enableSnippetsStatusBar();
        assert.strictEqual(myExtension.statusBarItem.text, "$(check) Snippets");
    });

    test("toggleSnippets: true", async () => {
        await myExtension.toggleSnippets(true);
        const config = vscode.workspace.getConfiguration("editor.suggest");
        assert.ok(config.get("showSnippets"));
    });

    test("toggleSnippets: false", async () => {
        await myExtension.toggleSnippets(false);
        const config = vscode.workspace.getConfiguration("editor.suggest");
        assert.ok(!config.get("showSnippets"));
    });
});
