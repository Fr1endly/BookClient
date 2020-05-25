import { Transforms, Editor, Path } from "slate";

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
  const tableItem = Editor.above(editor, { match: (n) => isTable(n) });

  if (tableItem) {
    Transforms.removeNodes(editor, { at: tableItem[1] });
  }
};

export const insertRow = (editor) => {
  const [match] = Editor.nodes(editor, { match: (n) => n.type === "table" });
  const isTable = !!match;

  if (isTable) {
    const currentRowItem = Editor.above(editor, {
      match: (n) => n.type === "table-row",
    });
    if (currentRowItem) {
      const [currentRowElem, currentRowPath] = currentRowItem;

      const emptyCell = {
        type: "table-cell",
        children: [{ text: "" }],
      };

      const emptyRow = (colCount) => ({
        type: "table-row",
        children: Array(colCount)
          .fill(colCount)
          .map(() => emptyCell),
      });

      Transforms.insertNodes(
        editor,
        JSON.parse(JSON.stringify(emptyRow(currentRowElem.children.length))),
        {
          at: Path.next(currentRowPath),
          select: true,
        }
      );
    }
  }
};

export const deleteRow = (editor) => {
  const [match] = Editor.nodes(editor, { match: (n) => n.type === "table" });
  const isTable = !!match;

  if (isTable) {
    const currentRowItem = Editor.above(editor, {
      match: (n) => n.type === "table-row",
    });
    const currentTableItem = Editor.above(editor, {
      match: (n) => n.type === "table",
    });

    if (
      currentRowItem &&
      currentTableItem &&
      currentTableItem[0].children.length > 1
    ) {
      Transforms.removeNodes(editor, { at: currentRowItem[1] });
    }
  }
};

export const insertColumn = (editor) => {
  //Check if table is selected
  const [match] = Editor.nodes(editor, { match: (n) => n.type === "table" });
  const isTable = !!match;
  if (isTable) {
    // Returns tuple [Node, Path]
    const currentCellItem = Editor.above(editor, {
      match: (n) => n.type === "table-cell",
    });
    const currentTableItem = Editor.above(editor, {
      match: (n) => n.type === "table",
    });

    const nextCellPath = Path.next(currentCellItem[1]);
    const newCellPath = nextCellPath.slice();
    const replacePathPos = newCellPath.length - 2;
    const currentRowIdx = nextCellPath[replacePathPos];

    //Loops through table-rows of selected table
    currentTableItem[0].children.forEach((row, rowIdx) => {
      // Assign rowIdx value to newCellPath[ replacePathPos ] item
      // So it adds column to different rows
      newCellPath[replacePathPos] = rowIdx;

      const emptyCell = {
        type: "table-cell",
        children: [{ text: "" }],
      };
      //SELECT OPTION ??
      Transforms.insertNodes(editor, JSON.parse(JSON.stringify(emptyCell)), {
        at: newCellPath,
        select: rowIdx === currentRowIdx,
      });
    });
  }
};

export const deleteColumn = (editor) => {
  const [match] = Editor.nodes(editor, { match: (n) => n.type === "table" });
  const isTable = !!match;

  if (isTable) {
    const currentCellItem = Editor.above(editor, {
      match: (n) => n.type === "table-cell",
    });
    const currentRowItem = Editor.above(editor, {
      match: (n) => n.type === "table-row",
    });
    const currentTableItem = Editor.above(editor, {
      match: (n) => n.type === "table",
    });

    if (
      currentCellItem &&
      currentRowItem &&
      currentTableItem &&
      //Cannot delete the last cell
      currentRowItem[0].children.length > 1
    ) {
      const currentCellPath = currentCellItem[1];
      const pathToDelete = currentCellPath.slice();
      const replacePathPos = pathToDelete.length - 2;

      currentTableItem[0].children.forEach((row, rowIdx) => {
        pathToDelete[replacePathPos] = rowIdx;

        Transforms.removeNodes(editor, { at: pathToDelete });
      });
    }
  }
};
