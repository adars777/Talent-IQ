import { streamChat } from "stream-chat.js";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
  console.error("SECRET_API_KEY OR SECRET_API_SECRET IS MISSING❗");
}

export const chatClient = streamChat.getInstance(apiKey, apiSecret);

// upsert means where we can create and update the data, that's why i gave this name upsertStreamuser
export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream User upserted Successfully. ", userData);
  } catch (error) {
    console.error("Error upserting Stream user❗ ", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream User Deleted Successfully. ", userId);
  } catch (error) {
    console.error(`Error deleting Stream User❗ ${error}`);
  }
};
