"use client"

import editorStyles from "./Editor.module.scss"

import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import React from "react"

type EditorProps = {
  content?: string
  setContent?: (content: string) => void
}

export default function Markdown({ content, setContent }: EditorProps) {
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit, Highlight, Typography],
    content,
    editorProps: {
      attributes: {
        class: "focus:outline-none p-4 w-full min-h-36 max-h-80 ",
      },
    },
    onUpdate: ({ editor }) => {
      const json = editor.getJSON()
      setContent?.(JSON.stringify(json))
      console.log(json)
    },
  })

  const classNames = `${editorStyles.tiptap} focus:outline-none w-full`

  return <EditorContent className={classNames} editor={editor} />
}
