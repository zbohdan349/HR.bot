import { logger } from "./logger.js"

export const checkVariables = (variables: any) =>{
    Object.entries(variables).forEach(claim => {
        const [variableKey,variableValue] = claim
        if(!process.env[variableKey]){
            if(variableValue){
                logger.fatal(`Missing required field ${variableKey}`)
                process.exit(1)
            }else{
                logger.warn(`Missing Optional field ${variableKey}`)
            }
        }
    })
    
}