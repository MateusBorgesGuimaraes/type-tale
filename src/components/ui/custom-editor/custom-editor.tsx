"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Table } from "@tiptap/extension-table";
import { TableRow } from "@tiptap/extension-table-row";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { Underline } from "@tiptap/extension-underline";
import { TextAlign } from "@tiptap/extension-text-align";
import { Highlight } from "@tiptap/extension-highlight";
import { Typography } from "@tiptap/extension-typography";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Table as TableIcon,
  Undo,
  Redo,
  Quote,
  Minus,
  Code,
  WrapText,
} from "lucide-react";
import { ErrorForm } from "../error-form/error-form";
import { forwardRef, useEffect, useImperativeHandle } from "react";

type CustomEditorProps = {
  label: string;
  errorMessage?: string;
  required?: boolean;
  value?: string;
  onChange?: (html: string) => void;
  disabled?: boolean;
  placeholder?: string;
};

export const CustomEditor = forwardRef<any, CustomEditorProps>(
  (
    {
      label,
      errorMessage,
      required,
      value = "",
      onChange,
      disabled = false,
      placeholder = "Write your story...",
    },
    ref,
  ) => {
    const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
        }),
        Underline,
        Highlight.configure({
          multicolor: false,
        }),
        Typography,
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Table.configure({
          resizable: true,
        }),
        TableRow,
        TableHeader,
        TableCell,
      ],
      content: value,
      editable: !disabled,
      onUpdate: ({ editor }) => {
        onChange?.(editor.getHTML());
      },
      editorProps: {
        attributes: {
          class:
            "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4 dark:prose-invert",
        },
      },
    });

    useEffect(() => {
      if (editor && value !== editor.getHTML()) {
        editor.commands.setContent(value);
      }
    }, [value, editor]);

    useImperativeHandle(ref, () => ({
      focus: () => editor?.commands.focus(),
    }));

    if (!editor) {
      return null;
    }

    const ToolbarButton = ({
      onClick,
      isActive = false,
      children,
      title,
    }: {
      onClick: () => void;
      isActive?: boolean;
      children: React.ReactNode;
      title: string;
    }) => (
      <button
        type="button"
        onClick={onClick}
        disabled={disabled}
        title={title}
        className={`
          p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors
          disabled:opacity-50 disabled:cursor-not-allowed
          ${isActive ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400" : ""}
        `}
      >
        {children}
      </button>
    );

    return (
      <div className="w-full flex flex-col gap-1 group">
        <label className="uppercase font-medium text-sm text-gray-500 dark:text-gray-100 transition-colors group-focus-within:text-gray-800">
          {required && <span className="mr-1 text-red-500">*</span>}
          {label}
        </label>

        <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden bg-white dark:bg-gray-800">
          <div className="border-b border-gray-300 dark:border-gray-600 p-2 flex flex-wrap gap-1 bg-gray-50 dark:bg-gray-900">
            <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBold().run()}
                isActive={editor.isActive("bold")}
                title="Bold (Ctrl+B)"
              >
                <Bold size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleItalic().run()}
                isActive={editor.isActive("italic")}
                title="Italic (Ctrl+I)"
              >
                <Italic size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                isActive={editor.isActive("underline")}
                title="Underline (Ctrl+U)"
              >
                <UnderlineIcon size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleStrike().run()}
                isActive={editor.isActive("strike")}
                title="Strikethrough"
              >
                <Strikethrough size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleHighlight().run()}
                isActive={editor.isActive("highlight")}
                title="Highlight"
              >
                <Code size={18} />
              </ToolbarButton>
            </div>

            <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <ToolbarButton
                onClick={() => editor.chain().focus().setParagraph().run()}
                isActive={editor.isActive("paragraph")}
                title="Paragraph"
              >
                <WrapText size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                isActive={editor.isActive("heading", { level: 1 })}
                title="Heading 1"
              >
                <Heading1 size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                isActive={editor.isActive("heading", { level: 2 })}
                title="Heading 2"
              >
                <Heading2 size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 3 }).run()
                }
                isActive={editor.isActive("heading", { level: 3 })}
                title="Heading 3"
              >
                <Heading3 size={18} />
              </ToolbarButton>
            </div>

            <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                isActive={editor.isActive("bulletList")}
                title="Bullet List"
              >
                <List size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                isActive={editor.isActive("orderedList")}
                title="Numbered List"
              >
                <ListOrdered size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                isActive={editor.isActive("blockquote")}
                title="Quote"
              >
                <Quote size={18} />
              </ToolbarButton>
            </div>

            <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("left").run()
                }
                isActive={editor.isActive({ textAlign: "left" })}
                title="Align Left"
              >
                <AlignLeft size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("center").run()
                }
                isActive={editor.isActive({ textAlign: "center" })}
                title="Align Center"
              >
                <AlignCenter size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("right").run()
                }
                isActive={editor.isActive({ textAlign: "right" })}
                title="Align Right"
              >
                <AlignRight size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() =>
                  editor.chain().focus().setTextAlign("justify").run()
                }
                isActive={editor.isActive({ textAlign: "justify" })}
                title="Justify"
              >
                <AlignJustify size={18} />
              </ToolbarButton>
            </div>

            <div className="flex gap-1 border-r border-gray-300 dark:border-gray-600 pr-2">
              <ToolbarButton
                onClick={() =>
                  editor
                    .chain()
                    .focus()
                    .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                    .run()
                }
                title="Insert Table"
              >
                <TableIcon size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().setHorizontalRule().run()}
                title="Horizontal Line"
              >
                <Minus size={18} />
              </ToolbarButton>
            </div>

            <div className="flex gap-1">
              <ToolbarButton
                onClick={() => editor.chain().focus().undo().run()}
                title="Undo (Ctrl+Z)"
              >
                <Undo size={18} />
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor.chain().focus().redo().run()}
                title="Redo (Ctrl+Y)"
              >
                <Redo size={18} />
              </ToolbarButton>
            </div>
          </div>

          <EditorContent
            editor={editor}
            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
          />
        </div>

        <div className="min-h-[1rem]">
          {errorMessage && <ErrorForm errorMessage={errorMessage} />}
        </div>
      </div>
    );
  },
);

CustomEditor.displayName = "CustomEditor";
