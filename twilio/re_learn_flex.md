# Twilio Flexを再度学習したまとめ

こんにちは、[@24guchia](https://twitter.com/24guchia)です。
題名の通り、Twilio Flexについて再度学習したので、
学びなどのまとめです。

## なんで再度学習をしたか？

Twilio Flexを実務でできる人が少ない(観測範囲内)からです。
今、多分こんな感じです。

Twilio Flexでコンタクトセンター立ち上げたい会社 >>> Twilioできる人 >>>>>>> Twilio Flexできる人（いるのか？）

僕はTwilioチョットデキルと思うのですが、
Flexは本当によくわかってないので、
市場価値を上げるために学習をしました。
1ヶ月ニートしてるのも、この辺勉強するためと言っても過言ではない。

## Flexについて改めて

以前、こんな記事を書きました。
http://harinoma.info/?p=80

改めて読み直しても、今と変わらず、
だいたい言いたいことはこの記事に書いてある通りです。
ただ、これはコンセプトに関してしか書いてない。

コンセプトの理解は1年以上経ったため、
おそらく導入検討している人は理解していると思うので、
改めて書き直すことはないです。

## Flexの技術的な話

Twilioの各プロダクトをひとまとめのパッケージにして、
UIをReactで提供し、Flexという名前をつけたプロダクトです。

> UIをReact

う〜ん、Twilioの各プロダクトは多分だいたい分かるけど、
Reactはわからない。

### Reactのチュートリアルをやる

[https://github.com/enyuka/react_tutorial](https://github.com/enyuka/react_tutorial)

Reactのことはよく分かってなかったので、
Reactチュートリアルをやりました。

[チュートリアル末に機能改修案](https://ja.reactjs.org/tutorial/tutorial.html#wrapping-up)が書いてあるので、
それもこなしています。
とりあえずの写経と、機能改修毎でコミットを分けたので、
機能改修をどうやって実現したかがわかりやすいようにしてあります。

Reactを完全に理解したので、Flexの勉強に戻りましょう。
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">エンジニア用語の「完全に理解した」「何も分からない」「チョットデキル」は「ダニング・クルーガー効果」で簡単に説明ができます。これは一種の認知バイアスで能力の低い段階では自分の能力の低さを認識できないためです（過大評価しがち）。その反面で能力が高くなると過少評価しがちです。 <a href="https://t.co/LGaJ4E5hWo">pic.twitter.com/LGaJ4E5hWo</a></p>&mdash; おちゃめ (@ochame_nako) <a href="https://twitter.com/ochame_nako/status/1115270046794653696?ref_src=twsrc%5Etfw">April 8, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Flexのチュートリアルをやる

というわけで、Flexに戻ってきました。
FlexのQuickStartをやってみます。
[https://www.twilio.com/docs/flex/quickstart](https://www.twilio.com/docs/flex/quickstart)

ドキュメントは全編英語でお送りされますが、
まあがんばって読みましょう。
また面白いと思ったのが、Twilio QuestにFlexのミッションがあり、
[リンク](https://www.twilio.com/quest/mission/35)をクリックするとFlex関連のミッションをいきなりこなせるようになるのは
いい取り組みですね。

QuickStartの追記したほうがわかりやすそうなところだけ、
補足して書いてみます。

### とりあえずFlexを起動する

Flexテンプレートを利用し、
新しいプロジェクトを立ち上げるとサイドメニューに
Flexアイコンが表示されます。
Flexアイコンを押すと表示される、
画面内に`Launch Flex`というボタンを押すと、Flexが起動します。

TODO Flex起動画面のスクショ貼る

**おお・・・**

デモで見たことあるし、
**実はここからがめっちゃ大変**なのを知っているとはいえ、
ボタンポチポチしてるだけで、これが開くのはなかなかすてきですね。

### Twilio StudioとFlexの連携

Studioとは、GUIベースでコミュニケーションワークフローを
変更できるプロダクトです。
[https://twilio.kddi-web.com/function/studio/](https://twilio.kddi-web.com/function/studio/)

FlexとStudioの設定画面は下記URLで見れます。
[https://www.twilio.com/console/flex/messaging](https://www.twilio.com/console/flex/messaging)

初期状態だと、下記みたいになっているはずです。

TODO 画像貼る

Channelにsmsとwebとありますが、
名前の通り、SMSもしくはWebChatでメッセージが来た場合、
どういう挙動をするかの設定です。
いずれもINTEGRATION TYPEにあるStudioの処理を行います。

こう書いても分かりづらいと思いますので、
スクショを交えて説明します。

Flexを立ち上げると、Studioは最初こんな感じになっています。

TODO Studio初期画面のスクショ貼る

何かしらのTriggerが起動すると、
つながっている条件(Transitions)に合致した先の
ダイアログにある処理が実行されます。
初期状態だと、Triggerには
下記3つの条件が設定されています。
1. Incoming Message(メッセージの受信)
2. Incoming Call(電話の受電)
3. REST API

メッセージの受信がされると、矢印でつながっている
`SendMessageToAgent`と名前がついているダイアログの処理がされます。
されますが、初期設定ではちゃんと挙動する処理が設定されていないので、
何も起きません。

### チャットボットを設定する

起動したFlexトップページで`WEBCHAT`というボタンがあるので、
押すとよく見るデザインのChatが開きます。
デファクトスタンダードなデザインのChatを
再実装しなくていいのは便利ですね。

Botがなんか言ってますが、メッセージを入れても何も起きません。
上で書いたStudioのTriggerで
Incoming Messageした後の挙動が設定されてないからです。

というわけで、Incoming Messageした後の挙動を
Studioで設定しましょう。
Studio管理画面に初期設定だと、
`Webchat Flow`というフローがあるはずです。
それのフローを設定し、チャットボットが返信するようにしましょう。

Studio内のダイアログ外をクリックすると、
ウィジェット追加メニューが表示されるので、
`Messaging ＞ Send Message`を押します。
ウィジェットが追加されるので、
Widget NameとMessage Bodyを適当に入れます。
チュートリアルなので、Nameは適当でいいですが、
本番稼働をする際は名前付けは一定のルールに従って付けましょう。
適当に名前をつけると、多分10個超えたあたりから後悔します。

Message Bodyは`Oh yeah.(そうだね)`(チャットボットとしては最悪の返事)を
入れてますが、何でもいいです。

ウィジェットの設定完了後、
Triggerのウィジェットを選択し、Transitionsの設定を開き、
If Incoming Messageを先程作ったメッセージのウィジェットに設定します。

その後、Publishを行うことで、
Flexのチャットボットに適用されます。
先程同様の手順で、Webchatを起動し、
適当にメッセージを送ると、Studioで設定された
メッセージが返信されます。

TODO 画像貼る
_Oh, yeah..._

### SMSを設定する

これもチャットボット同様、Studioの設定を変更すればOKです。
初期状態だと、`Messaging Flow`というフローを変更します。
変更内容はWebchat同様です。

設定変更後、Flexに表示されている電話番号にSMSすると、
下記画像のように自動でSMSで返信が返ってきます。

TODO 画像貼る

トライアルアカウントなので、SMSのメッセージに
トライアルアカウントの旨が表示されています。
アップグレードすることでこのメッセージは消えるようです。

### IVRを設定する

IVRはInteractive Voice Responseの頭文字を取った名称で、
音声自動応答装置が正式名称とのことです。
[https://ja.wikipedia.org/wiki/%E8%87%AA%E5%8B%95%E9%9F%B3%E5%A3%B0%E5%BF%9C%E7%AD%94%E8%A3%85%E7%BD%AE](https://ja.wikipedia.org/wiki/%E8%87%AA%E5%8B%95%E9%9F%B3%E5%A3%B0%E5%BF%9C%E7%AD%94%E8%A3%85%E7%BD%AE)

宅配便の不在票などで電話番号が書いてあり、
そこに電話すると、再配達希望の方は1を、それ以外の方は2を
みたいな音声が流れる例のアレです。
一度は使ったことがあると思います。

Flexでも簡単に設定できます。
初期状態だとVoice IVRという名前のStudioフローを開きましょう。

IVRを作るには下記手順を踏んでください。

1. Gather Input on Callというウィジェットを作る
2. 1のウィジェットのText to Sayに適当なメッセージを入れる
3. Split Based onというウィジェットを作る
4. Say/Playというウィジェットを作る
5. 
6. Transitionsに下記を作る
  1. `IF NO CONDITION MATCHES`を1で作ったウィジェットに接続する
  2. `` 

## ちょっと待って、Flexの話が少なすぎない？

お気づきになりましたか。

最初の方にも書きましたが、
FlexはいままでのTwilioのプロダクトをパッケージにして、
UIをReactでかっこよくしているフレームワークでしかありません。
そのため、かんたんにコンタクトセンターを立ち上げることはできますが、
その後の運用で何をどうするかや、
各プロダクトの使い方は学ぶ必要があります。

### Flexで利用されているTwilioプロダクト

各プロダクトって具体的になんですか？っていう方向けに、
一旦Flexで利用されているTwilioプロダクトを
分かる範囲で箇条書きしました。

* Flex(React)
* Voice
* SMS
* Chat
* Sync
* TaskRouter
* Studio

これら技術に立脚したプロダクトがFlexです。

フロントエンドはReactなので、
Reactについても知っておく必要があるでしょう。
さらにTwilioはWebRTCを利用しているので、
WebRTCでのデバッグや各ブラウザでの挙動確認が必要で。
コンタクトセンターを効率的に運用するノウハウも必要です。
これらを一人で押さえるのは無理なので、
ぜひチームで取り組んでください。

とはいえ、Flexがない状態で、
上記プロダクトを使い倒して[コンタクトセンターを立ち上げた身](https://twilio.kddi-web.com/case/leverages2018/)としては、
これでもかなり楽になったと感じます。

Flexが立ち上がって、それっぽく動いたからと言って、
やった！これで勝つる！！
って言ってすぐ導入しないでくださいね。

## Flex問題点

### Twilioアカウントがあっても、別プロジェクト扱い

以前、[Twilioアカウントを切り替えるChrome Extension](http://harinoma.info/?p=340)を作りました。

Facebookでシェアしたところ、
例の赤い人にプロジェクトの切り替えもできるようにしてほしいと言われ、
プロジェクトを使っていなくてわからなかったので、
PRお待ちしていますという雑な返しをしたのですが、
ここに来て意味がわかってきました。

別プロジェクトだと、すでにアカウント開設して持っている電話番号や
Twilioポイントが新規作成するFlexプロジェクトで使えない点が困りそう。
特に既存のTwilioプロジェクト持っている会社が、
Flexに乗り換えようと思っても、移行がしづらいのでは？

### SMSの入力欄で日本語入力ができない

`こんにちは`と入力しようとすると、
下記画像のようになりました。
入力途中で勝手に確定してしまうため、日本での導入は難しそうですね。

TODO 画像貼る

ちなみにコピペしたら、送ることはできました。
そのため、これはFlexのUIのバグでしょうね。

TODO 画像貼る

Chromeの開発者ツールで見たところ、
入力イベント（KeydownかKeyupあたりか？）に
何かしらのイベントがバインディングされており、
キー入力するたびにtextareaにvalueを設定するような挙動をしているため、
入力中に入力値が確定されるようです。
なぜこのような挙動なのか・・・

### ダイアログの整列機能がほしい