import WebSocket from 'ws';

export enum Emote {
    ANGRY = 'emoji-angry',
    THUMBSUP = "emoji-thumbsup",
    HELLO = "emoji-hello",
    TIRED = "emoji-tired",
    DANCE = "emoji-macarena"
}

export enum Facing {
    FRONT_RIGHT = "FrontRight",
    FRONT_LEFT = "FrontLeft",
    BACK_RIGHT = "BackRight",
    BACK_LEFT = "BackLeft"
}

export class BotActionService {
    private ws: WebSocket

    constructor(ws: WebSocket) {
        this.ws = ws
    }

    sendPublicMsg = (message: string) => {
        this.ws.send(JSON.stringify({ _type: "ChatRequest", message }))
    }

    sendPrivateMsg = (message: string, whisper_target_id: string) => {
        this.ws.send(JSON.stringify({ _type: "ChatRequest", message, whisper_target_id }))
    }

    sendEmote = (emote_id: Emote, target_user_id?: string) => {
        this.ws.send(JSON.stringify({ _type: "EmoteRequest", emote_id, target_user_id }))
    }

    teleportUser = (user_id: string, x: number, y: number, z: number) => {
        this.ws.send(JSON.stringify({ _type: "TeleportRequest", user_id, destination: { x, y, z, facing: Facing.FRONT_RIGHT } }))
    }

    floorHint = (x: number, y: number, z: number, facing: Facing) => {
        this.ws.send(JSON.stringify({ _type: "FloorHitRequest", destination: { x, y, z, facing } }), (err) => {
            console.log("FLORT");
            console.log(err?.cause);
        })
    }

}