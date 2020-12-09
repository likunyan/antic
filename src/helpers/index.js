import axios from "axios";
import moment from "moment";

/**
 * 判断是否登录过期
 * @return {boolean}
 */
export const isExpired = () => {
  const accessTokenExpiredAt = localStorage.access_token_expired_at;
  return !(
    accessTokenExpiredAt && moment().isBefore(moment.unix(accessTokenExpiredAt))
  );
};

/**
 * 登录
 * @param {object} token
 * @param {object} user
 */
export const logged = (token, user) => {
  localStorage.token = token.token;
  localStorage.access_token_expired_at = moment().unix() + token.expires_in;
  localStorage.userId = user.id;
  localStorage.user_name = user.name;
  localStorage.user_email = user.email;
  axios.defaults.headers.common.Authorization = `Bearer ${token.token}`;
};

/**
 * 注销
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("user_name");
  localStorage.removeItem("user_email");
  localStorage.removeItem("access_token_expired_at");
};

/**
 * 获取主机头（Host）和域名（Domain），如 https://www.example.com/ ，不包含路径（Path）
 * @param {string} url
 * @return {string|boolean}
 */
export const getHost = (url) => {
  const reg = /^(http(?:s):\/\/.*?)(\/|$)/;
  const result = reg.exec(url);

  if (result) {
    return result[0];
  }

  return false;
};

/**
 * 温度转换
 * @param {string} temperature
 * @param {function} convert
 * @return {string}
 */
export function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

/**
 * 转摄氏度
 * @param {string} fahrenheit
 * @return {number}
 */
export function toCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

/**
 * 转华氏度
 * @param {string} celsius
 * @return {number}
 */
export function toFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

/**
 * 微博热度
 * @param {string} value
 * @return {number|string}
 */
export function getPriorityAttribute(value) {
  switch (value) {
    case "低": {
      return 1;
    }
    case "中": {
      return 2;
    }
    case "高": {
      return 3;
    }
    default: {
      return value;
    }
  }
}
