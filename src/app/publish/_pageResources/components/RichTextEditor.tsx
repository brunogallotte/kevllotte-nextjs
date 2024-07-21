'use client'

import {
  ChevronDown,
  Pen,
  TextAlignCenter,
  TextAlignLeft,
  TextAlignRight,
  TextBold,
  TextItalic,
} from '@carbon/icons-react'
import { Button } from '@nextui-org/button'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/dropdown'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export const RichTextEditor = () => {
  const [content, setContent] = useState('<p>Hello World! 🌎️</p>')

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight,
    ],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none',
      },
    },
    autofocus: true,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
    content,
  })

  console.log(content)

  return (
    <form>
      <div className="flex h-full w-full border border-zinc-900">
        <button
          className={twMerge(
            'flex items-center justify-center border-r border-zinc-900 p-2 transition-all duration-300',
            editor?.isActive('bold') && 'bg-zinc-900',
          )}
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          <TextBold className="min-h-6 min-w-6" />
        </button>
        <button
          className={twMerge(
            'flex items-center justify-center border-r border-zinc-900 p-2 transition-all duration-300',
            editor?.isActive('italic') && 'bg-zinc-900',
          )}
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          <TextItalic className="min-h-6 min-w-6" />
        </button>

        <button
          className={twMerge(
            'flex items-center justify-center border-r border-zinc-900 p-2 transition-all duration-300',
            editor?.isActive({ textAlign: 'left' }) && 'bg-zinc-900',
          )}
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign('left').run()}
        >
          <TextAlignLeft className="min-h-6 min-w-6" />
        </button>
        <button
          className={twMerge(
            'flex items-center justify-center border-r border-zinc-900 p-2 transition-all duration-300',
            editor?.isActive({ textAlign: 'center' }) && 'bg-zinc-900',
          )}
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign('center').run()}
        >
          <TextAlignCenter className="min-h-6 min-w-6" />
        </button>
        <button
          className={twMerge(
            'flex items-center justify-center border-r border-zinc-900 p-2 transition-all duration-300',
            editor?.isActive({ textAlign: 'right' }) && 'bg-zinc-900',
          )}
          type="button"
          onClick={() => editor?.chain().focus().setTextAlign('right').run()}
        >
          <TextAlignRight className="min-h-6 min-w-6" />
        </button>

        <button
          className="flex items-center gap-2 border-r border-zinc-900 px-4 text-[14px]"
          type="button"
          onClick={() => editor?.chain().focus().toggleHighlight().run()}
        >
          <Pen className="text-zinc-500" />
          Highlight
        </button>
        <Dropdown>
          <DropdownTrigger>
            <Button
              className="bg-transparent"
              startContent={<ChevronDown className="text-zinc-300" />}
            >
              Size of text
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions">
            <DropdownItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 1 }).run()
              }
            >
              H1
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 2 }).run()
              }
            >
              H2
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 3 }).run()
              }
            >
              H3
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 4 }).run()
              }
            >
              H4
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 5 }).run()
              }
            >
              H5
            </DropdownItem>
            <DropdownItem
              onClick={() =>
                editor?.chain().focus().toggleHeading({ level: 6 }).run()
              }
            >
              H6
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      <EditorContent className="pt-8" editor={editor} />
    </form>
  )
}
