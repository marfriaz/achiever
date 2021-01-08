import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CircleButton from "../CircleButton/CircleButton";
import ApiContext from "../ApiContext";
import { countTasksForGoal } from "../tasks-helpers";
import "./GoalListNav.css";

export default function GoalListNav() {
  const { goals, tasks } = useContext(ApiContext)!;

  const renderGoals = (goals: any) => {
    {
      if (goals === undefined) {
        return null;
      } else {
        return goals!.map((goal: any) => (
          <div className="Goal__card" key={goal.id}>
            <NavLink className="GoalListNav__goal-link" to={`/goal/${goal.id}`}>
              <span className="GoalListNav__num-tasks">
                {countTasksForGoal(tasks, goal.id)}
              </span>
              {goal.name}
            </NavLink>
          </div>
        ));
      }
    }
  };
  return (
    <section className="GoalListNav">
      <div className="GoalListNav__list">
        {renderGoals(goals)}{" "}
        <div className="GoalListNav__button-wrapper">
          <CircleButton
            tag={Link}
            role="link"
            to="/add-goal"
            type="button"
            className="GoalListNav__add-goal-button"
          >
            <FontAwesomeIcon icon="plus" />
            <br />
            Goal
          </CircleButton>
        </div>
      </div>
    </section>
  );
}
