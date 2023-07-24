const { randomUUID } = require('crypto'); 

function spriteController(app) {

  app.get('/api/sprite/:name', (req, res) => {
    const { name } = req.params;

    const file = __dirname + '/../../uploads/' + name;

    res.download(file); // Set disposition and send it.
  });

  app.post('/api/sprite', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(422);
      res.json({ file: 'No files were uploaded.' });
      return;
    }

    const file = req.files.file;

    const name = randomUUID() + '-' + file.name;

    const uploadPath = __dirname + '/../../uploads/' + name;

    file.mv(uploadPath, function (err) {
      if (err) {
        res.status(500);
        res.json({ file: 'Something went wrong.' });
        return;
      }

      res.status(201);
      res.json({ url: "http://localhost:3000/api/sprite/" + name });
    });
  });
}

module.exports = {
  spriteController,
};
