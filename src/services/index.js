import axios from 'axios';
let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'here should be your production endpoint')
  : (baseURL = 'http://localhost:3000');

const service = axios.create({ withCredentials: true, baseURL });

const MY_SERVICES = {
  getVideogames: async () => {
    return await service.get('/videogames/all');
  },
  addVideogame: async (data) =>{
    return await service.post('/videogames/create', data)
  },
  detailVideogame: async(id)=>{
    return await service.get(`/videogames/detail/${id}`)
  },
  deleteVideogame: async(id) =>{
    return await service.delete(`/videogames/delete/${id}`)
  },
  getConsoles: async () =>{
    return await service.get('/consoles/all')
  },
  getDevelopers: async () =>{
    return await service.get('/developers/all')
  },
  upload: async (photo)=>{
    return await service.post('/upload', photo)
  },
  
};

export default MY_SERVICES;
