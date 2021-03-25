const getRequest = async (url) => {
  let data = await fetch(url)
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log('Error: ', err);
    });
  return data;
};

export default getRequest;
