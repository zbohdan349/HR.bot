import * as dotenv from "dotenv"
dotenv.config()
import { checkVariables } from "./utils/environment-variables.util.js";
import { startBot } from "./controllers/bot.controller.js";

const claims = {
	GREATING_INTERVAL: true,
	SERVER_URL: false,
	API_TOKEN: true,
	ROOM_ID: true,
	REDIS_URL: false
}
checkVariables(claims)

startBot()
