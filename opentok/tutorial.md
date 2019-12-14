# OpenTokのチュートリアルやってみた

こんにちは、[@24guchia](https://twitter.com/24guchia)です。
入社エントリーにある通り、bellFaceに入社しました。
TODO URL貼る

bellFaceはOpenTokを使っているので、
チュートリアルをニート期間中にやってみましたのでまとめておきます。
なお、内容は執筆時点（2019年10月25日）のもののため、
最新の情報はドキュメントを参照してください。

## 開発&動作確認環境

* macOS mojave 10.14.6
* Chrome latest
* Android 10
* iOS 11.3
* Node.js 11.14.0
* express 4.16.1

## Fast Track

[https://tokbox.com/developer/tutorials/](https://tokbox.com/developer/tutorials/)

上記チュートリアルの画面左側にFast Trackというのがあり、
使用したい機能をチェックしていくと、
opentokをすばやく学ぶための
取捨選択と学ぶ順番を決めてくれるのでこれを使いました。

http://harinoma.info/wp-content/uploads/2019/10/ss-2019-10-25-11.17.20.png

↑これがこうじゃ↓

http://harinoma.info/wp-content/uploads/2019/10/ss-2019-10-25-11.17.39.png

進捗が出るのと、Sectionをいくつかに分けてくれるのが便利ですね。

僕が選んだ回答だと、Sectionは4つに分かれました。
1. Learning the OpenTok platform
2. Setting up your Web client and server
3. Adding Web features
4. Maintaining your Web app

### ありがたいと思ったが・・・

書き始めた時はありがてえ〜と思ったのですが、
Fast Trackで抽出されたドキュメント同士には
特につながりがないのがいまいちだなと感じました。
たとえば、Section1で書いたコードを拡張して、
Section2でどうこうするのかと思いきや、
特に関連性はなく作り直しです。

多少過剰でも、一連のチュートリアルがあると
楽だなーと思います。

## Learning the OpenTok platform

いわゆるハローワールド系のセクションです。

[https://tokbox.com/developer/embeds/](https://tokbox.com/developer/embeds/)

tokboxのフリーアカウントを作成し、
管理画面でNew Projectsを作成。
Video Chat Embedのテンプレートを選択すると、
プロジェクト名と埋め込むウェブサイトのURLを指定する
ダイアログが出るのでとりあえず埋めていきます。
そうすると、ビデオチャット用の
iframeとscriptがコピーできるようになるので、
それを指定したURLに埋め込むとビデオチャットが表示されます。

http://localhost を指定して、expressで3000ポート開いてたら、
下記エラーが出ました。
`Something's not quite right.`

TODO 画像貼る

ポートまで指定すると直ります。
ちゃんと動くとこんな感じのビデオチャットが表示されます。

TODO 画像貼る

### ngrokでスマホとビデオチャット

localhostだと、起動しているMacでしか動作確認できないので、
とりあえずngrokで公開し、手元のスマホとビデオチャットしました。
[https://ngrok.com/](https://ngrok.com/)

ngrokはローカル環境をセキュアに外部に公開してくれる
サービスで、WebRTC関連だとよくお世話になるサービスです。
localhostを3000ポートで開いている時は、
下記みたいなコマンドを実行するとngrokで外部に公開できます。
```
./ngrok http 3000
```

手元のMacとスマホ(Android)でビデオチャットすると、
こんな感じになります。

TODO 画像貼る

上の画像の大きく出てるのがスマホから撮っている動画で、
小さくワイプで右上に表示されてるのはMacで撮っている動画です。

帽子かぶってるのはなんとなく恥ずかしいからです。
WebRTCのデバッグ（特にこういうビデオ）でつらいところは、
2画面に自分が映るっていうのがなんと言ってもつらいですね。
自分の顔を見て何が楽しいのか。

とりあえずビデオチャットをウェブサイトに埋め込み出来ました。
めっちゃ簡単にできていいですね。

### iframe vs script

iframeとscriptの埋め込みタグをtokboxが発行してくれますが、
どちらでも動きます。

[https://tokbox.com/developer/embeds/](https://tokbox.com/developer/embeds/)

おすすめはscript埋め込みで、
理由はSafariでiframeからマイクとカメラにアクセスできないから
と上記ドキュメントに記述がありました。

が、実際にiframeで試したところ、
普通にMac,iPhoneのSafariでも動きました。
[https://bugs.webkit.org/show_bug.cgi?id=182638](https://bugs.webkit.org/show_bug.cgi?id=182638)
Webkitのバグチケットに関係ありそうなバグが解決済みとあるので、
ドキュメントが古いかも。

なので、script,iframe,どっちでもいいんじゃないですかね（適当）
僕は一旦、iframeでやりました。

### Routed vs Relayed

tokboxの管理画面でセッションを作成するときに、
MediaModeをRoutedかRelayedを選択できます。
下記ドキュメントから概要を抜粋し、違いを列挙しておきます。
[https://tokbox.com/developer/guides/create-session/](https://tokbox.com/developer/guides/create-session/)

#### Relayed

* P2P接続する
* P2Pがファイアーウォールなどで接続できない場合、opentokのTURNサーバを経由する
* レイテンシーがRoutedより少ない

デフォルトではRelayedを利用します。
TURNサーバってだいたい追加でお金かかったりするけど、
opentokが用意してくれるデフォルト設定だと無料みたいですね。
Configurable TURNは$1000/monthなので、
安くはないけど、デフォルトのTURNだと達成できないことも
金の力で解決できるのはいいと思います。
[https://tokbox.com/pricing/plans](https://tokbox.com/pricing/plans)

#### Routed

* OpenTok Media Router(SFU)を経由する
* 帯域幅利用がRelayedより少なく出来る
* 録画機能が使える
* SIPが使える
* レイテンシーがRelayedより多い

OpenTok Media Routerを使う場合はこちら。
Relayedよりレイテンシーが増える代わりに、
機能が多いのが特徴です。

RelayedとRoutedどっち選ぶかは、
参加者が3人までかつ、録画などを使用しない場合はRelayed。
参加者が3人より多くなったり、録画やSIPを使う場合は
Routedを使うのが推奨されています。

P2Pだと時間課金が難しくなるので、
社内向けWeb会議システムをスクラッチで作るとかでない限りは、
基本的にはRouted使うことなりそうです。

### チャットルームを分ける

iframeの`room`部分を
クエリストリングで部屋を変えるようにしました。

```
<iframe src="https://tokbox.com/embed/embed/ot-embed.js?embedId=1375a69b-c0c7-49e6-b68a-xxxxxxxxxxxx&room=#{room}&iframe=true" width="800px" height="640px" scrolling="auto" allow="microphone; camera"></iframe>
```

## Setting up your Web client and server

クライアント、サーバサイドについて、
一通り学ぶセクションです。
サンプルコードがいまいちだったので、
とりあえず下記GitHubに
自分が気に入る形で書き直しました。

下記機能を作ってみました。
* 1対1ビデオ通話
  * Pubのリンクを押すと発信者がセッション作成して、ランダムに4桁の番号を発行する
  * Subの下にある入力フォームに4桁の番号を入力し、送信。4桁の番号が存在する場合、そのセッションに参加して、ビデオ通話が始まる
  * （どっかで[聞いたことある仕様](https://bell-face.com/)）
* 画面共有
  * 画面共有ボタンを押すと画面共有が始まります。共有を終了させる方法は実装してません
* 録画
  * 録画開始と終了

画面共有、録画については次のセクションで学びます。

TODO GithubURL貼る

エラーハンドリングとかセキュリティ、
セッション保持の方法などめっちゃ適当なので、
ご参考程度までにしてください。

## Adding Web features

Web版ならでの追加機能について学ぶセクションです。

### Screen Sharing

[https://tokbox.com/developer/guides/screen-sharing/js/](https://tokbox.com/developer/guides/screen-sharing/js/)

動画通話中にアプリなどの画面を相手側に共有する機能が
デフォルトで使えます。資料共有とかで使えそう。

#### 画面共有のブラウザサポート状況

利用可
* Chrome latest
* Firefox latest

条件付きで利用可
* Chrome バージョン72より前
* Firefox バージョン52より前
* IE
* Opera
拡張機能をインストールする必要があります。
ChromeとFFは相当古いバージョンなので、
あまり気にする必要はなさそうです。

利用不可
* Safari
* Edge

画面共有に限らず、SafariはWebRTC独自路線を突き進んでいるので、
なかなか標準サポートが難しそうですね。
EdgeはChromiumベースになるし、
すでにベータ版のインストールも可能なので、
近々使えるようになるでしょう。

### Archiving

[https://tokbox.com/developer/guides/archiving/](https://tokbox.com/developer/guides/archiving/)

録画機能です。
Media ModeをRoutedにしないと利用できません。

標準ではTokBoxのアカウントに録画ファイルがひも付き、
S3やAzure Containerにも設定可能です。
また、音声＋動画、音声のみ、動画のみも選択可能。

容量減らしたいとか、
音声文字起こしするときは動画部分が無駄だから不要で、
そういうケースは音声のみにするとかなのかな。

### Maintaining your Web app

デバッグとセキュリティの推奨設定、
opentokの接続テストページや
インスペクターなどについて学ぶセクションです。

[インスペクター](https://tokbox.com/developer/tools/inspector_doc/)のデザインがなかなかきれいで、
見やすそうですね。
運用でにらめっこすることになりそう。

## デバッグした感じ

WebRTCやる人ならみんな見る、
chrome://webrtc-internalsをビデオ通話中に見ました。

* 音声コーデック: Opus
* 動画コーデック: VP8

この辺は普通ですね。
ただ一点気になったところが、
なんとSDPはまだPlanBを使っていました

TODO 画像貼る

_なん・・・だと・・・_

### PlanBを未だに使っている

[https://support.tokbox.com/hc/en-us/articles/360029734451-Change-to-SDP-Unified-Plan-in-Chrome](https://support.tokbox.com/hc/en-us/articles/360029734451-Change-to-SDP-Unified-Plan-in-Chrome)

この記事ではUnified Planは将来やる的なことが書いてありますが、
PlanBの削除は2020年の1Q中に予定されています。
間に合うのだろうか・・・

[https://bugs.chromium.org/p/chromium/issues/detail?id=857004](https://bugs.chromium.org/p/chromium/issues/detail?id=857004)

PlanB使用率が3〜4%で、ちょっと見直す的なこと書いてあるので、
もしかしたら予定は伸びるかも？
ただ、PlanB削除に間に合わなくて
Chromeでopentokが使えなくなる！ってなったら恐ろしい。

## チュートリアルやってて気になったところ

### シグナリングはWebSockets

[https://tokbox.com/developer/guides/basics/#connection](https://tokbox.com/developer/guides/basics/#connection)
シグナリングがWebSocketsっていまいちだよねって
たまに聞くので少し気になった。
何が正解かはわかっていない。

### ドキュメントにそごが合ったりする

jsファイルをコピーせよ→
コピーしたjsファイルにホニャララってコメントの下にjsコードをペーストせよ
→いや、そんなコメントないけど・・・←イマココ

まあ、チュートリアルドキュメントにそごがあるのは
よくある話ですが、初心者の方はハマりそうですね。

### ドキュメントのリンクがなぜか新しいタブで開けない

詳しくは別のドキュメントを見ろ→
⌘押しながらリンククリック→
なぜか新しいタブで開かない→
戻るとページトップに戻るので、どこまで読んだか再度探す必要がある。

右クリックして`新しいタブで開く`を選ぶと新しいタブで開くけど、
コンテキストメニューから選ぶのめんどくさいんですよね。
なぜなのか。

### ドキュメントが全編英語でお送りされる

Twilioで慣れっこだからいいんだけど、
日本マーケットに注力するつもりはなさそうな気がする。

### ES対応してない書き方

チュートリアルのGitHub見ると、
最後のコミットが数年前だったりするので、
書き方が古いまま。

### チュートリアルのGitHubのコーディングがとっ散らかってる

テンプレートファイルがejsだったり、jadeだったり。
APIキーを静的にJSファイルに書かせたり、
環境変数に書かせたり、envファイルに書かせたり。
jadeって2016年にpugに変わったらしいが、未対応・・・

### ドキュメントが見つけづらい

GitHubや下記ドキュメントなどが検索すると出てくるけど、
引数の取り得る値や戻り値などが網羅されている
ドキュメントが見つからないですね。
[https://tokbox.com/developer/](https://tokbox.com/developer/)

## まとめ

チュートリアルを一通りやって、
自分が気に入る形で書き直したので、それなりの理解が得られました。
動画はTwilio Videoを触ってなかったので、
初めての領域ですが、Voiceの知識が流用できそうで
ひとまず安心しました。

というわけで、opentokを完全に理解した。
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">エンジニア用語の「完全に理解した」「何も分からない」「チョットデキル」は「ダニング・クルーガー効果」で簡単に説明ができます。これは一種の認知バイアスで能力の低い段階では自分の能力の低さを認識できないためです（過大評価しがち）。その反面で能力が高くなると過少評価しがちです。 <a href="https://t.co/LGaJ4E5hWo">pic.twitter.com/LGaJ4E5hWo</a></p>&mdash; おちゃめ (@ochame_nako) <a href="https://twitter.com/ochame_nako/status/1115270046794653696?ref_src=twsrc%5Etfw">April 8, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>