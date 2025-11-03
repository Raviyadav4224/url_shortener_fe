import { urlHandlers } from "./urlHandlers";
import { userHandlers } from "./userHandler";

export const handlers = [...urlHandlers, ...userHandlers];
