import React from "react";

/**
 * PUBLIC_INTERFACE
 * Header bar of the notes app. Displays app name with retro style.
 */
export default function Header() {
  return (
    <header className="bg-cyan-500 text-white px-6 py-2 flex items-center shadow-retro">
      <span className="font-black text-2xl tracking-tight retro-font">notemaster</span>
      <span className="ml-4 px-2 text-lg bg-blue-700 rounded text-cyan-200 border-l-4 border-cyan-200 font-mono">v1</span>
      <div className="ml-auto"></div>
    </header>
  );
}
