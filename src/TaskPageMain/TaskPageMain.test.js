import React from "react";
import { shallow } from "../GoalListNav/node_modules/enzyme";
import toJson from "../GoalListNav/node_modules/enzyme-to-json";
import TaskPageMain from "./TaskPageMain";

describe(`TaskPageMain component`, () => {
  it("renders a .TaskPageMain by default", () => {
    const wrapper = shallow(<TaskPageMain />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // enzyme doesn't yet support React.createContext
  it.skip("renders a Task with task prop", () => {
    const props = {
      match: {
        params: {
          taskId: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        },
      },
    };
    const context = {
      tasks: [
        {
          id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
          name: `Dogs`,
          modified: `2019-01-03T00:00:00.000Z`,
          // goalId: b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1,
          content: "Corporis accusamus placeat.\n \rUnde.",
        },
      ],
    };
    const task = shallow(<TaskPageMain {...props} />, context).find("Task");
    expect(toJson(task)).toMatchSnapshot();
  });

  // enzyme doesn't yet support React.createContext
  it.skip(`splits the content by \\n or \\n\\r, with a p foreach`, () => {
    const props = {
      match: {
        params: {
          taskId: "cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1",
        },
      },
    };

    const tasksContextWithDifferentContent = [
      {
        tasks: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n r.\n \rafter n r.",
          },
        ],
      },
      {
        tasks: [
          {
            id: `cbc787a0-ffaf-11e8-8eb2-f2801f1b9fd1`,
            content: "Content with n.\nafter.",
          },
        ],
      },
    ];

    tasksContextWithDifferentContent.forEach((context) => {
      const content = shallow(<TaskPageMain {...props} />, context).find(
        "TaskPageMain__content"
      );
      expect(toJson(content)).toMatchSnapshot();
    });
  });
});
