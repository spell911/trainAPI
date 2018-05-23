import * as nodecron from "node-cron";

nodecron.schedule("50 15 * * *", () => {
  console.log("run by node cron :");
});

console.log("job shcedule start");
