import { Transforms, Editor } from "slate";

export const insertTable = (editor) => {
  const table = {
    type: "table",
    children: [
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
        ], 
      },
      {
        type: "table-row",
        children: [
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
          {
            type: "table-cell",
            children: [{ text: "" }],
          },
        ],
      },
    ],
  };

  Transforms.insertNodes(editor, table);
};

export const deleteTable = (editor) => {
  const isTable = (n) => n.type === "table";
  const tableItem = Editor.above(editor, { match: deleteTable.isTable });

  if (tableItem) {
    Transforms.removeNodes(editor, { at: tableItem[1] });
  }
};
