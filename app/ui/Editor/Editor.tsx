import styles from "./Editor.module.scss"

import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"

type EditorProps = {
  content?: string
  onChange?: (content: string) => void
}

export default function Editor({ content }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      console.log(json)
      // send the content to an API here
    },
  })

  return <EditorContent className={styles.tiptap} editor={editor} />
}
