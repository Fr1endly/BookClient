import { Transforms, Editor, Range } from "slate";

export function insertLink(editor, url) {
  if (editor.selection) {
    wrapLink(editor, url);
  }
}

export function isLinkActive(editor) {
  const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
  return !!link;
}
export function unwrapLink(editor) {
  Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
}

export function wrapLink(editor, url) {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  // Link type node
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
}
