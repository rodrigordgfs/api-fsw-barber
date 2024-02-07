import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../../lib/prisma";
import { z } from "zod";

const ratesSchema = z.object({
  barbershopId: z.string(),
});

export async function getBarbershopRates(app: FastifyInstance) {
  app.get(
    "/barbershops/:barbershopId/rates",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { barbershopId } = ratesSchema.parse(request.params);

        const rates = await prisma.rates.findMany({
          where: {
            barbershopId,
          },
          orderBy: { createdAt: "desc" },
        });

        return reply.status(StatusCodes.OK).send(rates);
      } catch (error) {
        console.error("Error fetching barbershops:", error);
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: "Internal server error",
        });
      }
    }
  );
}
