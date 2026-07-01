"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Image from "@tiptap/extension-image";
import EditorToolbar from "./EditorToolbar";
import FormulaToolbar from "./FormulaToolbar";

interface Props {
  title: string;
  value: string;
  onChange: (value: string) => void;
}

export default function RichQuestionEditor({
  title,
  value,
  onChange,
}: Props) {

  const editor = useEditor({

    extensions: [

      StarterKit,

      Underline,

      Image,

      Placeholder.configure({

        placeholder: "Start typing your question..."

      }),

      TextAlign.configure({

        types: ["heading","paragraph"],

      }),

    ],

    content: value,

    immediatelyRender:false,

    onUpdate({editor}){

      onChange(editor.getHTML());

    }

  });

  if(!editor) return null;

  return (

<div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">

<div className="px-6 py-4 border-b bg-slate-50">

<h2 className="font-bold text-[#0F3D91]">

{title}

</h2>

</div>

<>
  <EditorToolbar editor={editor} />

  <FormulaToolbar editor={editor} />
</>

<div className="min-h-[350px] p-6">

<EditorContent editor={editor}/>

</div>

</div>

);

}