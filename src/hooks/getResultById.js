
export const getResultById = () => {

  const request = async (id) => {
    
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`


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