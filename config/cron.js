import cron from "cron";

const job = new cron.CronJob("*/14 * * * *", async function () {
    if (!process.env.API_URL) {
        console.error("API_URL is not configured; skipping cron health check");
        return;
    }

    try {
        const response = await fetch(process.env.API_URL);

        if (response.ok) {
            console.log("GET request sent successfully");
        } else {
            console.log("GET request failed", response.status);
        }
    } catch (error) {
        console.error("Error while sending request", error);
    }
});

export default job;


