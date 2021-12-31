import React from "react";
import { shallow } from "enzyme";
import Card from "./Card";

it("expect to render Card Component", () => {
  expect(shallow(<Card />)).toMatchSnapshot();
});
