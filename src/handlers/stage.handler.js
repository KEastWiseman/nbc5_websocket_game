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
    // if(elapsedTime < stages.data || elapsedTime > 10.5){
    //     return {status : 'fail', message: `Invalid elapsed time : ${elapsedTime}`};
    // }

    
    if(!stages.data.some((stage)=>stage.id === payload.targetStage)){
        return {status : 'fail', message: "Taget stage not found"};
    }

    if(payload.score < stages.data[payload.targetStage-1000].scoreLimit){
        return {status : 'fail', message: `Invalid user score pass to next stage ${payload.score} : ${stages.data[payload.targetStage-1000].scoreLimit}`};
    }


    setStage(userId, payload.targetStage, serverTime);
    console.log('Stage: ', getStage(uuid));
    return { status : "success", message : `Next Stage ${payload.targetStage-999}`};
}