import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AchieverForm from "../AchieverForm/AchieverForm";
import ApiContext from "../ApiContext";
import config from "../config";
import "./AddTask.css";

export default function AddTask() {
  interface stateInterface {
    name: string;
    details: string;
    goal_id: string;
  }

  const [state, setState] = useState<stateInterface>({
    name: "",
    details: "",
    goal_id: "1",
  });

  const history = useHistory();

  const { addTask, goals } = useContext(ApiContext)!;

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(state);
    const newTask = {
      name: state!.name,
      details: state!.details,
      goal_id: state!.goal_id,
      date_created: new Date(),
    };
    fetch(`${config.API_ENDPOINT}/api/tasks`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTask),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((task) => {
        console.log("Yo task,", task);
        addTask(task);
        history.push(`/task/${task.id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  // const handleGoalOptions = (goals: any) => {
  //   {
  //     if (goals === undefined) {
  //       return null;
  //     } else {
  //       return goals.map((goal: any) => (
  //         <option key={goal.id} value={goal.id}>
  //           {goal.name}
  //         </option>
  //       ));
  //     }
  //   }
  // };
  console.log(state.details);
  return (
    <section className="AddTask">
      <h2>Create a task</h2>
      <AchieverForm onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="task-name-input">Name</label>
          <input
            type="text"
            id="task-name-input"
            name="task-name"
            onChange={(event: React.FormEvent) => {
              setState({
                name: (event.target as any).value,
                details: state.details,
                goal_id: state.goal_id,
              });
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="task-content-input">Content</label>
          <textarea
            id="task-content-input"
            name="task-content"
            onChange={(event: React.FormEvent) => {
              setState({
                name: state.name,
                details: (event.target as any).value,
                goal_id: state.goal_id,
              });
            }}
          />
        </div>
        <div className="field">
          <label htmlFor="task-goal-select">Goal</label>
          <select
            id="task-goal-select"
            name="task-goal-id"
            onChange={(event: React.FormEvent) => {
              setState({
                name: state.name,
                details: state.details,
                goal_id: (event.target as any).value,
              });
            }}
          >
            {/* <option value={null}>...</option> */}

            {goals!.map((goal: any) => (
              <option key={goal.id} value={goal.id}>
                {goal.name}
              </option>
            ))}
          </select>
        </div>
        <div className="buttons">
          <button type="submit">Add task</button>
        </div>
      </AchieverForm>
    </section>
  );
}
