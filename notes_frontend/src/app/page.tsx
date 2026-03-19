"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useAppContext, Note } from "./_app-context";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import NoteList from "./components/NoteList";
import NoteModal from "./components/NoteModal";
import NewNoteButton from "./components/NewNoteButton";
import {
  fetchNotes,
  fetchTags,
  createNote,
  updateNote,
  deleteNote,
} from "./api";

/** Page for Notemaster app - lists and manages notes with retro layout */
export default function Home() {
  const {
    setNotes,
    setTags,
    filters,
    setLoading,
  } = useAppContext();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalNote, setModalNote] = useState<Note | null>(null);

  // Deps for loadData callback
  const search = filters.search;
  const tagIds = filters.tagIds;

  // Load tags and notes on startup and filters change
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [n, t] = await Promise.all([
        fetchNotes({ search, tagIds }),
        fetchTags(),
      ]);
      setNotes(n);
      setTags(t);
    } catch {
      // TODO: show error toast
      setNotes([]);
    }
    setLoading(false);
  }, [search, tagIds, setNotes, setTags, setLoading]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Add note handler
  async function handleAddNote(note: { title: string; content: string; tag_ids: number[] }) {
    setLoading(true);
    try {
      await createNote(note);
      setModalOpen(false);
      setModalNote(null);
      await loadData();
    } catch (err) {
      alert("Failed to add note: " + (err instanceof Error ? err.message : String(err)));
    }
    setLoading(false);
  }

  async function handleEditNote(noteId: number, data: { title: string; content: string; tag_ids: number[] }) {
    setLoading(true);
    try {
      await updateNote(noteId, data);
      setModalOpen(false);
      setModalNote(null);
      await loadData();
    } catch (err) {
      alert("Failed to update note: " + (err instanceof Error ? err.message : String(err)));
    }
    setLoading(false);
  }

  async function handleDeleteNote(noteId: number) {
    if (!window.confirm("Delete this note permanently?")) return;
    setLoading(true);
    try {
      await deleteNote(noteId);
      await loadData();
    } catch (err) {
      alert("Failed to delete note: " + (err instanceof Error ? err.message : String(err)));
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <div className="flex flex-1 min-h-0">
        <div className="hidden sm:block">
          <Sidebar />
        </div>
        <main
          className="flex-1 px-4 py-6 max-w-3xl mx-auto sm:ml-0 min-h-0"
          style={{ overflowY: "auto" }}
        >
          <NoteList
            onSelectNote={(note) => {
              setModalNote(note);
              setModalOpen(true);
            }}
            onEditNote={(note) => {
              setModalNote(note);
              setModalOpen(true);
            }}
            onDeleteNote={(note) => handleDeleteNote(note.id)}
          />
        </main>
      </div>
      <NewNoteButton
        onClick={() => {
          setModalNote(null);
          setModalOpen(true);
        }}
      />
      <NoteModal
        open={modalOpen}
        initialNote={modalNote}
        tags={useAppContext().tags}
        onSave={(data) =>
          modalNote
            ? handleEditNote(modalNote.id, data)
            : handleAddNote(data)
        }
        onClose={() => {
          setModalNote(null);
          setModalOpen(false);
        }}
      />
    </div>
  );
}
