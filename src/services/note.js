import Api from "./api";

const NoteService = {
  index: () => Api.get("/notes", {
    headers: {'x-access-token': localStorage.getItem('token')}
  }),
  create: () => Api.post("/notes", {'title': 'Nova nota', 'body': 'Nova Nota...'}, {
    headers: {'x-access-token': localStorage.getItem('token')}
  }),
  delete: (id) => Api.delete(`/notes/${id}`, {
    headers: {'x-access-token': localStorage.getItem('token')}
  }),
}

export default NoteService;