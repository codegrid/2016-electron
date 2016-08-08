(function() {
  const $preview = document.querySelector('#preview');
  const $searchInput = document.querySelector('.search-input');
  const $searchCount = document.querySelector('.search-count');

  var prevText = '';
  function findInPage(text, forward) {
    let findNext = false;
    // 文字が入力されてない場合には検索を止める
    if (text === '') {
      prevText = '';
      stopFindInPage();
      return;
    }

    // 前回と同じ文字列の検索の場合は次に進む
    if (text === prevText) {
      findNext = true;
    }
    // 前回と違う場合には先頭から検索する
    else {
      prevText = text;
    }

    $preview.findInPage(text, {findNext, forward});
  }

  function stopFindInPage() {
    $preview.stopFindInPage('clearSelection');
    $searchCount.textContent = '';
  }

  var current = '';
  $preview.addEventListener('found-in-page', ({result}) => {
    const {activeMatchOrdinal, finalUpdate, matches} = result;

    // マッチした件数の何番目かを保持
    if (activeMatchOrdinal) {
      current = activeMatchOrdinal;
    }

    // 検索処理が終わったら
    if (finalUpdate) {
      // マッチしない場合はリセット
      if (matches === 0) {
        current = 0;
      }
      // 何番目か/マッチした件数 を表示する
      $searchCount.textContent = `${current}/${matches}`;
    }
  });

  $searchInput.addEventListener('keydown', (e) => {
    // Shiftキーが押されてる場合は後ろ方向に検索する
    var forward = !e.shiftKey;
    var text = $searchInput.value;

    switch(e.code) {
      // 検索の開始
      case 'Enter':
        findInPage(text, forward);
        break;

      // 検索の終了
      case 'Escape':
        stopFindInPage();
        break;
    }
  });
})();
