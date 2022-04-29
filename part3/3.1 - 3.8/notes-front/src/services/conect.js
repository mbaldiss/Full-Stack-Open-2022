import axios from 'axios';
const baseUrl = "/api/notes";

const getAllNotes = () => {
    const request = axios.get(baseUrl);
    return request
    .then(response => response.data);
};

const createNote = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const updateNote = updatedNote => {
    const request = axios.put(`${baseUrl}/${updatedNote.id}`, updatedNote);
    return request.then(response => response.data);
}

const deleteNote = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(id);
}

export default { getAllNotes, createNote, updateNote, deleteNote };