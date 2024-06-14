import { sendEvent } from './Socket.js'

class Score {
  score = 0;
  HIGH_SCORE_KEY = 'highScore';
  stageChange = null;
  noStageData = true;
  currentStage = 1000;
  stageData = null;
  itemData = null;
  
  constructor(ctx, scaleRatio) {
    this.ctx = ctx;
    this.canvas = ctx.canvas;
    this.scaleRatio = scaleRatio;
  }

  setData(){
    this.stageData = JSON.parse(localStorage.getItem("stage"));
    this.itemData = JSON.parse(localStorage.getItem("item"));
    this.noStageData=false;
  }
  

  update(deltaTime) {

    if (this.noStageData){this.setData()};

    this.score += deltaTime * this.stageData[this.currentStage-999].scorePerSecond * 0.001;

    if (Math.floor(this.score) >= this.stageData[this.currentStage-999].scoreLimit && this.stageChange[this.currentStage-999]) {
      this.stageChange[this.currentStage-999] = false;
      sendEvent(11, { currentStage: this.currentStage, targetStage: this.currentStage+1, score: this.getScore() });
      this.currentStage++;
    }
  }

  getItem(itemId) {
    this.score += this.itemData[itemId].score;
    sendEvent(4, { itemId: itemId });
  }

  reset() {
    this.score = 0;
    this.currentStage = 1000;
    this.stageChange = [true,true,true,true,true,true,true];
  }

  setHighScore() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    if (this.score > highScore) {
      localStorage.setItem(this.HIGH_SCORE_KEY, Math.floor(this.score));
    }
  }

  getCurrentStage(){
    return this.currentStage;
  }

  getScore() {
    return this.score;
  }

  draw() {
    const highScore = Number(localStorage.getItem(this.HIGH_SCORE_KEY));
    const y = 20 * this.scaleRatio;

    const fontSize = 20 * this.scaleRatio;
    this.ctx.font = `${fontSize}px serif`;
    this.ctx.fillStyle = '#525250';

    const scoreX = this.canvas.width - 75 * this.scaleRatio;
    const highScoreX = scoreX - 125 * this.scaleRatio;

    const scorePadded = Math.floor(this.score).toString().padStart(6, 0);
    const highScorePadded = highScore.toString().padStart(6, 0);

    this.ctx.fillText(scorePadded, scoreX, y);
    this.ctx.fillText(`HI ${highScorePadded}`, highScoreX, y);
  }
}

export default Score;
