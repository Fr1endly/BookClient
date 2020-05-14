import { Editor, Transforms, Range } from "slate";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const CustomEditor = {
  isBlockActive(editor, format) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === format,
    });

    return !!match;
  },

  isMarkActive(editor, format) {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  },

  toggleBlock(editor, format) {
    const isActive = CustomEditor.isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) => LIST_TYPES.includes(n.type),
      split: true,
    });

    Transforms.setNodes(editor, {
      type: isActive ? "paragraph" : isList ? "list-item" : format,
    });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  },

  toggleMark(editor, format) {
    const isActive = CustomEditor.isMarkActive(editor, format);

    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  },
  
  insertLink(editor, url) {
    if (editor.selection) {
      CustomEditor.wrapLink(editor, url);
    }
  },

  isLinkActive(editor) {
    const [link] = Editor.nodes(editor, { match: (n) => n.type === "link" });
    return !!link;
  },

  unwrapLink(editor) {
    Transforms.unwrapNodes(editor, { match: (n) => n.type === "link" });
  },

  wrapLink(editor, url) {
    if (CustomEditor.isLinkActive(editor)) {
      CustomEditor.unwrapLink(editor);
    }

    const { selection } = editor;
    const isCollapsed = selection && Range.isCollapsed(selection);
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
  },
};

export default CustomEditor;
