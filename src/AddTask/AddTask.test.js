import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AddTask from "./AddTask";

describe(`AddTask component`, () => {
  const stubGoals = [
    {
      id: "b0715efe-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Important",
    },
    {
      id: "b07161a6-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Super",
    },
    {
      id: "b07162f0-ffaf-11e8-8eb2-f2801f1b9fd1",
      name: "Spangley",
    },
  ];

  it("renders the complete form", () => {
    const wrapper = shallow(<AddTask />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  // enzyme doesn't support React.createContext
  it.skip("renders the select options from goals", () => {
    const context = { goals: stubGoals };
    const select = shallow(<AddTask />, context).find("#task-goal-select");
    expect(toJson(select)).toMatchSnapshot();
  });
});
