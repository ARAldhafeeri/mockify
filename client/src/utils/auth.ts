import Cookies from "js-cookie";
import decode, {JwtPayload} from "jwt-decode";

export const checkForExpiredToken = () => {
  let token = Cookies.get("token");
  if (token) {
    const currentTimeInSeconds = Date.now() / 1000;
    const user : {exp : number}= decode(token);
    if (user.exp >= currentTimeInSeconds) {
      return "";
    };
  };
  return token
}