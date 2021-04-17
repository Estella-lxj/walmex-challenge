'use strict';
const _ = require('lodash');
const db = require('./db.js');


// UTILS
//----------------
// This is a mock db call that waits for # milliseconds and returns
const mockDBCall = (dataAccessMethod) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(dataAccessMethod());
        }, 500);
    });
};

// MOCK DB CALLS
//----------------
const getUsers = () => {
    const dataAccessMethod = () => _.map(db.usersById, userInfo => userInfo);
    return mockDBCall(dataAccessMethod);
};

const getListOfAgesOfUsersWith = (item) => {
    const dataAccessMethod = () => {
        // fill me in :)

        // filter users which includes the item and count their age
        const agesCount = {};
        const usersIncludeItem = _.filter(db.usersById, userInfo => {
            const username = userInfo.username;
            return db.itemsOfUserByUsername[username].includes(item);
        }).forEach(userInfo => {
            const age = userInfo.age;
            agesCount[age] = agesCount[age] + 1 || 1;
        });

        // format the ages count into a list of objects and each objects has two properties age and count
        const agesCountFormat = [];
        Object.entries(agesCount).forEach(([k, v]) => {
            agesCountFormat.push({ age: k, count: v });
        })
        return agesCountFormat;
    }
    return mockDBCall(dataAccessMethod);
}

module.exports = {
    getUsers,
    getListOfAgesOfUsersWith
};

