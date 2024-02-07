import fastify from "fastify";
import { getBarbershops } from "../routes/barbershop/get-barbershops";
import { postBarbershops } from "../routes/barbershop/post-barbershop";
import { getBarbershopRates } from "../routes/barbershop/rates/get-rates";

const app = fastify();

app.register(getBarbershops);
app.register(postBarbershops);
app.register(getBarbershopRates)

app.listen({ port: 4444 }).then(() => {
  console.log("Server is running on port 4444");
});
