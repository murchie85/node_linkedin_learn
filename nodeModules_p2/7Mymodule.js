let count = 0;

/*
const inc      = function (){++count};
const dec      = function (){--count};
const getCount = function (){ return count };
*/



const inc = () => ++count;
const dec = () => ++count;
const getCount = () => count;

module.exports = {
    inc,
    dec,
    getCount
};