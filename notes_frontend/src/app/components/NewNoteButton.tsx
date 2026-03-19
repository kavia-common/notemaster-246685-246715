import React from "react";

/**
 * PUBLIC_INTERFACE
 * Floating button for creating a new note.
 */
export default function NewNoteButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      className="fixed z-30 right-6 bottom-6 rounded-full bg-cyan-500 text-white px-6 py-3 retro-font text-lg border-2 border-cyan-700 shadow-lg hover:bg-cyan-700 hover:scale-105 focus:outline-cyan-400 transition"
      aria-label="Add new note"
      onClick={onClick}
    >
      ＋ New Note
    </button>
  );
}
