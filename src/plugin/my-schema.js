import { Schema } from "prosemirror-model";

export const nodes = {
  text: {
    group: "inline"
  },

  // paragraph
  paragraph: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM(node) {
      return ["p", 0];
    }
  },

  // this is just for test
  pred: {
    content: "inline*",
    group: "block",
    parseDOM: [{ tag: "p" }],
    toDOM(node) {
      return ["p", { class: "red" }, 0];
    }
  },

  // heading
  heading: {
    attrs: { level: { default: 1 } },
    content: "inline*",
    group: "block",
    defining: true,
    parseDOM: [
      { tag: "h1", attrs: { level: 1 } },
      { tag: "h2", attrs: { level: 2 } },
      { tag: "h3", attrs: { level: 3 } },
      { tag: "h4", attrs: { level: 4 } },
      { tag: "h5", attrs: { level: 5 } },
      { tag: "h6", attrs: { level: 6 } }
    ],
    toDOM(node) {
      return ["h" + node.attrs.level, 0];
    }
  },

  // document
  doc: { content: "block+" }
};

export const marks = {
  strong: {
    parseDOM: [
      { tag: "strong" },
      { tag: "b", getAttrs: node => node.style.fontWeight != "normal" && null },
      {
        style: "font-weight",
        getAttrs: value => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
      }
    ],
    toDOM() {
      return ["strong", 0];
    }
  },

  em: {
    parseDOM: [{ tag: "i" }, { tag: "em" }, { style: "font-style=italic" }],
    toDOM() {
      return ["em", 0];
    }
  }
};

export const schema = new Schema({ nodes, marks });
