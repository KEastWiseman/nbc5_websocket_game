import { getGameAssets } from '../init/assets.js';
import { getStage, setStage } from '../models/stage.model.js';

export const moveStageHandler = (userId, payload) => {
    
    let currentStages = getStage(userId);
    if(!currentStages.length){
        return { status : 'fail', message : "No stages found for user"};
    }

    currentStages.sort((a,b)=> a.id - b.id);
    const currentStage = currentStages[currentStages.length-1];

    if(currentStage.id !== payload.currentStage) {
        return { status : 'fail', message : "Current Stage mismatch"};
    }

    const serverTime = Date.now();
    const elapsedTime = (serverTime - currentStage.timestamp) / 1000;

    const { stages } = getGameAssets();
    // 각 스테이지 마다 체크해야됨
    if(elapsedTime < 9.5 || elapsedTime > 10.5){
        return {status : 'fail', message: `Invalid elapsed time : ${elapsedTime}`};
    }

    
    if(!stages.data.some((stage)=>stage.id === payload.targetStage)){
        return {status : 'fail', message: "Taget stage not found"};
    }

    // 현재 유저의 점수가 다음 넘어갈 스테이지의 기준 보다 큰지 검증

    setStage(userId, payload.targetStage, serverTime);

    return { status : "success"};
}