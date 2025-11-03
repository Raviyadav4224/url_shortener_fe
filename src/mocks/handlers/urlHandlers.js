import { http, HttpResponse } from "msw";

export const urlHandlers = [
  http.get("/url", async () => {
    return HttpResponse.json({
      success: true,
      message: "server is listening",
    });
  }),
];
