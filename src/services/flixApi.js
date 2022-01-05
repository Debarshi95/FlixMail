import generateClient from '../utils/generateClient';

const flixApi = generateClient(process.env.REACT_APP_FLIX_API);

export const getMails = (pageCount = 1) => flixApi.get(`?pageCount=${pageCount}`);

export const getMail = (id = '') => flixApi.get(`?id=${id}`);
