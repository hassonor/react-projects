import React from "react";
import { shallow } from "enzyme";
import Header from "./Header";

it("expect to render Header Component", () => {
  expect(shallow(<Header />)).toMatchSnapshot();
});
