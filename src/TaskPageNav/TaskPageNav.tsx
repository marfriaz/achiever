import React, { useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { findTask, findGoal } from "../tasks-helpers";
import "./TaskPageNav.css";

interface ParamTypes {
  taskId: string;
}
export default function TaskPageNav() {
  const history = useHistory();

  const { tasks, goals } = useContext(ApiContext)!;
  const { taskId } = useParams<ParamTypes>();
  const task = findTask(tasks, taskId) || { goal_id: undefined };
  const goal = findGoal(goals, task.goal_id);
  return (
    <div className="TaskPageNav">
      <CircleButton
        tag="button"
        onClick={() => history.goBack()}
        className="TaskPageNav__back-button"
      >
        <FontAwesomeIcon icon="chevron-left" />
        <br />
        Back
      </CircleButton>
      {goal && <h3 className="TaskPageNav__goal-name">{goal.name}</h3>}
    </div>
  );
}
