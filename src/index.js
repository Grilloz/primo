import { schema } from "./plugin/my-schema";
import { setHeading, blinkView } from "./plugin/my-commands";

import { EditorState } from "prosemirror-state";
import { EditorView } from "prosemirror-view";
import { Transform } from "prosemirror-transform";
import { undo, redo, history } from "prosemirror-history";
import { keymap } from "prosemirror-keymap";
import { baseKeymap } from "prosemirror-commands";
import { InputRule, inputRules, emDash } from "prosemirror-inputrules";

let doc = schema.node("doc", null, [
  schema.node("paragraph", null, [schema.text("Hello!.")]),
  schema.node("paragraph", null, [schema.text("One.")]),
  schema.node("heading", { level: 1 }, [schema.text("Hello!.")]),
  schema.node("heading", { level: 2 }, [schema.text("World!.")]),
  schema.node("paragraph", null, [schema.text("red.")])
  //schema.node("horizontal_rule"),
  //schema.node("paragraph", null, [schema.text("Two!")])
]);

let state = EditorState.create({
  doc,
  plugins: [
    history(),
    keymap({ "Mod-z": undo, "Mod-y": redo, "Alt-h": setHeading }),
    keymap(baseKeymap)
  ]
});

let view = new EditorView(document.querySelector("#editor"), {
  state,
  handleKeyPress() {
    console.log("key");
  }
});

let tr = new Transform(doc);
//tr.insert(content: schema.node("paragraph", null, [schema.text("Hello!.")]))
//tr.delete(5, 7); // Delete between position 5 and 7
//tr.split(5); // Split the parent node at position 5
//console.log(tr.doc.toString()); // The modified document
//console.log(tr.steps.length); // → 2
