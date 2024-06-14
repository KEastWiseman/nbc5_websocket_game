const items = {};

export const createItem = (uuid) => {
    items[uuid] = [];
}

export const getItem = (uuid, itemId, timestamp) => {
    return items[uuid].push({itemId, timestamp});
}

export const clearItem = (uuid)=>{
    items[uuid] = [];
}