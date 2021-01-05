import React from "react";

interface taskInterface {
  id: number;
  name: string;
  details: string;
  goal_id: number;
  date_created?: string;
}

type tasksInterface = taskInterface[] | undefined;

interface goalInterface {
  id: number;
  name: string;
}

type goalsInterface = goalInterface[] | undefined;

interface AppContextInterface {
  tasks: tasksInterface;
  goals: goalsInterface;
  addGoal: (goal: goalInterface) => any;
  addTask: (task: taskInterface) => any;
  deleteTask: (taskId: number) => null | undefined;
}

export default React.createContext<AppContextInterface | null>(null);
