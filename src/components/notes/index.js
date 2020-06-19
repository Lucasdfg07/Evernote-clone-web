import React, { Fragment, useEffect, useState } from 'react';
import { Column, Button } from "rbx";
import { push as Menu } from 'react-burger-menu'
import List from "../notes/list";
import NoteService from '../../services/note';
import "../../styles/notes.scss";


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
    }
  }

  const selectNote = (id) => {
    const note = notes.find((note) => {
      return note._id == id;
    })
    setCurrentNote(note);
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
          <List
            notes={notes}
            selectNote={selectNote}
            current_note={current_note} />
        </Menu>


        <Column size={12} className="notes-editor" id="notes-editor">
          Editor...
        </Column>
      </div>
    </Fragment>
  )
}

export default Notes;