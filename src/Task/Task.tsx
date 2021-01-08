import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ApiContext from "../ApiContext";
import config from "../config";
import "./Task.css";

interface TaskProps {
  name: string;
  id: number;
  modified?: string;
  onDeleteTask: (taskId: number) => void | null;
}
export default function Task({ name, id, modified, onDeleteTask }: TaskProps) {
  const { deleteTask } = useContext(ApiContext)!;

  const handleClickDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    const taskId = id;

    fetch(`${config.API_ENDPOINT}/api/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((e) => Promise.reject(e));
      })
      .then(() => {
        deleteTask(taskId);
        onDeleteTask(taskId);
      })
      .catch((error) => {
        console.error({ error });
      });
  };

  return (
    <div className="Task">
      <h2 className="Task__title">
        <Link to={`/task/${id}`}>{name}</Link>
      </h2>
      <button
        className="Task__delete"
        type="button"
        onClick={(ev) => handleClickDelete(ev)}
      >
        <FontAwesomeIcon icon="trash-alt" /> remove
      </button>
      <div className="Task__dates">
        <div className="Task__dates-modified">
          Created{" "}
          <span className="Date">{format(modified!, "Do MMM YYYY")}</span>
        </div>
      </div>
    </div>
  );
}
