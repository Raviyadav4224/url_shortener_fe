import { http, HttpResponse } from "msw";

import { ALL_URL_FOR_USER, DELETE_URL, SHORTEN_URL } from "@/constants";

let dummyData = [
  {
    id: 1,
    originalUrl: "http://google.com",
    shortUrl: "AiSjcHI",
    createdAt: "2025-11-04T05:43:42.71551",
    expiresAt: "2025-11-04T06:13:42.671219",
    clickCount: 0,
  },
  {
    id: 2,
    originalUrl: "http://google.com",
    shortUrl: "LW0KDq9",
    createdAt: "2025-11-04T07:57:55.118605",
    expiresAt: "2025-11-04T08:27:55.114402",
    clickCount: 0,
  },
  {
    id: 3,
    originalUrl: "http://google.com",
    shortUrl: "http://13.200.254.26/api/v1/url/r/xvfO5fI",
    createdAt: "2025-11-04T07:57:58.328456",
    expiresAt: "2025-11-04T08:27:58.326519",
    clickCount: 0,
  },
];
export const urlHandlers = [
  http.get(ALL_URL_FOR_USER + ":id", async () => {
    return HttpResponse.json(
      {
        message: "URL's fetched successfully",
        success: true,
        data: dummyData,
      },
      { status: 200 }
    );
  }),
  http.post(SHORTEN_URL, async ({ request }) => {
    const { originalUrl } = await request.json();
    dummyData.push({
      id: 5,
      originalUrl: originalUrl,
      shortUrl: "rTujjvb",
      createdAt: "2025-11-04T05:43:42.71551",
      expiresAt: "2025-11-04T06:13:42.671219",
      clickCount: 0,
    });
    return HttpResponse.json(
      {
        message: "URL generated successfully",
        success: true,
        data: {
          "expires at": "2025-11-04T08:51:45.521908138",
          shortUrl: "http://13.200.254.26/api/v1/url/r/rTujjvb",
        },
      },
      { status: 201 }
    );
  }),
  http.delete(DELETE_URL + ":id", async ({ params }) => {
    const { id } = params;
    dummyData = dummyData.filter((item) => item?.id !== parseInt(id, 10));
    return HttpResponse.json(
      {
        message: "success",
        success: false,
        data: "Url removed successfully",
      },
      { status: 204 }
    );
  }),
];
