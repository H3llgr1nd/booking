import express from "express";
import log from "./middleware/logMiddleware.js";
import errorHandler from "./middleware/errorHandler.js";
import loginRouter from "./routes/login.js";
import hostsRouter from "./routes/hosts.js";
import propertiesRouter from "./routes/properties.js";
import bookingsRouter from "./routes/bookings.js";
import amenitiesRouter from "./routes/amenities.js";
import usersRouter from "./routes/users.js";
import reviewsRouter from "./routes/reviews.js";
import * as Sentry from "@sentry/node";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({
      tracing: true,
    }),
    new Sentry.Integrations.Express({
      app,
    }),
  ],
  tracesSampleRate: 1.0, 
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());
app.use(log);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/reviews', reviewsRouter);
app.use('/hosts', hostsRouter);
app.use('/amenities', amenitiesRouter);
app.use('/bookings', bookingsRouter);
app.use('/properties', propertiesRouter);

app.use(Sentry.Handlers.errorHandler());

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
