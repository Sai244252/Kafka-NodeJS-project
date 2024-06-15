import kafka from "./client.js";

async function init() {
  const admin = kafka.admin();
  console.log("Connecting Admin...");
  try {
    await admin.connect();
    console.log("Connection Success");

    console.log("Creating Rider Updates Topic...");
    await admin.createTopics({
      topics: [
        {
          topic: "rider-updates",
          numPartitions: 2, //North India and South India
        },
      ],
    });

    console.log("Topic Creation Success!");

    console.log("Disconnecting Admin!!");
    admin.disconnect();
  } catch (error) {
    console.log("Error:", error?.message);
  }
}

init();
