import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  login: `${process.env.REACT_APP_BASE_URL}/api/auth/login/`,
  register: `${process.env.REACT_APP_BASE_URL}/api/auth/register/`,
  vacancies: `${process.env.REACT_APP_BASE_URL}/api/vacancies/`,
  sectors: `${process.env.REACT_APP_BASE_URL}/api/sectors/`,
  employers: `${process.env.REACT_APP_BASE_URL}/api/employers/`,
  singleEmployer: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/employers/${id}/`,
  salaryInfo: `${process.env.REACT_APP_BASE_URL}/api/salaries/`,
  createReview: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/employer/${id}/feedback/`,
  singleReview: (employerId, reviewId) =>
    `${process.env.REACT_APP_BASE_URL}/api/employer/${employerId}/feedback/{reviewId}`,
  // addFeedback: (id) =>
  //   `${process.env.REACT_APP_BASE_URL}/api/employers/${id}/feedback/`,
  tipsTricks: `${process.env.REACT_APP_BASE_URL}/api/tips/`,
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
