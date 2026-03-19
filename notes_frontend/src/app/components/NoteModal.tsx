"use client";

import React, { useState, useEffect } from "react";
import { Tag, Note } from "../_app-context";

/**
 * PUBLIC_INTERFACE
 * Modal dialog for create/edit note.
 */
export default function NoteModal({
  open,
  initialNote,
  tags,
  onSave,
  onClose,
}: {
  open: boolean;
  initialNote?: Note | null;
  tags: Tag[];
  onSave: (note: { title: string; content: string; tag_ids: number[] }) => void;
  onClose: () => void;
}) {
  const [title, setTitle] = useState(initialNote?.title || "");
  const [content, setContent] = useState(initialNote?.content || "");
  const [selectedTags, setSelectedTags] = useState<number[]>(initialNote?.tags.map((t) => t.id) || []);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(initialNote?.title || "");
    setContent(initialNote?.content || "");
    setSelectedTags(initialNote?.tags.map((t) => t.id) || []);
    setError(null);
  }, [open, initialNote]);

  function toggleTag(id: number) {
    setSelectedTags((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Note title is required.");
      return;
    }
    onSave({ title: title.trim(), content, tag_ids: selectedTags });
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-900/70 flex items-center justify-center z-50"
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={initialNote ? "Edit note" : "New note"}
    >
      <div className="bg-white rounded-lg w-full max-w-lg p-6 shadow-retro">
        <h2 className="retro-font text-2xl text-blue-700 mb-4">
          {initialNote ? "Edit Note" : "Add Note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 retro-font text-lg" htmlFor="note-title">
            Title
          </label>
          <input
            id="note-title"
            className="w-full p-2 border border-blue-200 rounded mb-3"
            type="text"
            value={title}
            maxLength={100}
            autoFocus
            required
            onChange={(e) => setTitle(e.target.value)}
          />

          <label className="block mb-2 retro-font" htmlFor="note-content">
            Content
          </label>
          <textarea
            id="note-content"
            className="w-full border border-blue-200 rounded p-2 mb-3"
            value={content}
            minLength={1}
            rows={5}
            onChange={(e) => setContent(e.target.value)}
            style={{ fontFamily: "inherit" }}
          />

          <label className="block mb-2 retro-font">Tags</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.length === 0 ? (
              <span className="text-xs text-gray-400">No tags</span>
            ) : (
              tags.map((tag) => (
                <button
                  type="button"
                  key={tag.id}
                  onClick={() => toggleTag(tag.id)}
                  className={`px-2 py-0.5 rounded border text-xs retro-font ${
                    selectedTags.includes(tag.id)
                      ? "bg-cyan-500 text-white border-cyan-700"
                      : "bg-white text-cyan-600 border-cyan-200"
                  }`}
                  aria-pressed={selectedTags.includes(tag.id)}
                >
                  {tag.name}
                </button>
              ))
            )}
          </div>
          {error && <div className="mb-3 text-red-500 retro-font">{error}</div>}

          <div className="flex items-center gap-3 mt-2 justify-end">
            <button
              type="button"
              className="retro-font px-4 py-1 border border-blue-200 rounded bg-gray-50 text-gray-700 hover:bg-blue-100"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="retro-font px-4 py-1 border border-blue-600 rounded bg-cyan-500 text-white hover:bg-blue-600"
            >
              {initialNote ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
