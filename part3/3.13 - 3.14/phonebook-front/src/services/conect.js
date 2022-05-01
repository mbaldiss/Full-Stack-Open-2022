import axios from 'axios';
const baseUrl = "/api/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(response => response.data);
};

const update = newObject => {
    const request = axios.put(`${baseUrl}/${newObject.id}`, newObject);
    return request.then(response => response.data);
}

const delP = id => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(id);
}

export default { getAll, create, update, delP };