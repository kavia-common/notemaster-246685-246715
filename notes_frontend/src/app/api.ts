import { Note, Tag } from "./_app-context";

const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

async function apiFetch<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
    // allow CORS credentials if backend requires
    credentials: "include",
  });
  if (!res.ok) {
    let errorText = "Unknown error";
    try {
      const err = await res.json();
      errorText = err.message || JSON.stringify(err);
    } catch {
      errorText = res.statusText;
    }
    throw new Error(errorText);
  }
  return res.json();
}

// PUBLIC_INTERFACE
export async function fetchNotes(params: { search?: string; tagIds?: number[] }) {
  const qry: string[] = [];
  if (params.search) qry.push(`search=${encodeURIComponent(params.search)}`);
  if (params.tagIds && params.tagIds.length > 0)
    qry.push(`tag_ids=${params.tagIds.join(",")}`);
  const qs = qry.length > 0 ? "?" + qry.join("&") : "";
  return apiFetch<Note[]>(`/api/notes${qs}`);
}

// PUBLIC_INTERFACE
export async function fetchTags() {
  return apiFetch<Tag[]>("/api/tags");
}

// PUBLIC_INTERFACE
export async function createNote(note: { title: string; content: string; tag_ids: number[] }) {
  return apiFetch<Note>("/api/notes", {
    method: "POST",
    body: JSON.stringify(note),
  });
}

// PUBLIC_INTERFACE
export async function updateNote(id: number, note: { title: string; content: string; tag_ids: number[] }) {
  return apiFetch<Note>(`/api/notes/${id}`, {
    method: "PUT",
    body: JSON.stringify(note),
  });
}

// PUBLIC_INTERFACE
export async function deleteNote(id: number) {
  return apiFetch<{ success: boolean }>(`/api/notes/${id}`, {
    method: "DELETE",
  });
}

// PUBLIC_INTERFACE
export async function createTag(tag: { name: string }) {
  return apiFetch<Tag>("/api/tags", {
    method: "POST",
    body: JSON.stringify(tag),
  });
}
