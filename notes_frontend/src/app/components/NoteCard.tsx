import React from "react";
import { Note } from "../_app-context";

type NoteCardProps = {
  note: Note;
  onClick: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

/**
 * PUBLIC_INTERFACE
 * A single note, styled as a retro card.
 */
export default function NoteCard({ note, onClick, onEdit, onDelete }: NoteCardProps) {
  return (
    <div
      className="bg-white border shadow-retro rounded-lg p-4 group cursor-pointer hover:bg-blue-50 transition"
      tabIndex={0}
      role="button"
      aria-label={`Open note "${note.title}"`}
      onClick={onClick}
      onKeyPress={(e) => e.key === "Enter" && onClick()}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-extrabold retro-font text-blue-700 mb-1">{note.title}</h3>
          <div className="flex flex-wrap gap-1 mb-2">
            {note.tags.map((tag) => (
              <span key={tag.id} className="px-1 py-0.5 bg-cyan-100 text-cyan-700 rounded text-xs retro-font border border-cyan-200">{tag.name}</span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition">
          <button
            className="text-blue-600 hover:text-blue-900 retro-font"
            aria-label="Edit note"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            ✎
          </button>
          <button
            className="text-red-500 hover:text-white hover:bg-red-600 focus:outline-red-500 rounded px-1 retro-font text-base"
            aria-label="Delete note"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            🗑
          </button>
        </div>
      </div>
      <p className="mt-2 text-gray-800 retro-font text-base truncate">{note.content.substring(0, 140) + (note.content.length > 140 ? "…" : "")}</p>
      <div className="mt-2 text-xs text-gray-400 retro-font">
        Last edited: {new Date(note.updated_at).toLocaleString()}
      </div>
    </div>
  );
}
