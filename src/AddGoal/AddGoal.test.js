import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";
import AddGoal from "./AddGoal";

describe(`AddItemForm component`, () => {
  it("renders the complete form", () => {
    const wrapper = shallow(<AddGoal />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
