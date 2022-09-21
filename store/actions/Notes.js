export const CREATE_NOTE = "CREATE_NOTE";
export const UPDATE_NOTE = "UPDATE_NOTE";
export const DELETE_NOTE = "DELETE_NOTE";

export const createNote = (title, description) => {
  return {
    type: CREATE_NOTE,
    noteData: {
      title,
      description,
    },
  };
};

export const updateNote = (id, title, description) => {
  return {
    type: UPDATE_NOTE,
    id,
    noteData: {
      title,
      description,
    },
  };
};

export const deleteNote = (id) => {
  return {
    type: DELETE_NOTE,
    id,
  };
};
