import fastify from "fastify";
import { getBarbershops } from "../routes/barbershop/get-barbershops";

const app = fastify();

app.register(getBarbershops);

app.listen({ port: 4444 }).then(() => {
  console.log("Server is running on port 4444");
});
