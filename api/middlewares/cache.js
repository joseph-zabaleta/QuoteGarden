const redisClient = require('../configs/redisConfig');
const { promisify } = require('util');
const getAsyncClient = promisify(redisClient.get).bind(redisClient);

exports.isCached = async (req, res, next) => {

    const { authorName, searchQuery } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const authorId = authorName + "-" + page + "-" + limit;
    const searchId = searchQuery + "-" + page + "-" + limit;

    const reply = await getAsyncClient(authorName ? authorId : searchId);

    if (reply) {

        const response = JSON.parse(reply);
        return res.status(200).json(response);

    } else {

        next();

    };

}

exports.isCachedAll = async (req, res, next) => {

    const { page = 1, limit = 10 } = req.query;

    const allId = "quote" + "-" + page + "-" + limit;

    const reply = await getAsyncClient(allId);

    if (reply) {

        const response = JSON.parse(reply);
        return res.status(200).json(response);

    } else {

        next();

    };
}
