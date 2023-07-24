function publicContoller(app) {

  app.get('/api/public/types/:name', (req, res) => {
    const { name } = req.params;

    const file = __dirname + '/../../public/types/' + name;

    res.download(file); // Set disposition and send it.
  });

  app.get('/api/public/sprites/:name', (req, res) => {
    const { name } = req.params;

    const file = __dirname + '/../../public/sprites/' + name;

    res.download(file); // Set disposition and send it.
  });
}

module.exports = {
  publicContoller,
};
