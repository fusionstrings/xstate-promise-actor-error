// https://stately.ai/docs/promise-actors#promise-actor-error-handling

import { createActor, fromPromise } from "xstate";

const promiseLogic = fromPromise(async () => {
  throw new Error("Something went wrong");
});

const promiseActor = createActor(promiseLogic);

promiseActor.subscribe((snapshot) => {
  if (snapshot.status === "error") {
    // it's never logged because promiseLogic throws before this code can execute.
    console.info("promise actor error");
    console.log(snapshot.error);
    // logs 'Error: Something went wrong'
  }
});

promiseActor.start();
