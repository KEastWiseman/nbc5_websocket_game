import { moveStageHandler } from "./stage.handler";
import { gameStart, gameEnd } from './game.handler.js'

const handlerMappings = {
    2 : gameStart,
    3 : gameEnd,
    11 : moveStageHandler,
}

export default handlerMappings