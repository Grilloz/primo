import { setBlockType, toggleMark } from "prosemirror-commands";
import { schema } from "./my-schema";

function deleteSelection(state, dispatch) {
  if (state.selection.empty) return false;
  dispatch(state.tr.deleteSelection());
  return true;
}

export function setHeading(state, dispatch) {
  let type = schema.nodes.heading;
  //if (dispatch) toggleMark(schema.marks.strong);
  setBlockType(type, { level: 1 });
  console.log("heading");
  return true;
}

function blinkView(state, dispatch, view) {
  if (dispatch) {
    view.dom.style.background = "yellow";
    setTimeout(() => (view.dom.style.background = ""), 1000);
  }
  return true;
}
