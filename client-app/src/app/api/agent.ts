import { IUserFormValues } from './../models/user';
import { IActivity } from "./../models/activity";
import axios, { AxiosResponse } from "axios";
import { history } from "../..";
import { toast } from "react-toastify";
import { IUser } from "../models/user";

axios.defaults.baseURL = "http://localhost:56591/api";
axios.interceptors.response.use(undefined, (error) => {
  console.log("interceptors", error);

  if (error.message === "Network Error" && !error.response) {
    toast.error("Network Error");
  }
  
  const { status, data, config } = error.response;

  if (status === 404) {
    history.push("/notfound");
  }

  if (
    status === 400 &&
    config.method === "get" &&
    data.errors.hasOwnProperty("id")
  ) {
    history.push("/notfound");
  }

  if (status === 500) {
    toast.error("Server error");
  }

  throw error.response;
});

const responseBoy = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const requests = {
  get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBoy),
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBoy),
  put: (url: string, body: {}) =>
    axios.put(url, body).then(sleep(1000)).then(responseBoy),
  delete: (url: string) =>
    axios.delete(url).then(sleep(1000)).then(responseBoy),
};

const Activities = {
  list: (): Promise<IActivity[]> => requests.get("/activities"),
  details: (id: string) => requests.get(`/activities/${id}`),
  create: (activity: IActivity) => requests.post("/activities", activity),
  update: (activity: IActivity) =>
    requests.put(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.delete(`/activities/${id}`),
};

const User = {
  current: (): Promise<IUser> => requests.get('/user'),
  login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
  register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user),
}

export default {
  Activities,
  User
};
