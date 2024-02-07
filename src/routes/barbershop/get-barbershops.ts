import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

const barbershopQueryParamsSchema = z.object({
  recommended: z.string().optional(),
  highlight: z.string().optional(),
  rates: z.string().optional(),
  perPage: z.string().min(1).max(100).optional(),
  orderBy: z.string().optional(),
  name: z.string().optional(),
});

export async function getBarbershops(app: FastifyInstance) {
  app.get(
    "/barbershops",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { recommended, highlight, rates, perPage, orderBy, name } =
          barbershopQueryParamsSchema.parse(request.query);

        const barbershops = await prisma.barbershop.findMany({
          where: {
            recommended: recommended ? Boolean(recommended) : undefined,
            highlight: highlight ? Boolean(highlight) : undefined,
            name: {
              contains: name ? name : undefined,
            },
          },
          take: perPage ? Number(perPage) : undefined,
          orderBy: orderBy ? { [orderBy]: "desc" } : undefined,
          include: {
            rates: rates ? Boolean(rates) : false,
          },
        });

        return reply.status(StatusCodes.OK).send(barbershops);
      } catch (error) {
        console.error("Error fetching barbershops:", error);
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: "Internal server error",
        });
      }
    }
  );
}
