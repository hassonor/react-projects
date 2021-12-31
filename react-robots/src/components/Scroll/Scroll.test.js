import React from "react";
import { shallow } from "enzyme";
import Scroll from "./Scroll";

it("expect to render Scroll Component", () => {
  expect(shallow(<Scroll />)).toMatchSnapshot();
});
