import { validateToken } from "../api/clientAPI";

export async function checkToken(navigate, client, setClient) {
  const clientStorage = JSON.parse(localStorage.getItem("client"));

  const { token, imageProfile } = clientStorage;

  if (token && imageProfile) {
    const body = null;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await validateToken(body, config);

    if (response === 200) {
      setClient({ ...client, token, imageProfile });
      navigate(`/${client.page}`);
    } else {
      localStorage.removeItem("client");

      navigate("/");
    }
  } else {
    navigate("/");
  }
}
