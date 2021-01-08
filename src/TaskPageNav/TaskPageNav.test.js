import React from "react";
import { shallow } from "../GoalListNav/node_modules/enzyme";
import toJson from "../GoalListNav/node_modules/enzyme-to-json";
import TaskPageNav from "./TaskPageNav";

describe(`TaskPageNav component`, () => {
  it("renders a .TaskPageNav by default", () => {
    const wrapper = shallow(<TaskPageNav />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // enzyme doesn't support React.createContext
  it.skip("renders a h3 with goal name when in props", () => {
    const props = {
      match: {
        params: {
          taskId: "test-task-id",
        },
      },
    };
    const context = {
      tasks: [{ id: "test-task-id", goalId: "test-goal-id" }],
      goals: [{ id: "test-goal-id", name: "Important" }],
    };

    const h3 = shallow(<TaskPageNav {...props} />, context).find(
      ".TaskPageNav__goal-name"
    );
    expect(toJson(h3)).toMatchSnapshot();
  });
});
