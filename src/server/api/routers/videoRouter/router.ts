import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "../../trpc";
import fetch from "node-fetch";
import { NextApiResponse } from "next";

export const videoRouter = createTRPCRouter({
  getDefaultVideo: protectedProcedure.query(({ ctx }) => {
    // const res = await fetch("http://localhost:8000/manim", {
    //   method: "GET",
    // });
    // const res = await fetch("http://localhost:8000/manim", {
    //   method: "GET",
    // });
    // const flaskEndpoint = "http://localhost:8000/manim";
    // const response = await fetch(flaskEndpoint);

    // // return res;

    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }

    // const blob = await response.arrayBuffer();
    // // res.setHeader('Content-Type', 'video/mp4');
    // return Buffer.from(blob);
    return 2;
    // res.send(Buffer.from(blob));
  }),
});
