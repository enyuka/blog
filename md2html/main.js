if (process.argv.length <= 2) {
  console.error("変換対象のファイルパスを指定してください");
  return;
}

const filepath = process.argv[2];
const marked = require("marked");
const fs = require("fs");
marked.setOptions({
  renderer: new marked.Renderer(),
  // GitHub Flavored Markdownの書き方を有効にする
  gfm: true,
  // Single Line改行を有効にする
  breaks: true,
  // h1とかにidが振られるのを無効にする
  headerIds: false,
});

const text = fs.readFileSync(filepath, "utf8");
console.log(marked(text));
