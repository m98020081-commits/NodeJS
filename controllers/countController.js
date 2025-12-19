let paintings = require('../data/paintingsData');
const countPainting = (req,res) => {
    const totalCount = paintings.length;
    res.json(
        totalCount
    );
};


module.exports = {
 countPainting
};
