import { http, HttpResponse } from "msw";

export const userHandlers = [
  http.get("/url", async () => {
    return HttpResponse.json({
      success: true,
      message: "server is listening",
    });
  }),
];
