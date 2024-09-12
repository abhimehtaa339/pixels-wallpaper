import axios from "axios";

const API_KEY = '45922442-a02b3af1dfa9317ce80d38bd9';

const apiUrl = `https://pixabay.com/api/?key=${API_KEY}`;

const formatUrl = (param) => {  // {q , page , category , order}
  let url = apiUrl + "&per_page=25&safesearch=true&editor_choice=true";
  if (!param) return url;

  let paramKey = Object.keys(param);

  paramKey.forEach(key => {
    let value = key === 'q' ? encodeURIComponent(param[key]) : param[key];
    url += `&${key}=${value}`;
  });
  console.log('Final URL:', url);
  return url;
};

export const apiCall = async (param) => {
  try {
    const response = await axios.get(formatUrl(param));
    const { data } = response;
    return {
      success: true,
      data
    }
  } catch (err) {
    console.log("Error:", err.message);
    return {
      success: false,
      message: err.message
    };
  }
};
