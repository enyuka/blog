# Chrome拡張機能でTwilioを使う

こんにちは。
Chrome拡張機能って便利ですよね。
個人的にはvimiumとtabby catの拡張機能が手放せないです。

そんな便利な拡張機能ですが、実はTwilioも使えます。
なぜかというと、拡張機能もWebサイトだからです。
Webサイトである以上、JavaScriptも使えるし、
JavaScriptが使えるならTwilio Clientも使えますね。

実際にTwilio社の方のものと思われるGithubリポジトリもありますし、
電話ができる拡張機能は探せば実は何件かあります。
今回はChrome拡張機能とTwilio連携についてまとめました。

## 手っ取り早くコードが見たい人向け

このGithubを見てください。

簡単でしょう。
よく分からないって人も安心してください。
順に説明していきます。

## そもそもChrome拡張機能の開発方法は？

参考サイトはいくつかあります。
詳細はここ読んでもらいたいです。

ここで押さえるべきは下記点です

* Page Action(拡張機能アイコンを押したときに開くアレ)は開いている間だけ有効
* Backgroundはバックグラウンド上でメモリを保持する設定にすれば、ずっと有効
* Content Scriptはmanifestで指定したURL形式にマッチするサイトに対して、スクリプトを挿入する
* 上記3つはIsolated Worldと呼ばれ、独立している
* 各世界にはchrome.runtime.sendMessageでメッセージングすることで互いに情報伝達などが可能

## どうやってChrome拡張機能で実現するのか？

拡張機能が持っているIsolated Worldの特徴から
ソフトフォンでよくある仕様は下記のように割り振りすることで、
機能を満たすことが出来ます。

* 電話番号入力して電話がしたい
  * Page Actionの責務
* 待受状態にしておいて、電話を受け取りたい
  * Backgroundの責務
* 見ているWebページ上の電話番号を押すと、電話がかかるようにしたい（クリックトゥコール）
  * Content Scriptの責務

これらがわかった上で、Githubにある各ディレクトリを見ていくと、
どうしてこういう構造になっているかわかりやすいと思います。
順に説明します。

### ディレクトリ構造

#### pagesディレクトリ

Page ActionとBackgroundの世界を表示するための単純なHTMLファイルです。
Content Scriptは見ているWebページ上にスクリプトを挿入する性質上、
HTMLファイルは持っていません。

#### js/background, js/page_action, js/content_scriptディレクトリ

各世界の機能を実装するためのJavaScriptファイルを置くためのディレクトリです。
単純にmain.jsという名前で主機能の実装をしていきます。

また、ある世界から別の世界へメッセージングするためのsendMessage.js、
別の世界からのメッセージングを受け取るためのreciveMessage.jsを用意しました。
別ファイルに分ける必要もないと言えばないのですが、
分けておいたほうが保守性や可読性などが高まるので分けてあります。
今回用意したのはかなり単純な仕様なので、
ありがたみがあまり感じられないかもしれませんが、
保留・取次の機能や通話時間の表示など、
仕様が増えれば増えるほど、各世界ごとのメッセージングが増えるので、
予め分けておいたほうがベターです。

#### js/libraryディレクトリ

twilio.jsやjquery.jsなどを入れておくディレクトリです。
世界を横断して使われるユーティリティ機能も、ここに入れておいても良さそうです。

## 電話番号入力して電話がしたい

Page Actionの責務ですね。