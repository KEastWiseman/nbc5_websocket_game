export const gameStart = (uuid, payload) =>{

    const { stages } = getGameAssets();
    setStage(uuid, stages.data[0].id, payload.timestamp);
    console.log('Stage: ', getStage(uuid));


    return {status: 'success'};
}

export const gameEnd = (uuid, payload) =>{
    const { timestamp:gameEndTime, score } = payload;
    const stages = getStage(uuid);

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

        const stageDuration = (stageEndTime - stage.timestamp) / 1000;
        totalScore += stageDuration;
    })

    if (Math.abs(score - totalScore) > 5) {
        return { status: 'fail', message:'Score verification failed'};
    }
    
    // user 결과 score 저장 위치
    
    return {status: 'success', message : "Game ended", score};
}