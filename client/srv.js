const express = require('express'),
      favicon = require('express-favicon'),
      path    = require('path');
      port    = process.env.PORT || 8082;
      cors    = require('cors'),
      app     = express();

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(cors());
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () =>
    console.log(` \nEXPRESS STARTED...
     _________
    / ======= \\
   / __________\\
  | ___________ |
  | | -       | |
  | |         | |
  | |_________| |_______><________><________><______
  \\=____________/                              
  / """"""""""" \\      ...LISTENING PORT: ${port}                                
 / ::::::::::::: \\                             
(_________________)
                                                        `)
);