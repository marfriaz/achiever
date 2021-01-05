interface goalInterface {
  id: number;
  name: string;
}

interface taskInterface {
  id: number;
  name: string;
  details: string;
  goal_id: number;
  date_created?: string;
}
export const findGoal = (
  goals: goalInterface[] | undefined,
  goalId: number | undefined
) => goals!.find((goal) => goal.id === goalId);

export const findTask = (tasks: taskInterface[] | undefined, taskId: string) =>
  tasks!.find((task) => task.id === parseFloat(taskId));

export const getTasksForGoal = (
  tasks: taskInterface[] | undefined,
  goalId: string
) =>
  !goalId
    ? tasks
    : tasks!.filter((task) => task.goal_id === parseFloat(goalId));

export const countTasksForGoal = (
  tasks: taskInterface[] | undefined,
  goalId: string
) => tasks!.filter((task) => task.goal_id === parseFloat(goalId)).length;
