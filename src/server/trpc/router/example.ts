import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      include: {
        priceHistory: {
          include: {
            price: true,
          },
        },
      },
    });
  }),
  getOne: publicProcedure
    .input(z.object({ webcode: z.number().nullish() }).nullish())
    .query(({ ctx, input }) => {
      return ctx.prisma.product.findUnique({
        where: {
          webcode: input?.webcode ?? 0,
        },
        include: {
          priceHistory: {
            include: {
              price: true,
            },
          },
        },
      });
    }),
});
