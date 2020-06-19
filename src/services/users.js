import Api from './api';

const UsersService = {
    register: (params) => Api.post('/users/register', params),
    update: (id, params) => Api.put(`/users/${id}`, params, {
      headers: {'x-access-token': localStorage.getItem('token')}
    }),
    delete: (id) => Api.delete(`/users/${id}`, {
      headers: {'x-access-token': localStorage.getItem('token')}
    }),
    login: async (params) => {
      const response = await Api.post("/users/login", params)
      localStorage.setItem('user', JSON.stringify(response.data.user));
      localStorage.setItem('token', response.data.token);
    },
    logout: () => {
      localStorage.removeItem('user', null);
      localStorage.removeItem('token', null);
    }
}

export default UsersService;