"use client";

import React from "react";
import { useAppContext, Note } from "../_app-context";
import NoteCard from "./NoteCard";

/**
 * PUBLIC_INTERFACE
 * List of notes, filtered and sorted. Shows a message if no notes.
 */
export default function NoteList({
  onSelectNote,
  onEditNote,
  onDeleteNote,
}: {
  onSelectNote: (note: Note) => void;
  onEditNote: (note: Note) => void;
  onDeleteNote: (note: Note) => void;
}) {
  const { notes, loading } = useAppContext();

  // Filter by tagIds if present (server-side filtering is also applied)
  const filtered = notes;

  return (
    <div className="space-y-4">
      {loading ? (
        <div className="text-gray-400 text-center my-16">Loading notes…</div>
      ) : filtered.length === 0 ? (
        <div className="text-gray-400 text-center my-16">No notes found.</div>
      ) : (
        filtered
          .sort((a, b) => (a.updated_at > b.updated_at ? -1 : 1))
          .map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onClick={() => onSelectNote(note)}
              onEdit={() => onEditNote(note)}
              onDelete={() => onDeleteNote(note)}
            />
          ))
      )}
    </div>
  );
}
