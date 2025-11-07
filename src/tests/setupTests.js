import "@testing-library/jest-dom";
import { server } from "@/mocks/server";
// Start the mock server before all tests run
beforeAll(() => server.listen());

// Reset any custom handlers after each test, so tests don’t affect each other
afterEach(() => server.resetHandlers());

// Stop the server once all tests are done
afterAll(() => server.close());
