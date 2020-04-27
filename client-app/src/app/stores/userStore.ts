import { history } from './../../index';
import { IUser, IUserFormValues } from './../models/user';
import { observable, computed, action, runInAction } from "mobx";
import agent from '../api/agent';
import { RootStore } from './rootStore';

export default class UserStore {
    rootStore: RootStore;
  
    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable user : IUser | null = null;

    @computed get isLoggedIn() {return !!this.user}

    @action login = async (values: IUserFormValues) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            });
            history.push('/activities');
        } catch(error) {
            console.log(error);
            throw error;
        }
    }
}