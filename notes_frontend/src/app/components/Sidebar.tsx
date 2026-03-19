"use client";

import React, { useState } from "react";
import { useAppContext } from "../_app-context";

/**
 * PUBLIC_INTERFACE
 * Sidebar for searching notes and filtering by tags.
 */
export default function Sidebar() {
  const { tags, filters, setFilters } = useAppContext();
  const [searchTerm, setSearchTerm] = useState(filters.search);

  // Handle tag toggle
  function toggleTag(id: number) {
    const newTagIds = filters.tagIds.includes(id)
      ? filters.tagIds.filter((tid) => tid !== id)
      : [...filters.tagIds, id];
    setFilters({ ...filters, tagIds: newTagIds });
  }

  function handleSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchTerm(e.target.value);
    setFilters({ ...filters, search: e.target.value });
  }

  return (
    <aside
      className="w-full sm:w-64 bg-surface border-r border-blue-200 px-4 py-6 flex flex-col gap-6 min-h-0"
      style={{ fontFamily: "monospace" }}
    >
      <section className="mb-4">
        <label htmlFor="search" className="block text-cyan-600 retro-font text-lg mb-1">
          Search
        </label>
        <input
          id="search"
          className="w-full px-2 py-1 border border-blue-300 rounded bg-white focus:outline-cyan-400 transition"
          type="text"
          value={searchTerm}
          placeholder="Search notes..."
          onChange={handleSearchInput}
        />
      </section>
      <section className="mb-2">
        <div className="text-cyan-700 retro-font font-bold mb-2">Tags</div>
        <div className="flex flex-wrap gap-2">
          {tags.length === 0 ? (
            <span className="text-gray-400 text-sm">No tags yet</span>
          ) : (
            tags.map((tag) => (
              <button
                className={`px-2 py-0.5 rounded border text-xs ${
                  filters.tagIds.includes(tag.id)
                    ? "bg-cyan-500 text-white border-cyan-600"
                    : "bg-white text-cyan-600 border-cyan-200"
                }`}
                key={tag.id}
                onClick={() => toggleTag(tag.id)}
                type="button"
              >
                {tag.name}
              </button>
            ))
          )}
        </div>
      </section>
    </aside>
  );
}
