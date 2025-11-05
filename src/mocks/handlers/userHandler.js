import { http, HttpResponse } from "msw";

import { LOGIN, LOGOUT, REGISTER } from "@/constants";

export const userHandlers = [
  http.post(REGISTER, async ({ request }) => {
    const { username, password } = await request.json();
    try {
      if (!username || !password) {
        return HttpResponse.json(
          {
            message: "Invalid input",
            success: false,
            data: {
              password:
                "Password does not meets the criteria of having at least one digit, one lowercase letter, one uppercase letter, one special character, and a length between 8 and 20 characters",
            },
          },
          { status: 500 }
        );
      }

      return HttpResponse.json(
        {
          message: "",
          success: true,
          data: "User registered successfully with token - eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSYXZpIEt1bWFyIiwiaWF0IjoxNzYyMjMzNzQ0LCJleHAiOjE3NjIyMzU1NDR9.RzLvGXVmBV15ZX8vIxmJgvbn2hC-KqsYvawwQWYugOM",
        },
        { status: 201 }
      );
    } catch (error) {
      return HttpResponse.json(
        {
          error: error?.message,
        },
        { status: 400 }
      );
    }
  }),
  http.post(LOGIN, async ({ request }) => {
    const { username, password } = await request.json();
    try {
      if (!username || !password) {
        return HttpResponse.json(
          {
            message: "Something went wrong",
            success: false,
            data: null,
          },
          { status: 500 }
        );
      }
      return HttpResponse.json(
        {
          message: "",
          success: true,
          data: "User logged in successfully with token - eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJSYXZpIEt1bWFyIiwiaWF0IjoxNzYyMjMzNzc4LCJleHAiOjE3NjIyMzU1Nzh9.anFIIwrZz941pZ4b6oeFmNWh5JLaD3USgbdAruj_5ao",
        },
        { status: 201 }
      );
    } catch (error) {
      return HttpResponse.json(
        {
          error: error?.message,
        },
        { status: 400 }
      );
    }
  }),
  http.post(LOGOUT, async () => {
    return HttpResponse.json(
      {
        message: "User logged out successfully",
        success: true,
        data: null,
      },
      { status: 202 }
    );
  }),
];
