import React from "react";
import Counter from "../Counter";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
  //const { getByTestId } = render(<Counter />)
  //wont work for the scope issue
  //This way we manually male it grobal
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});
//***this function can be used to fireevent to login, signup...***

// after(() => {
//     cleanup()
// })
//****This is automatically performed by React***

test("header renders with correct text", () => {
  //   const component = render(<Counter />);
  //   const headerEl = component.getByTestId("header");
  const headerEl = getByTestId("header");
  expect(headerEl.textContent).toBe("My Counter");
});

test("counter initially start with test of 0", () => {
  const counterEl = getByTestId("counter");
  expect(counterEl.textContent).toBe("0");
});

test("input contains inital value of 1", () => {
  const inputEl = getByTestId("input");
  expect(inputEl.value).toBe("1");
});

test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");
  expect(addBtn.textContent).toBe("+");
});

test("subtract button renders with -", () => {
  const subtractBtn = getByTestId("subtract-btn");
  expect(subtractBtn.textContent).toBe("-");
});

test("change value of input works correctly", () => {
  const inputEl = getByTestId("input");
  // *optional* initial value
  expect(inputEl.value).toBe("1");

  fireEvent.change(inputEl, {
    target: { value: "5" },
  });
  // value after change
  expect(inputEl.value).toBe("5");
});

test("click on plus btn adds 1 to counter", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  fireEvent.click(addBtnEl);
  expect(counterEl.textContent).toBe("1");
});

test("click on substract btn subtracts 1 to counter", () => {
  const subStractbtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  fireEvent.click(subStractbtnEl);
  expect(counterEl.textContent).toBe("-1");
});

test("change the input value then click on add btn works correctly", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, { target: { value: "5" } });

  fireEvent.click(addBtnEl);
  expect(counterEl.textContent).toBe("5");
});

test("change the input value then click on substract btn works correctly", () => {
  const subtractBtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, { target: { value: "5" } });

  fireEvent.click(subtractBtnEl);
  expect(counterEl.textContent).toBe("-5");
});

test("add and substract then get the answer correctly", () => {
  const addBtnEl = getByTestId("add-btn");
  const subtractBtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, { target: { value: "10" } });
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  expect(counterEl.textContent).toBe("20");
  //test continues, the value hasn't been reset
  fireEvent.change(inputEl, { target: { value: "5" } });
  fireEvent.click(addBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  expect(counterEl.textContent).toBe("15");
});

test("counter contains correct classNamme", () => {
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  const addBtnEl = getByTestId("add-btn");
  const subtractBtnEl = getByTestId("subtract-btn");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEl, { target: { value: "60" } });
  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe(""); //value 60

  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green"); //value 120

  fireEvent.click(addBtnEl);
  expect(counterEl.className).toBe("green"); //value 180

  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  expect(counterEl.className).toBe(""); //value 60

  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl); //value -120
  expect(counterEl.className).toBe("red");
});
