const getRandomEntry = async (Model) => {
  const count = await Model.countDocuments();
  const random = Math.floor(Math.random() * count);
  const randEntry = await Model.findOne().skip(random).exec();
  return randEntry;
};
module.exports = getRandomEntry;
