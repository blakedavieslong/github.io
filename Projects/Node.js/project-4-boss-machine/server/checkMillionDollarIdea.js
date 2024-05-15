const checkMillionDollarIdea = (req, res, next) => {
    const weeks = Number(req.body.numWeeks);
    const rev = Number(req.body.weeklyRevenue);
    if (weeks && rev) {
        const total = weeks * rev;
        if (total >= 1000000) {
            next();
        } else {
            res.status(400).send('Idea\'s value too low.');
        }
    } else {
        res.status(400).send('Number of weeks and weekly revenue are required numbers.');
    } 
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
