import React from "react";
import { shallow } from "../GoalListNav/node_modules/enzyme";
import toJson from "../GoalListNav/node_modules/enzyme-to-json";
import AddGoal from "./AddGoal";

describe(`AddItemForm component`, () => {
  it("renders the complete form", () => {
    const wrapper = shallow(<AddGoal />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
