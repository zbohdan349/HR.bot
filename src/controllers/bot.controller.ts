import WebSocket from 'ws';
import { BotActionService} from '../services/bot.action.service.js';
import * as greatingService from '../services/greating.service.js'
import { logger } from "../utils/logger.js";

let botServise:BotActionService;

export const startBot = ()=>{
    const ws = new WebSocket(process.env.SERVER_URL||'wss://production.highrise.game/web/webapi',
    {
        headers:{
            'api-token':process.env.API_TOKEN,
            'room-id':process.env.ROOM_ID
        }
    });

    ws.on('error', console.error);
    ws.on('open', () => {
        botServise = new BotActionService(ws)
        setInterval(()=>{
            ws.send(JSON.stringify({"_type": "KeepaliveRequest"}))
        },15000)
    });

    ws.on('message',function message(data){
    const req = JSON.parse(data.toString())
    switch (req._type) {
        case 'UserJoinedEvent':
            greatingService.IsUserPresent(req.user.id).then((user: any) => {
                    if(!user){
                        greatingService.addUser(req.user.id)
                        botServise.sendPrivateMsg(`Greetings to you ${req.user.username}`,req.user.id)
                    }
                })
            break;
        default:
            break;
        }
    })

    ws.on('close',(code,reason) => {
        logger.fatal(`Conection closed.Code: ${code},Reason ${reason}`)
    })
}
