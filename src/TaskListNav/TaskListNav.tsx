import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { countTasksForGoal } from "../tasks-helpers";
import "./TaskListNav.css";

export default function TaskListNav() {
  const { goals, tasks } = useContext(ApiContext)!;

  const renderGoals = (goals: any) => {
    {
      if (goals === undefined) {
        return null;
      } else {
        return goals!.map((goal: any) => (
          <li key={goal.id}>
            <NavLink className="TaskListNav__goal-link" to={`/goal/${goal.id}`}>
              <span className="TaskListNav__num-tasks">
                {countTasksForGoal(tasks, goal.id)}
              </span>
              {goal.name}
            </NavLink>
          </li>
        ));
      }
    }
  };
  return (
    <div className="TaskListNav">
      <ul className="TaskListNav__list">{renderGoals(goals)}</ul>
      <div className="TaskListNav__button-wrapper">
        <CircleButton
          tag={Link}
          role="link"
          to="/add-goal"
          type="button"
          className="TaskListNav__add-goal-button"
        >
          <FontAwesomeIcon icon="plus" />
          <br />
          Goal
        </CircleButton>
      </div>
    </div>
  );
}
