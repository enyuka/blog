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

// 最初のh2の上にmoreタグを付けて、続きを読むをつける
const regex3 = /<h2>/;
result = result.replace(regex3, '<!--more--><h2>');

// h1 の後ろに挨拶をつける
const regex4 = /<\/h1>/;
result = result.replace(regex4, `</h1>
<p>こんにちは、<a href="https://twitter.com/24guchia">@24guchia</a>です。</p><br>`);

// 締めの言葉をつける
result = `${result}<br>
<p>参考になったら下のツイートや Share ボタン、<a href="https://twitter.com/24guchia">フォロー</a>をお願いします！</p>`;

// クリップボードにコピー
const clipboardy = require('clipboardy');
clipboardy.writeSync(result);
