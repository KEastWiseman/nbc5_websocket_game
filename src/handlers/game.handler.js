import { getGameAssets } from "../init/assets.js";
import { setStage, getStage } from "../models/stage.model.js";
import { clearStage } from "../models/stage.model.js";
import { clearItem } from "../models/item.model.js";

export const gameStart = (uuid, payload) =>{

    const { stages } = getGameAssets();
    clearStage(uuid);
    clearItem(uuid);
    setStage(uuid, stages.data[0].id, payload.timestamp);
    console.log('Stage: ', getStage(uuid));
    return {status: 'success'};
}

export const gameEnd = (uuid, payload) =>{
    const { timestamp:gameEndTime, score } = payload;
    const stages = getStage(uuid);
    const {stages:stagesAsset} = getGameAssets();

    if(!stages.length) {
        return { status : 'fail', message : 'No Stages found for user'};
    }

    let totalScore = 0;

    stages.forEach((stage,index) =>{
        let stageEndTime;
        if(index === stages.length-1){
            stageEndTime = gameEndTime;
        } else {
            stageEndTime = stages[index + 1].timestamp;
        }

        const stageDuration = (stageEndTime - stage.timestamp) / 1000 * stagesAsset.data[index].scorePerSecond;
        totalScore += stageDuration;
    })

    if (Math.abs(score - totalScore) > 5) {
        return { status: 'fail', message:'Score verification failed'};
    }
    
    // user 결과 score 저장 위치
    
    return {status: 'success', message : "Game ended", score};
}