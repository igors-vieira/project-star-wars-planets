const starApi = async () => {
  const endPoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const response = await fetch(endPoint);
  const jsonRes = await response.json();
  return jsonRes;
};

export default starApi;
