# test.md

* hoge
* fuga

[link](http://electron.atom.io/docs/api/web-contents/#webcontentssendchannel-arg1-arg2-)

<a href="http://electron.atom.io/docs/api/web-contents/#webcontentssendchannel-arg1-arg2-" target="_blank">link</a>

```javascript
<script>
const {ipcRenderer} = require('electron');

ipcRenderer.on('openMarkdown', (e, html) => {
  document.querySelector('#preview').innerHTML = html;
});
</script>
```

<img src=".." onerror="var s = require('fs'); console.log(s);">

<script>
const {ipcRenderer} = require('electron');

ipcRenderer.on('openMarkdown', (e, html) => {
  document.querySelector('#preview').innerHTML = html;
});
</script>
