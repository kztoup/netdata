const baseApiUrl = 'https://api.coingecko.com/api/v3';

const getCoins = async (size, page) => {
  try {
    const response = await fetch(
      `${baseApiUrl}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${size}&page=${page}&sparkline=false`
    );

    if (response.ok) {
      return response.json();
    } else {
      throw response.status;
    }
  } catch (error) {
    throw error ?? 'Error';
  }
};

const getCoinDetails = async (id) => {
  try {
    const response = await fetch(
      `${baseApiUrl}/coins/${id}`
    );

    if (response.ok) {
      return response.json();
    } else {
      throw response.status;
    }
  } catch (error) {
    throw error ?? 'Error';
  }
};

const getPriceChart = async (id, days) => {
  try {
    const response = await fetch(
      `${baseApiUrl}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
    );

    if (response.ok) {
      return response.json();
    } else {
      console.log(response);
      throw response.status;
    }
  } catch (error) {
    throw error ?? 'Error';
  }
};


export {
  getCoins,
  getCoinDetails,
  getPriceChart
};
