function fetchCountries(searchQuery) {
  const url = `https://restcountries.eu/rest/v2/name/${searchQuery}`;

  return fetch(url).then(response => {
    if (!response.ok) {
      throw response;
    }
    return response.json();
  });
}

export default { fetchCountries };
