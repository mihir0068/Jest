import "@testing-library/react";
import { setupServer } from "msw/node";
import { handlers } from "./Mocks/handlers";

export const server = setupServer(...handlers.success, ...handlers.error);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
