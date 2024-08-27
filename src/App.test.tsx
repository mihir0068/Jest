import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import App from "./App";
import { server } from "./Mocks/renameserver";
import { handlers } from "./Mocks/handlers";

// global.fetch = jest.fn(() =>
//   Promise.resolve({
//     json: () =>
//       Promise.resolve({
//         users: [
//           {
//             id: 1,
//             firstName: "Emily",
//             lastName: "Johnson",
//             email: "emily.johnson@x.dummyjson.com",
//           },
//           {
//             id: 2,
//             firstName: "Michael",
//             lastName: "Williams",
//             email: "michael.williams@x.dummyjson.com",
//           },
//         ],
//       }),
//   })
// ) as jest.Mock;
beforeEach(() => {
  return jest.spyOn(global, "fetch").mockResolvedValue({
    json: jest.fn().mockResolvedValue({
      users: [
        {
          id: 1,
          firstName: "Emily",
          lastName: "Johnson",
          email: "emily.johnson@x.dummyjson.com",
        },
        {
          id: 2,
          firstName: "Michael",
          lastName: "Williams",
          email: "michael.williams@x.dummyjson.com",
        },
      ],
    }),
  });
});

describe("Test - 1", () => {
  test("Rendering App Component", () => {
    const renderedApp = render(<App />);
    expect(renderedApp).toBeTruthy();
  });
});

describe("Test - 2", () => {
  beforeEach(() => {
    render(<App />);
  });

  test("A Word In String", () => {
    const sentence = screen.getByText(/Document/i);
    expect(sentence).toBeTruthy();
  });

  test("Button Click Change Event", () => {
    const btn = screen.getByTestId("btn");
    fireEvent.click(btn);
    const text = screen.getByText(/Hello I am In jest/i);
    expect(text).toBeInTheDocument();
  });
});

describe("Test - 3", () => {
  beforeEach(() => {
    render(<App />);
  });
  test("Successfull Api Data Checking", async () => {
    const user = userEvent.setup();
    const getuserBtn = screen.getByTestId("get-users");
    await user.click(getuserBtn);

    await waitFor(() => {
      expect(screen.getByText("Emily")).toBeInTheDocument();
      expect(screen.getByText("Michael")).toBeInTheDocument();
    });
    expect(global.fetch).toHaveBeenCalledWith("https://dummyjson.com/users");
  });
});

// describe("Test - 4 ", () => {
//   test("Occur Error When Api Result Fails", async () => {
//     (global.fetch as jest.Mock).mockRejectedValue(
//       new Error("Fail To Fetch User Data")
//     );

//     const app = render(<App />);
//     await waitFor(() => {
//       expect(app).toBeTruthy();
//       const error = screen.getByTestId("api-error");
//       expect(error).toBeInTheDocument();
//     });
//     expect(global.fetch).toHaveBeenCalledWith("https://dummyjson.com/users");
//   });
// });

describe("Test - 4 ", () => {
  test("API Fail Checking", async () => {
    server.use(...handlers.error);
    render(<App />);

    const getUserBtn2 = screen.getByTestId("get-users");
    await userEvent.click(getUserBtn2);

    await waitFor(() => {
      expect(screen.getByText("Fail To Fetch User Data")).toBeTruthy();
    });
  });

});
