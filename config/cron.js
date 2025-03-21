import { CronJob } from "cron";
import https from "https";

if (!process.env.API_URL) {
  console.error("API_URL is not defined");
  process.exit(1);
}

const job = new CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      if (res.statusCode === 200) {
        console.log("GET request sent successfully");
      } else {
        console.log("GET request failed", res.statusCode);
      }
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;