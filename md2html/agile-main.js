if (process.argv.length <= 2) {
  console.error("変換対象のファイルパスを指定してください");
  return;
}

const filepath = process.argv[2];
const fs = require("fs");
const text = fs.readFileSync(filepath, "utf8");

const marked = require("marked");
marked.setOptions({
  renderer: new marked.Renderer(),
  // GitHub Flavored Markdownの書き方を有効にする
  gfm: true,
  // Single Line改行を有効にする
  breaks: true,
  // h1とかにidが振られるのを無効にする
  headerIds: false,
});
let result = marked(text);

// マークダウンのコードをWordpressのEnlighterが効くようにHTMLタグを置換する処理
const regex1 = /<pre><code>/g;
result = result.replace(regex1, '<pre class="EnlighterJSRAW" data-enlighter-language="generic">');
const regex2 = /<\/code><\/pre>/g;
result = result.replace(regex2, '</pre>');

// h1 の後ろに挨拶をつける
const regex4 = /<\/h1>/;
result = result.replace(regex4, `</h1>
<p>こんにちは、<a href="https://twitter.com/LpgUJuCJ4VaneQg">アジャラン</a>です。</p><br>`);

// 締めの言葉をつける
result = `${result}<br>
<p>参考になったら下の Share ボタン、<a href="https://twitter.com/LpgUJuCJ4VaneQg"> Twitter のフォロー</a>をお願いします！</p>`;

// クリップボードにコピー
const clipboardy = require('clipboardy');
clipboardy.writeSync(result);
