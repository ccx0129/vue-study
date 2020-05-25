// vue.config.js
module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  //例如对于浏览器请求，你想要提供一个 HTML 页面，但是对于 API 请求则保持代理
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        //changeOrigin: true,
        bypass: function(req, res) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          }
          //path请求的（mock环境请求）
          else if (process.env.MOCK !== "none") {
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            //const name = "form";
            const mock = require(`./mock/${name}`);
            const result = mock(req.method);
            //清除缓存，确保每次请求过来都可以生效,新的请求时都可以拿到最新的数据

            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
