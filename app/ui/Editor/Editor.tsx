import styles from "./Editor.module.scss"

import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"

type EditorProps = {
  content?: string
  setContent?: (content: string) => void
}

export default function Editor({ content, setContent }: EditorProps) {
  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography],
    content,
    editorProps: {
      attributes: {
        class: 'focus:outline-none p-4 w-full min-h-36 max-h-80 ',
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      setContent?.(JSON.stringify(json))
      console.log(json)
    },
  })

  const classNames = `${styles.tiptap} focus:outline-none bg-default-100 rounded-md p-4 w-full min-h-36 max-h-80 overflow-y-auto`

  return <EditorContent className={classNames} editor={editor} />
}
