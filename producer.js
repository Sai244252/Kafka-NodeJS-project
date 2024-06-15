import kafka from "./client.js";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer({
    transactionTimeout: 30000,
  });

  try {
    console.log("Connecting Producer...");
    await producer.connect();

    console.log("Connection successful");

    rl.setPrompt("> ");
    rl.prompt();

    rl.on("line", async function (line) {
      const [riderName, location] = line.split(" ");

      await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition: location.toLowerCase() === "north" ? 0 : 1,
            key: "location-update",
            value: JSON.stringify({
              name: riderName,
              loc: `${location}-${Math.floor(Math.random(10) * 100)}`,
            }),
          },
        ],
      });
    }).on("close", async () => {
      await producer.disconnect();
      console.log("Disconnecting Producer");
    });
  } catch (error) {
    console.log("error : ", error?.message);
  }
}

init();
