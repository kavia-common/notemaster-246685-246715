"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Tag = {
  id: number;
  name: string;
};

export type Note = {
  id: number;
  title: string;
  content: string;
  tags: Tag[];
  created_at: string;
  updated_at: string;
};

type Filters = {
  search: string;
  tagIds: number[];
};

type AppContextProps = {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
  filters: Filters;
  setFilters: (filters: Filters) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

// PUBLIC_INTERFACE
export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be within AppContextProvider");
  return ctx;
}

// PUBLIC_INTERFACE
export default function AppContextProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [filters, setFilters] = useState<Filters>({ search: "", tagIds: [] });
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <AppContext.Provider value={{ notes, setNotes, tags, setTags, filters, setFilters, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
}
