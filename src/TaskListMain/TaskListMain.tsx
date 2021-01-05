import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Task from "../Task/Task";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { getTasksForGoal } from "../tasks-helpers";
import "./TaskListMain.css";

interface ParamTypes {
  goalId: string;
}

export default function TaskListMain() {
  const { goalId } = useParams<ParamTypes>();
  const { tasks } = useContext(ApiContext)!;

  const tasksForGoal = getTasksForGoal(tasks!, goalId);
  const handleDeleteTask = (taskId: number) => {};

  return (
    <section className="TaskListMain">
      <ul>
        {tasksForGoal!.map((task) => (
          <li key={task.id}>
            <Task
              id={task.id}
              name={task.name}
              modified={task.date_created}
              onDeleteTask={handleDeleteTask}
            />
          </li>
        ))}
      </ul>
      <div className="TaskListMain__button-container">
        <CircleButton
          tag={Link}
          to="/add-task"
          role="link"
          type="button"
          className="TaskListMain__add-task-button"
        >
          <FontAwesomeIcon icon="plus" />
          <br />
          Task
        </CircleButton>
      </div>
    </section>
  );
}
