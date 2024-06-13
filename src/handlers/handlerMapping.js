import { moveStageHandler } from "./stage.handler.js";
import { gameStart, gameEnd } from './game.handler.js'
import { getItemHandler } from "./item.handler.js";

const handlerMappings = {
    2 : gameStart,
    3 : gameEnd,
    4 : getItemHandler,
    11 : moveStageHandler,
}

export default handlerMappings