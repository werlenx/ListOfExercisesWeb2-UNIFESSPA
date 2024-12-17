import axios from 'axios';

const api_url = process.env.API_URL;

export async function listarUsuarios(){
    const response = await axios.get(`${api_url}lista`)
    return response.data; 
}