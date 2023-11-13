import axios from "axios";

  const axiosFn = async (url, method, request) => {
    let response;
    const BASEURL = `http://localhost:4500${url}`;
    const token = localStorage.getItem('_token');

    try {
        switch (method) {
            case 'get':
                response = await axios.get(BASEURL, { headers: { Authorization: `Bearer ${token}` } });
                break;
            case 'put':
                response = await axios.put(BASEURL, request, { headers: { Authorization: `Bearer ${token}` } });
                break;
            case 'post':
                response = await axios.post(BASEURL, request, { headers: { Authorization: `Bearer ${token}` } });
                break;
            case 'delete':
                response = await axios.delete(BASEURL, { headers: { Authorization: `Bearer ${token}` } });
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }
    } catch (e) {
        console.error(e);
    }

    return response;
};
export default axiosFn;