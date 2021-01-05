import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import Task from "./Task";

describe(`Task component`, () => {
  const props = {
    id: "a",
    name: "test-class-name",
    modified: new Date(2018, 12, 15),
  };

  it("renders a .Task by default", () => {
    const wrapper = shallow(<Task />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the Task given props", () => {
    const wrapper = shallow(<Task {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
