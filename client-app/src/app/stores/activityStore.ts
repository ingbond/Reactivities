import { IActivity } from "./../models/activity";
import { observable, action, computed, configure, runInAction } from "mobx";
import { createContext, SyntheticEvent } from "react";
import agent from "../api/agent";

configure({ enforceActions: "always" });

class ActivityStore {
  @observable activityRegistry = new Map();
  @observable activity: IActivity | null = null;
  @observable loadingInitial = false;
  @observable submitting = false;
  @observable target = "";

  @computed get activitesByDate() {
    return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
  }

  groupActivitiesByDate(activities: IActivity[]) {
    const sortedActivites = activities.sort(
      (a, b) => Date.parse(a.date) - Date.parse(b.date)
    );

    return Object.entries(
      sortedActivites.reduce((activities,activity) => {
        const date = activity.date.split('T')[0];
        activities[date] = activities[date] ? [...activities[date], activity] : [activity];
        return activities;
      }, {} as {[key: string]: IActivity[]})
    );
  }

  @action loadActivities = async () => {
    this.loadingInitial = true;

    try {
      const activities = await agent.Activities.list();
      runInAction("loading activities", () => {
        activities.forEach((y) => {
          y.date = y.date.split(".")[0];
          this.activityRegistry.set(y.id, y);
        });
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction("loading activities finally", () => {
        this.loadingInitial = false;
      });
    }
  };

  @action clearActivity = () => {
    this.activity = null;
  }

  @action editActivity = async (activity: IActivity) => {
    this.submitting = true;

    try {
      await agent.Activities.update(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
        this.activity = activity;
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };

  @action loadActivity = async (id: string) => {
    let activity = this.getActivity(id);

    if (activity) this.activity = activity;
    else {
      this.loadingInitial = true;

      try {
        activity = await agent.Activities.details(id);
        runInAction("getting activity", () => {
          this.activity = activity;
          this.loadingInitial = false;
        });
      } catch (error) {
        console.log(error);
      } finally {
        runInAction("getting activity final", () => {
          this.loadingInitial = false;
        });
      }
    }
  };

  getActivity = (id: string) => {
    return this.activityRegistry.get(id);
  };

  @action deleteActivity = async (
    event: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    this.submitting = true;
    this.target = event.currentTarget.name;

    try {
      await agent.Activities.delete(id);
      runInAction(() => {
        this.activityRegistry.delete(id);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.submitting = false;
        this.target = "";
      });
    }
  };

  @action openEditForm = (id: string) => {
    this.activity = this.activityRegistry.get(id);
  };

  @action cancelSelectedActivity = () => {
    this.activity = null;
  };


  @action createActivity = async (activity: IActivity) => {
    this.submitting = true;

    try {
      await agent.Activities.create(activity);
      runInAction(() => {
        this.activityRegistry.set(activity.id, activity);
      });
    } catch (error) {
      console.log(error);
    } finally {
      runInAction(() => {
        this.submitting = false;
      });
    }
  };


}

export default createContext(new ActivityStore());
