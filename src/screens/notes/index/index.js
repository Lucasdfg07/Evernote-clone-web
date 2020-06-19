import React, { Fragment, useState } from 'react';
import HeaderLogged from "../../../components/header_logged";
import { Column } from "rbx";
import "../../../styles/notes.scss";

import Notes from "../../../components/notes";

function NotesScreen() {
  const [isOpen, setIsOpen] = useState(false)

  return(
  <Fragment>
      <HeaderLogged setIsOpen={setIsOpen}/>
      <Notes isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Fragment>
  )
}

export default NotesScreen;