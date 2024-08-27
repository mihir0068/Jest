import exp from "constants";
import { http, HttpResponse } from "msw";

export const handlers = {
  success: [
    http.get("https://dummyjson.com/users", () => {
      return HttpResponse.json({
        users: [
          { id: 1, firstName: "Parth" },
          { id: 2, firstName: "Nisarg" },
        ],
      });
    }),
  ],
  error: [
    http.get("https://dummyjson.com/users", () => {
      return HttpResponse.json(null, { status: 500 });
    }),
  ],
};


// import { rest } from "msw";

// const successHandler = rest.get(
//   "https://dummyjson.com/users",
//   (
//     req: any,
//     res: (arg0: any, arg1: any) => any,
//     ctx: {
//       status: (arg0: number) => any;
//       json: (
//         arg0: {
//           id: number;
//           firstName: string;
//           lastName: string;
//           email: string;
//         }[]
//       ) => any;
//     }
//   ) => {
//     return res(
//       ctx.status(200),
//       ctx.json([
//         {
//           id: 1,
//           firstName: "Emily",
//           lastName: "Johnson",
//           email: "emily.johnson@x.dummyjson.com",
//         },
//       ])
//     );
//   }
// );
