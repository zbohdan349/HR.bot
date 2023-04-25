import { redisClient } from '../redis.conection.js'

export const addUser = async (userId: string) => {
    redisClient.set(userId, 0, { PX: Number(process.env.GREATING_INTERVAL) })
}

export const IsUserPresent = async (userId: string) => {
    return redisClient.get(userId)
}
