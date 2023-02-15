
export const getResultByCriteria = () => {

  const request = async (criteria, keywords) => {
    let url;
    let flag = 'c';
    let searchKey = keywords.replace(/ /g, "_")

    if (criteria === 'Ingredients') {
      flag = 'i'
    } else if (criteria === 'Country') {
      flag = 'a'
    }

    if (criteria === "Random meal") {
      url = "https://www.themealdb.com/api/json/v1/1/random.php"
    } else {
      url =`https://www.themealdb.com/api/json/v1/1/filter.php?${flag}=${searchKey}`
    }


    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch(e) {
      throw e;
    }
  };

  return {request}
}