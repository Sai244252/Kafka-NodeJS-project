import { Kafka } from "kafkajs";

const kafka = new Kafka({
  //localhost : 192.168.29.55
  brokers: ["192.168.29.55:9092"],
  clientId: "my-app",
});

export default kafka;
