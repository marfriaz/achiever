import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
import Task from "../Task/Task";
import ApiContext from "../ApiContext";
import { findTask } from "../tasks-helpers";
import "./TaskPageMain.css";

export default function TaskPageMain() {
  interface ParamTypes {
    taskId: string;
  }
  const { taskId } = useParams<ParamTypes>();

  const history = useHistory();

  const handleDeleteTask = (taskId: number) => {
    history.push(`/`);
  };

  const { tasks } = useContext(ApiContext)!;
  const task = findTask(tasks, taskId) || {
    id: 0,
    name: "",
    details: "",
    date_created: `${new Date()}`,
  };
  return (
    <section className="TaskPageMain">
      <Task
        id={task.id}
        name={task.name}
        modified={task.date_created}
        onDeleteTask={handleDeleteTask}
      />
      <div className="TaskPageMain__content">
        {task.details.split(/\n \r|\n/).map((para: any, i: any) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </section>
  );
}
