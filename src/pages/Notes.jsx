import { useState } from "react";
import { useAppContext } from "../context/useAppContext";

function Notes() {
  const { notes, setNotes } = useAppContext();
  const [text, setText] = useState("");

  function addNote() {
    if (text.trim() === "") return;

    setNotes([
      ...notes,
      {
        id: Date.now(),
        text,
      },
    ]);
    setText("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Notes</h2>

      <div className="bg-white p-4 rounded-xl shadow-sm mb-6">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          className="w-full resize-none border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-gray-900"
          rows={3}
        />
        <div className="flex justify-end mt-3">
          <button
            onClick={addNote}
            className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Add Note
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            text={note.text}
            onDelete={() => deleteNote(note.id)}
          />
        ))}
      </div>
    </div>
  );
}

function NoteCard({ text, onDelete }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm flex flex-col justify-between">
      <p className="text-gray-700">{text}</p>

      <button
        onClick={onDelete}
        className="mt-4 text-sm text-red-500 hover:underline self-end"
      >
        Delete
      </button>
    </div>
  );
}

export default Notes;