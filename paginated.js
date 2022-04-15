const res = require("express/lib/response");

function paginatedResults(model) {
  return async (req, res, next) => {
    const { page, limit } = req.query;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    result.previous = startIndex > 0 && {
      page: parseInt(page) - 1,
      limit: parseInt(limit),
    };

    // startIndex > 0 &&
    //   function () {
    //     result.previous = {
    //       page: parseInt(page) - 1,
    //       limit: parseInt(limit),
    //     };
    //   };
    result.next = endIndex < (await model.countDocuments().exec()) && {
      page: parseInt(page) + 1,
      limit: parseInt(limit),
    };

    try {
      result.users = await model.find().limit(limit).skip(startIndex).exec();
      res.result = result;

      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = paginatedResults;
