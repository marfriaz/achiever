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
  details: string;
  modified?: string;
  onDeleteTask: (taskId: number) => void | null;
}
export default function Task({
  name,
  id,
  details,
  modified,
  onDeleteTask,
}: TaskProps) {
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
    <div className={["Task__card", details].join(" ")}>
      {name}
      <div className="TaskPageMain__content">
        {details.split(/\n \r|\n/).map((para: any, i: any) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="Task__dates">
        <div className="Task__dates-modified">
          Created
          <span className="Date">{format(modified!, "Do MMM YYYY")}</span>
        </div>
      </div>
      <button
        className="Task__delete"
        type="button"
        onClick={(ev) => handleClickDelete(ev)}
      >
        <FontAwesomeIcon icon="trash-alt" /> remove
      </button>
    </div>
  );
}
