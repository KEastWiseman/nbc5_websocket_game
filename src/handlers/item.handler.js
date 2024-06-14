import { getGameAssets } from '../init/assets.js';
import { getItem } from '../models/item.model.js';

export const getItemHandler = (userId, payload) => {

    const { items } = getGameAssets();
    const serverTime = Date.now();
    // 도전, 특정 스테이지에 가능한 아이템인지 검증 필요

    // 실제로 있는 아이템인가
    if(!items.data.some((item)=>item.id === payload.itemId)){
        return {status : 'fail', message: `Invalid item ${payload.itemId}`}
    }

    getItem(userId,payload.itemId,serverTime);

    return { status : "success", message: `Get Item No.${payload.itemId}`};
}