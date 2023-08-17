import axios from "axios"

export const postData = async (url, data, token) => {
   try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/${url}`, data, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return response.data;
   } catch (error) {

   }
}

export const getData = async (url) => {
   try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/${url}`);
      return response.data;
   } catch (error) {

   }
}

export const deleteData = async (url, token) => {
   try {
      const response = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/v1/${url}`, {
         headers: {
            Authorization: `Bearer ${token}`
         }
      });
      return response.data;
   } catch (error) {

   }
}