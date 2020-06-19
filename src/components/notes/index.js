import React, { Fragment, useEffect, useState } from 'react';
import { Column, Button } from "rbx";
import { push as Menu } from 'react-burger-menu'
import List from "../notes/list";
import NoteService from '../../services/note';
import "../../styles/notes.scss";
import Editor from "../notes/editor";
import Search from '../notes/search';


function Notes(props) {
  const [notes, setNotes] = useState([]);
  const [current_note, setCurrentNote] = useState({ title: "", body: "", id: "" });

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const response = await NoteService.index();
    if (response.data.length >= 1) {
      setNotes(response.data.reverse())
      setCurrentNote(response.data[0])
    } else {
      setNotes([]);
    }
  }

  const selectNote = (id) => {
    const note = notes.find((note) => {
      return note._id == id;
    })
    setCurrentNote(note);
  }

  const createNote = async () => {
    await NoteService.create();
    fetchNotes();
  }

  const deleteNote = async (note) => {
    await NoteService.delete(note._id);
    fetchNotes();
  }

  const updateNote = async (oldNote, params) => {
    const updatedNote = await NoteService.update(oldNote._id, params);
    const index = notes.indexOf(oldNote);
    const newNotes = notes;
    newNotes[index] = updatedNote.data;
    setNotes(newNotes);
    setCurrentNote(updatedNote.data);
  }

  const searchNotes = async (query) => {
    const response = await NoteService.search(query);
    setNotes(response.data)
  }

  return (
    <Fragment>
      <div className="notes" id="notes">
        <Menu 
          pageWrapId={"notes-editor"} 
          isOpen={ props.isOpen }
          onStateChange={(state) => props.setIsOpen(state.isOpen)}
          disableAutoFocus 
          outerContainerId={"notes"}
          customBurgerIcon={ false }
          customCrossIcon={ false }
        >
          <Search searchNotes={searchNotes} fetchNotes={fetchNotes} />
          
          <List
            notes={notes}
            selectNote={selectNote}
            current_note={current_note}
            createNote={createNote}
            deleteNote={deleteNote} />
        </Menu>


        <Column size={12} className="notes-editor" id="notes-editor">
          <Editor note={current_note} updateNote={updateNote} />
        </Column>
      </div>
    </Fragment>
  )
}

export default Notes;