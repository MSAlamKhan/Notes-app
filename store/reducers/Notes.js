import Note from "../../Models/Note";
import { CREATE_NOTE, DELETE_NOTE, UPDATE_NOTE } from "../actions/Notes";

const initialState = {
  notes: [], //is notes ke array ma Notes model kobject store kiay jaeay ga
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_NOTE:
      const newNote = new Note(
        Math.random().toString(),
        action.noteData.title,
        action.noteData.description
      );
      return {
        notes: state.notes.concat(newNote),
      };
    case UPDATE_NOTE:
      const editedNoteIndex = state.notes.findIndex(
        (note) => note.id === action.id
      );

      const updatedNote = new Note(
        action.id,
        action.noteData.title,
        action.noteData.description
      );
      const updatedNotes = [...state.notes];
      updatedNotes[editedNoteIndex] = updatedNote;
      return {
        notes: updatedNotes,
      };

    case DELETE_NOTE:
      const newNotesList = state.notes.filter((note) => note.id !== action.id);
      return {
        notes: newNotesList,
      };

    default:
      return state;
  }
};
