// client/api/proxy.js
// const { createProxyMiddleware } = require('http-proxy-middleware');
import createProxyMiddleware from 'http-proxy-middleware'

module.exports = (req, res) => {
  createProxyMiddleware({
    target: 'https://grocerygo-04e2.onrender.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
    onProxyReq: (proxyReq, req) => {
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
  })(req, res);
};