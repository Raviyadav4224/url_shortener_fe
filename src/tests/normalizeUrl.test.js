import { normalizeUrl } from "@/utils";

describe("tests URL", () => {
  test("should return shortenCode", () => {
    expect(normalizeUrl("http://13.200.254.26/api/v1/url/r/AiSjcHI")).toEqual("AiSjcHI");
  });
});
