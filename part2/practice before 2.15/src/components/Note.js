import React from "react";

const Note = ({note, toggleImportance, deleteNote}) => {
    let isTrue = "";
    if(note.important){
        isTrue = "important"
    }else{
        isTrue = "is not important"
    }
    return (
        <div>
            <li>{note.content} <button onClick={toggleImportance}>{isTrue}</button> <button onClick={deleteNote}>delete</button></li>
        </div>
    )
};

export default Note;