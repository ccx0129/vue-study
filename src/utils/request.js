import axios from "axios";
import { notification } from "ant-design-vue";
function request(options) {
  return axios(options)
    .then(res => {
      return res;
    })
    .catch(error => {
      const {
        response: { status, statusText }
      } = error;
      notification["error"]({
        // eslint-disable-next-line no-unused-vars
        message: h => (
          <div>
            请求错误<span style="color:red">{status}</span>：{options.url}
          </div>
        ),
        description: statusText
      });
      //出现异常直接处理了，避免在获取response.data时需要进一步对数据做合法性的校验(当然也可以在获取data时采用catch处理)
      return Promise.reject(error);
    });
}

export default request;
