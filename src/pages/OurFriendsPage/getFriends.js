import axios from "axios";
const SERVER_NAME = process.env.REACT_APP_SITE_URL;

axios.defaults.baseURL = SERVER_NAME;

const getFriends = async () => {
  const response = await axios.get("friends");
  return response.data;
};

export default getFriends;
