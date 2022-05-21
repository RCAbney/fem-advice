export const getQuote = async (url, setQuote, setFetching) => {
  try {
    setFetching(true);
    const response = await fetch(url);
    const json = await response.json();
    setQuote(json);
    setFetching(false);
  } catch (error) {
    console.log(error);
  }
};
