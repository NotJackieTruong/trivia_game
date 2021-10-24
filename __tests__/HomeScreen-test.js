import HomeScreen from "#src/screens/app/home/HomeScreen";
import React from "react";
import renderer from "react-test-renderer";

test('renders home screen correctly', ()=>{
  const tree = renderer.create(<HomeScreen/>).toJSON()
  expect(tree).toMatchSnapshot()
})