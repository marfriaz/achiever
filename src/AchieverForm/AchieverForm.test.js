import React from "react";
import { shallow } from "../GoalListNav/node_modules/enzyme";
import toJson from "../GoalListNav/node_modules/enzyme-to-json";
import AchieverForm from "./AchieverForm";

describe(`AchieverForm component`, () => {
  const props = {
    className: "test-class-name",
    children: <p>test children</p>,
    "data-other": "test-other-prop",
  };

  it("renders a form.AchieverForm by default", () => {
    const wrapper = shallow(<AchieverForm />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it("renders the AchieverForm given props", () => {
    const wrapper = shallow(<AchieverForm {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
