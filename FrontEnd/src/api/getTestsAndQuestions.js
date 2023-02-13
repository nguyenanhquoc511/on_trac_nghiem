import axios from "axios";

export const getQuestionQuery = (query, page) => axios.get(`http://localhost:3000/api/questions/getAll?sort=-createdAt&search=${query}&page=${page}`);

export const getTestQuery = (query, page) => axios.get(`http://localhost:3000/api/tests/getAll?sort=-createdAt&search=${query}&page=${page}`);

export const EDIT_QUESTION = 'http://localhost:3000/api/questions/update/'

export const DELETE_QUESTION = 'http://localhost:3000/api/questions/delete/'

export const DELETE_TEST = 'http://localhost:3000/api/tests/delete/'

export const EDIT_TEST = 'http://localhost:3000/api/tests/update/'

