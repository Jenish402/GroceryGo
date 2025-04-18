const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (req, res) => {
  createProxyMiddleware({
    target: 'https://grocerygo-04e2.onrender.com', // Your backend URL
    changeOrigin: true,
    pathRewrite: { '^/api': '' }, // Remove /api prefix
    onProxyReq: (proxyReq, req) => {
      // Forward cookies
      if (req.headers.cookie) {
        proxyReq.setHeader('Cookie', req.headers.cookie);
      }
    },
  })(req, res);
};