import Item from "./Item.js";

class ItemController {

    INTERVAL_MIN = 0;
    INTERVAL_MAX = 5000;
    itemData = null;
    itemUnlock = null;
    nextInterval = null;
    curStage = null;
    items = [];


    constructor(ctx, itemImages, scaleRatio, speed) {
        this.ctx = ctx;
        this.canvas = ctx.canvas;
        this.itemImages = itemImages;
        this.scaleRatio = scaleRatio;
        this.speed = speed;
        this.nextInterval = this.getRandomNumber(this.INTERVAL_MIN,this.INTERVAL_MAX);
        
    }

    setNextItemTime(currentStage) {
        (currentStage) ? this.curStage = currentStage-1000 : this.curStage = 0;
        this.nextInterval = this.getRandomNumber(
            this.INTERVAL_MIN,
            this.INTERVAL_MAX,
        )/this.itemUnlock[this.curStage].spwan_time;
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    createItem(currentStage) {
        const index = this.getRandomNumber(0, +this.itemUnlock[currentStage-1000].item_limit_id);
        console.log(`creadted id ${index}`);
        const itemInfo = this.itemImages[index];
        const x = this.canvas.width * 1.5;
        const y = this.getRandomNumber(
            10,
            this.canvas.height - itemInfo.height
        );

        const item = new Item(
            this.ctx,
            itemInfo.id,
            x,
            y,
            itemInfo.width,
            itemInfo.height,
            itemInfo.image
        );

        this.items.push(item);
    }

    update(gameSpeed, deltaTime, currentStage) {
        if(!this.itemData){
            this.itemData = JSON.parse(localStorage.getItem("item"));
        }
        if(!this.itemUnlock){
            this.itemUnlock = JSON.parse(localStorage.getItem("item_unlock"));
        }

        if(this.nextInterval <= 0) {
            this.createItem(currentStage);
            this.setNextItemTime(currentStage);
        }

        this.nextInterval -= deltaTime;

        this.items.forEach((item) => {
            item.update(this.speed, gameSpeed, deltaTime, this.scaleRatio);
        })

        this.items = this.items.filter(item => item.x > -item.width);
    }

    draw() {
        this.items.forEach((item) => item.draw());
    }

    collideWith(sprite) {
        const collidedItem = this.items.find(item => item.collideWith(sprite))
        if (collidedItem) {
            this.ctx.clearRect(collidedItem.x, collidedItem.y, collidedItem.width, collidedItem.height)
            return {
                itemId: collidedItem.id
            }
        }
    }

    reset() {
        this.items = [];
    }
}

export default ItemController;