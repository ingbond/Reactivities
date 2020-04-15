import { IActivity } from "./../models/activity";
import { observable, action } from "mobx";
import { createContext } from "react";
import agent from "../api/agent";

class ActivityStore {
  @observable activities: IActivity[] = [];
  @observable selectedActivity: IActivity | undefined;
  @observable loadingInitial = false;
  @observable editMode = false;
  @observable submitting = false;

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      activities.forEach((y) => {
        y.date = y.date.split(".")[0];
        this.activities.push(y);
      });
    } catch (error) {
      console.log(error);
    } finally {
      this.loadingInitial = false;
    }
  };

  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;

    try {
        await agent.Activities.create(activity);
        this.activities.push(activity);
        this.editMode = false;
    } catch (error) {
        console.log(error);
    } finally {
        this.submitting = false;
    }

  };

  @action selectActivity = (id: string) => {
    this.selectedActivity = this.activities.find((x) => x.id === id);
    this.editMode = false;
  };

  @action openCreateForm = () => {
    this.editMode = true;
    this.selectedActivity = undefined;
  };
}

export default createContext(new ActivityStore());
