import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AchieverForm from "../AchieverForm/AchieverForm";
import ApiContext from "../ApiContext";
import config from "../config";
import "./AddGoal.css";

export default function AddGoal() {
  interface stateInterface {
    inputValue: string;
  }

  const [state, setState] = useState<stateInterface>();

  const history = useHistory();

  const { addGoal } = useContext(ApiContext)!;

  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const goal = {
      name: state,
    };
    fetch(`${config.API_ENDPOINT}/api/goals`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(goal),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((e) => Promise.reject(e));
        }
        return res.json();
      })
      .then((goal) => {
        addGoal(goal);
        history.push(`/goal/${goal.id}`);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  const handleChange = (event: React.FormEvent) => {
    var inputValue = (event.target as any).value;
    setState(inputValue);
  };

  return (
    <section className="AddGoal">
      <h2>Create a goal</h2>
      <AchieverForm onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="goal-name-input">Name</label>
          <input
            type="text"
            id="goal-name-input"
            name="goal-name"
            onChange={(ev) => handleChange(ev)}
          />
        </div>
        <div className="buttons">
          <button type="submit">Add goal</button>
        </div>
      </AchieverForm>
    </section>
  );
}
