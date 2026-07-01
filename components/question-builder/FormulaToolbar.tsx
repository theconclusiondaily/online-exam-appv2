"use client";

import { Editor } from "@tiptap/react";
import FormulaMenu from "./formulas/FormulaMenu";
import {
  MATH_FORMULAS,
  PHYSICS_FORMULAS,
  CHEMISTRY_FORMULAS,
  GREEK_FORMULAS,
} from "./formulas/formula-library";

interface Props {
  editor: Editor;
}

export default function FormulaToolbar({
  editor,
}: Props) {

  function insertFormula(latex: string) {

    editor
      .chain()
      .focus()
      .insertContent(`$${latex}$`)
      .run();

  }

  return (

    <div className="border-b bg-slate-50">

      <div className="flex flex-wrap gap-2 p-3">

        <FormulaMenu
          title="Math"
          formulas={MATH_FORMULAS}
          onInsert={insertFormula}
        />

        <FormulaMenu
          title="Physics"
          formulas={PHYSICS_FORMULAS}
          onInsert={insertFormula}
        />

        <FormulaMenu
          title="Chemistry"
          formulas={CHEMISTRY_FORMULAS}
          onInsert={insertFormula}
        />

        <FormulaMenu
          title="Greek"
          formulas={GREEK_FORMULAS}
          onInsert={insertFormula}
        />

      </div>

    </div>

  );

}