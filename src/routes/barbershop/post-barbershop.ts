import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { StatusCodes } from "http-status-codes";
import { prisma } from "../../lib/prisma";
import { z } from "zod";

const barbershopBodySchema = z.object({
  name: z.string(),
  address: z.string(),
  image: z.string(),
  about: z.string(),
  recommended: z.boolean().default(false),
  highlight: z.boolean().default(false),
});

export async function postBarbershops(app: FastifyInstance) {
  app.post(
    "/barbershops",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const { name, address, image, about, recommended, highlight } =
          barbershopBodySchema.parse(request.body);

        const barbershop = await prisma.barbershop.create({
          data: {
            name,
            address,
            image,
            about,
            recommended,
            highlight,
          },
        });

        return reply
          .status(StatusCodes.CREATED)
          .send({ barbershopId: barbershop.id });
      } catch (error) {
        console.error("Error fetching barbershops:", error);
        return reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send({
          error: "Internal server error",
        });
      }
    }
  );
}
