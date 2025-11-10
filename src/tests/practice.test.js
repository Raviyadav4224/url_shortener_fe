import { expect, vi } from "vitest";

// const myPromise = new Promise((res, rej) => {
//   rej();
// });
// function createPromiseThatReturnsValue(valueToReturn) {
//   return new Promise((resolve, reject) => {
//     // Simulate an asynchronous operation (e.g., a network request, a timer)
//     setTimeout(() => {
//       const success = true; // This could be determined by the outcome of the async operation

//       if (success) {
//         resolve(valueToReturn); // Resolve the promise with the specified value
//       } else {
//         reject(new Error("Operation failed!")); // Reject the promise with an error
//       }
//     }, 1000); // Simulate a 1-second delay
//   });
// }
// const valuePromise = createPromiseThatReturnsValue(10);

// const fetchData = async () => {
//   try {
//     const res = await fetch("https://dummyjson.com/productsq");
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// console.log(myPromise);
// const userData = [{ id: 10, value: "" }];

function greetGoodMorning(usernam) {
  return `Good Morning, ${usernam}`;
}
describe("Tests something cools", () => {
  //   test("should just check basics", () => {
  //     expect([{ id: 10, value: "" }]).toEqual(userData);
  //   });

  //   test("should test a promise value", async () => {
  //     try {
  //       await fetchData();
  //     } catch (error) {
  //       expect(error).toBeUndefined();
  //     }
  //   });

  test("should include ", () => {
    // expect(["a","b"]).includes("a")
    // expect(["a","b"]).toContain("a")
    // expect(["a", "b"]).toContain("a");

    const mockFn = vi.fn(greetGoodMorning);
    mockFn("Ravi");
    expect(mockFn).toHaveBeenCalledWith("Ravi");
    expect(mockFn("Ravi")).toBe("Good Morning, Ravi");
  });
});
