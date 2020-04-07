import React, { useState } from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

let container;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

function SubHeader(props) {
  const [text, setText] = useState("");
  function handleClick() {
    setText("PROCEED TO SUBHEADER");
  }
  return <button onClick={handleClick}>{text || props.text}</button>;
}

describe("SubHeader component", () => {
  test("it shows the expected text when clicked", () => {
    act(() => {
      ReactDOM.render(<SubHeader text="SUBSCRIBE TO BASIC" />, container);
    });
    const button = container.getElementsByTagName("button")[0];
    expect(button.textContent).toBe("SUBSCRIBE TO BASIC");
    act(() => {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    expect(button.textContent).toBe("PROCEED TO SUBHEADER");
  });
});