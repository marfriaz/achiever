import React, { useEffect, useState } from "react";
import { Route, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TaskListNav from "../TaskListNav/TaskListNav";
import TaskPageNav from "../TaskPageNav/TaskPageNav";
import TaskListMain from "../TaskListMain/TaskListMain";
import TaskPageMain from "../TaskPageMain/TaskPageMain";
import AddGoal from "../AddGoal/AddGoal";
import AddTask from "../AddTask/AddTask";
import ApiContext from "../ApiContext";
import config from "../config";
import "./App.css";

export default function App() {
  interface taskInterface {
    id: number;
    name: string;
    details: string;
    goal_id: number;
    date_created?: string;
  }

  type tasksInterface = taskInterface[];

  const [tasks, setTasks] = useState<tasksInterface>([]);

  interface goalInterface {
    id: number;
    name: string;
  }

  type goalsInterface = goalInterface[];

  const [goals, setGoals] = useState<goalsInterface>([]);

  useEffect(() => {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/tasks`),
      fetch(`${config.API_ENDPOINT}/api/goals`),
    ])
      .then(([tasksRes, goalsRes]) => {
        if (!tasksRes.ok) {
          return tasksRes.json().then((e) => Promise.reject(e));
        }
        if (!goalsRes.ok) {
          return goalsRes.json().then((e) => Promise.reject(e));
        }

        return Promise.all([tasksRes.json(), goalsRes.json()]);
      })
      .then(([tasks, goals]) => {
        Promise.all([setTasks(tasks), setGoals(goals)]);
      })
      .catch((error) => {
        console.error({ error });
      });
  }, []);

  const handleAddGoal = (goal: goalInterface) => {
    if (goals === undefined) {
      setGoals([goal]);
    } else {
      setGoals([...goals, goal]);
    }
  };

  const handleAddTask = (task: taskInterface) => {
    if (tasks === undefined) {
      setTasks([task]);
    } else {
      setTasks([...tasks, task]);
    }
  };

  const handleDeleteTask = (taskId: number) => {
    if (tasks === undefined) {
      return null;
    }
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const value = {
    tasks: tasks,
    goals: goals,
    addGoal: handleAddGoal,
    addTask: handleAddTask,
    deleteTask: handleDeleteTask,
  };

  return (
    <ApiContext.Provider value={value}>
      <div className="App">
        <header className="App__header">
          <h1>
            <Link to="/">Goal Manager</Link>{" "}
            <FontAwesomeIcon icon="check-double" />
          </h1>
          <div className="Quote">
            <h2>
              <FontAwesomeIcon icon="quote-left" />
              The most effective way to achieve important goals in your life is
              to break big goals up into smaller tasks.
              <FontAwesomeIcon icon="quote-right" />
            </h2>
          </div>
        </header>
        <div className="App__body">
          <div className="yo">Yo</div>
          <nav className="App__nav">
            <header className="App__nav__header">
              <h1>
                <Link to="/">Goals</Link>
                <FontAwesomeIcon icon="check-double" />
              </h1>
            </header>
            {renderNavRoutes()}
          </nav>
          <header className="App__main__header">
            <h1>
              <Link to="/">Tasks</Link> <FontAwesomeIcon icon="check-double" />
            </h1>
          </header>
          <main className="App__main">{renderMainRoutes()}</main>
        </div>
      </div>
    </ApiContext.Provider>
  );
}

//     <ApiContext.Provider value={value}>
//       <div className="App">
//         <nav className="App__nav">{renderNavRoutes()}</nav>
//         <header className="App__header">
//           <h1>
//             <Link to="/">Achiever</Link> <FontAwesomeIcon icon="check-double" />
//           </h1>
//         </header>
//         <main className="App__main">{renderMainRoutes()}</main>
//       </div>
//     </ApiContext.Provider>
//   );
// }

function renderNavRoutes() {
  return (
    <>
      {["/", "/goal/:goalId"].map((path) => (
        <Route exact key={path} path={path} component={TaskListNav} />
      ))}
      <Route path="/task/:taskId" component={TaskPageNav} />
      <Route path="/add-goal" component={TaskPageNav} />
      <Route path="/add-task" component={TaskPageNav} />
    </>
  );
}

function renderMainRoutes() {
  return (
    <>
      {["/", "/goal/:goalId"].map((path) => (
        <Route exact key={path} path={path} component={TaskListMain} />
      ))}
      <Route path="/task/:taskId" component={TaskPageMain} />
      <Route path="/add-goal" component={AddGoal} />
      <Route path="/add-task" component={AddTask} />
    </>
  );
}
