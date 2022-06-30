import { generatePath } from 'react-router-dom';
import routes from './routes';
import axios, { axiosPrivate } from './axios';
import { Project } from './typings';

export const updateProject = (id: string, project: Project) =>
  axiosPrivate.put(
    generatePath(routes.projectDetail, {
      id,
    }),
    project
  );

export const getProject = (id: string) =>
  axios.get(
    generatePath(routes.projectDetail, {
      id,
    })
  );

export const getTechnologies = (ids: number[] = []) =>
  axios.get(routes.technologyList, {
    params: {
      ids,
    },
  });

export const getCategories = (ids: number[] = []) =>
  axios.get(routes.categoryList, {
    params: {
      ids,
    },
  });

export const getScreenshots = (ids: number[] = []) =>
  axios.get(routes.screenshotList, {
    params: {
      ids,
    },
  });

export const deleteProject = (id: string) =>
  axiosPrivate.delete(generatePath(routes.projectDetail, { id }));

export const getProjects = () => axios.get(routes.projectList);

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(routes.token, {
      username,
      password,
    });

    const { access, refresh } = response.data;

    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);
    axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};

export const updateToken = async (refresh: string) => {
  try {
    const response = await axios.post(routes.refreshToken, { refresh });
    const { access } = response.data;

    localStorage.setItem('accessToken', access);
    axiosPrivate.defaults.headers.common['Authorization'] = `Bearer ${access}`;

    return Promise.resolve(response);
  } catch (e) {
    return Promise.reject(e);
  }
};