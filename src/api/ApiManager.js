import axios from 'axios';

export default axios.create({
    baseURL: 'https://api-berita-indonesia.vercel.app/'
})