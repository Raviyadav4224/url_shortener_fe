import { delay, http } from "msw";

import { urlHandlers } from "./urlHandlers";
import { userHandlers } from "./userHandler";

export const handlers = [
  http.all("*", async () => {
    await delay(3000); // Delays all requests by 1 second
    // No return here, as it's a passthrough handler
  }),
  ...urlHandlers,
  ...userHandlers,
];
