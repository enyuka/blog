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

// クリップボードにコピー
const clipboardy = require('clipboardy');
clipboardy.writeSync(result);
