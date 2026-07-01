"use client";

import { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Undo2,
  Redo2,
} from "lucide-react";
import ImageUploadButton from "./ImageUploadButton";
interface Props {
  editor: Editor;
}

const buttonStyle =
  "p-2 rounded-lg hover:bg-slate-200 transition";

export default function EditorToolbar({
  editor,
}: Props) {
  if (!editor) return null;
async function handleImage(url:string){

editor
.chain()
.focus()
.setImage({
    src:url
})
.run();

}
  return (
    <div className="border-b bg-slate-50">

      <div className="flex flex-wrap gap-2 p-3">

        <button
          className={buttonStyle}
          onClick={() =>
            editor.chain().focus().toggleBold().run()
          }
        >
          <Bold size={18} />
        </button>

        <button
          className={buttonStyle}
          onClick={() =>
            editor.chain().focus().toggleItalic().run()
          }
        >
          <Italic size={18} />
        </button>

        <button
          className={buttonStyle}
          onClick={() =>
            editor.chain().focus().toggleUnderline().run()
          }
        >
          <Underline size={18} />
        </button>

        <button
          className={buttonStyle}
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          <List size={18} />
        </button>

        <button
          className={buttonStyle}
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered size={18} />
        </button>

        <button
          className={buttonStyle}
          onClick={() =>
            editor.chain().focus().undo().run()
          }
        >
          <Undo2 size={18} />
        </button>

        <button
          className={buttonStyle}
          onClick={() =>
            editor.chain().focus().redo().run()
          }
        >
          <Redo2 size={18} />
        </button>

       <ImageUploadButton
  onSelect={handleImage}
/>

      </div>

    </div>
  );
}