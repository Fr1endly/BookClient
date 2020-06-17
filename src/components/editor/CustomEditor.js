import { Editor, Transforms, Range, Text } from "slate";
import escapeHtml from "escape-html";

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
  serialiseHtmlfromNode(node) {
    if (Text.isText(node)) {
      if (node["bold"]) return `<strong>${escapeHtml(node.text)}</strong>`;
      if (node["code"]) return `<code>${escapeHtml(node.text)}</code>;`;
      if (node["italic"]) return `<em>${escapeHtml(node.text)}</em>;`;
      if (node["underline"]) return `<u>${escapeHtml(node.text)}</u>`;
      else return escapeHtml(node.text);
    }

    const children = node.children
      .map((n) => CustomEditor.serialiseHtmlfromNode(n))
      .join("");

    switch (node.type) {
      case "quote":
        return `<blockquote>${children}</blockquote>`;
      case "paragraph":
        return `<p>${children}</p>`;
      case "heading-one":
        return `<h3>${children}</h3>`;
      case "heading-two":
        return `<h4>${children}</h4>`;
      case "link":
        return `<a href="${escapeHtml(node.url)}">${children}</a>`;
      case "table":
        return `<table><tbody>${children}</tbody></table>`;
      case "table-row":
        return `<tr>${children}</tr>`;
      case "table-cell":
        return `<td>${children}</td>`;
      default:
        return children;
    }
  },
  serialiseHtmlFromValue(value) {
    const html = value
      .map((node) => CustomEditor.serialiseHtmlfromNode(node))
      .join("");
    return html;
  },
};

export default CustomEditor;
