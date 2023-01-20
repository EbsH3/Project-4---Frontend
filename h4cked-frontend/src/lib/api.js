import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  login: '/api/login',
  register: '/api/register',
  vacancies: '/api/vacancies',
  employers: '/api/employers/',
  singleEmployer: (id) => `api/employers/${id}`,
  salaryInfo: '/api/salaries',
  feedback: '/api/feedback',
  addFeedback: '/api/feedback/add',
  tips: 'api/tips',
};

const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${AUTH.getToken()}`,
  },
});

const GET = (endpoint) => axios.get(endpoint);

const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);

const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);

const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders };
