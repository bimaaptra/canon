import { z } from "zod";
import { db } from "~/server/db";
import { user } from "@prisma/client";
import { TRPCError } from "@trpc/server";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .query(async ({ input }) => {
        try {
            const user = await db.user.findFirst({
                where: {
                username: input.username,
                password: input.password,
                },
            });
            console.log(user)
        } catch (error) {
            return new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",               
            })
            
        }
    }),
});
