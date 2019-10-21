# Twilio Flexを再度学習したまとめ

こんにちは、[@24guchia](https://twitter.com/24guchia)です。
題名の通り、Twilio Flexについて再度学習したので、
学びなどのまとめです。

## なんで再度学習をしたか？

Twilio Flexを実務でできる人が少ない(観測範囲内)からです。
今、多分こんな感じです。

`Twilio Flexでコンタクトセンター立ち上げたい会社 >>> Twilioできる人 >>>>>>> Twilio Flexできる人（いるのか？）`

僕はTwilioチョットデキルと思うのですが、
Flexは本当によくわかってないので、
市場価値を上げるために学習をしました。
1ヶ月ニートしてるのも、Flexの勉強するためと言っても過言ではない。

## Flexについて改めて

以前、こんな記事を書きました。
http://harinoma.info/?p=80

書いている内容のサマリーとしては下記です。
* CPaaSという概念の提唱がよい
* コンタクトセンターのUIのパッケージング
* Twilioのビジョンを体現したプロダクト

改めて読み直しても、今と変わらず、
だいたい言いたいことはこの記事に書いてある通りです。
ただ、これはコンセプトに関してしか書いてない。

コンセプトの理解はリリースから1年以上経ったため、
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
名前の通り、SMSもしくはChatでメッセージが来た場合、
どういう挙動をするかの設定です。
いずれもINTEGRATION TYPEにあるStudioの処理を行います。

こう書いても分かりづらいと思いますので、
スクショを交えて説明します。

Flexを立ち上げると、Studioは最初こんな感じになっています。

TODO Studio初期画面のスクショ貼る

何かしらのTriggerが起動すると、
つながっている条件に合致した先(Transitions)の
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
それのフローを設定し、チャットボットが返信するように設定の変更をします。

Studio内のダイアログ外をクリックすると、
ウィジェット追加メニューが表示されるので、
`Messaging ＞ Send Message`を追加します。
追加されたウィジェットで
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
先程同様の手順で、Chatを起動し、
適当にメッセージを送ると、Studioで設定された
メッセージが返信されます。

TODO 画像貼る
_Oh, yeah..._

### SMSを設定する

これもチャットボット同様、Studioの設定を変更すればOKです。
初期状態だと、`Messaging Flow`というフローを変更します。
変更内容はChat同様です。

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
そこに電話すると、`再配達希望の方は1を、それ以外の方は2を`
みたいな音声が流れる例のアレです。
一度は使ったことがあると思います。

Flexでも簡単に設定できます。
初期状態だとVoice IVRという名前のStudioフローを開きましょう。

IVRを作るには下記手順を踏んでください。

1. `Gather Input on Call`というウィジェットを作る
2. 1のウィジェットの`Text to Say`に適当なメッセージを入れる
3. `Split Based on`というウィジェットを作る
4. `Say/Play`というウィジェットを作る
5. 適当に言わせたいメッセージを入れる。`押したボタンは何番です`のように変化がわかりやすいメッセージがおすすめです
6. Sayを重複コピーし、メッセージ内容を変更します
7. `Transitions`を設定します
  1. Triggerの`Incoming Call`に`Gather`ウィジェットを接続する
  2. `Gather`ウィジェットに`Split`ウィジェットを接続する
  3. `Split`ウィジェットの`IF NO CONDITION MATCHES`を3で作った`Gather`ウィジェットに接続する
  4. `Split`ウィジェットの`Transitions`にある`Equal To`を設定し`Gather`ウィジェットが取り得る値とマッチさせ、4~7で作ったSayウィジェットに接続する 
  5. 各`Say`ウィジェットに`Send to Flex`のウィジェットを接続する

これらの手順をすべて行うと、下記画像のようになります。

TODO 画像貼る

Publishを行い、設定を反映させます。

その後、Flexが保持している電話番号に電話をしてみましょう。
上記で設定したIVRが流れるはずです。
1~3を押すとどうなるか、1~3以外を押すとどうなるかなど、
いろいろと試してみてください。
※ 通話料金かかるので、めちゃくちゃ電話しないほうがおすすめではありますｗ

#### で、このIVRって何が便利なの？

押したボタンを読み上げても何にもならないですよね。

押されたボタンの情報はFlexに反映されます。
押されたボタンによって、
かかってきた電話を誰に割り振るかの重み付けが可能で、
例えば、セールス、サポート、その他と言った
割り振りをすることができます。
そうすることで、お客様がつなぎたい相手にすばやくつなぐことができ、
従業員側も自分の業務に関係ない電話を取り次ぐ手間がなくなり、
一石二鳥です。
この概念はWFO(WorkForce Optimization)、
従業員業務改善と呼ばれるものです。

この受電の割り振り設定にはTwilioのTaskRouterという
プロダクトが使用されています。
TaskRouterに関しては、
日本国内でプロダクト環境に導入したのは多分僕だけですｗ
技術的な相談がしたいなどありましたら、
[DM](24guchia1@gmail.com)などでご相談ください。

#### TaskRouterの設定について

[https://www.twilio.com/docs/flex/quickstart/flex-routing-skills](https://www.twilio.com/docs/flex/quickstart/flex-routing-skills)

チュートリアルとしてはここから先に記載があります。
しかし、チュートリアルを完了するにあたっても
実際の挙動確認にPC2台用意する必要があるなど、
なかなか手間なので流し見だけしました。

上で書いてある通りですが、
IVRでTaskをスキルベースルーティングする旨が書いてあります。

### FlexのReactプラグインを作成する

[https://www.twilio.com/docs/flex/quickstart/getting-started-plugin](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin)

Reactチュートリアルやったのに、
Reactを使わない？！と思ってましたが、
このチュートリアルから使うことになります。
一安心ですね。

### CRM連携デモ

デモではbingと連携しています。
ということは、GoogleやYahooも連携できる？
と思いましたが、下記エラーが発生し、
連携できませんでした。
`Refused to display 'https://www.google.com/search?q=routing' in a frame because it set 'X-Frame-Options' to 'sameorigin'.`

これはFlex画面右側の部分でiframeを利用して表示しているが、
GoogleやYahooはiframeでの
別ドメインへ埋め込みを禁止している設定のためです。
なんで突然bingなんだろうと思ったんですが、
bingはiframeで別ドメインでも表示可能な設定（or 禁止設定をしていない）ため、
bingを利用するようです。

今回はチュートリアルなので良いですが、
内製CRMやSalesforce、Zohoと言った
CRMを使う場合もX-Frame-Optionsの設定について注意が必要です。

とはいえ、このような連携ができるのは便利ですね。

### ローカルでの開発とAssetsを使った本番環境への適用

Assetsは静的ホスティングができる
Twilioのプロダクトの一つです。

チュートリアルでは`localhost:3000`でbing連携を行い、
その後、npmでコンパイルしたJavaScriptファイルを
Assetsに起き、本番環境に適用しています。

この仕組を利用すれば、
開発者はローカル環境で修正を行い、GitHubにコミット。
マージされたら、npmでコンパイルを行い、
AssetsにTwilio CLIでデプロイまで行うことができますね。

ちなみにTwilio CLIでAssets関連を呼び出すには
下記のようなコマンドを利用します。
```
twilio api:serverless:v1:services:assets:
create           fetch            list             update           versions:create  versions:fetch   versions:list
```

Twilio CLIについては下記記事でまとめてますので、
詳しく知らない方は読んでみてください。
http://harinoma.info/?p=375

### ReactコンポーネントをUIに追加する

[https://www.twilio.com/docs/flex/tutorials/adding-components-flex-ui](https://www.twilio.com/docs/flex/tutorials/adding-components-flex-ui)

内容としては静的なTODOリストコンポーネントを
Reactで作成し追加するだけなので、内容の説明は割愛。
基本的にコピペでできます。

これだけだと何の意味がわからないとなるので、
用途を考えてみました。
TODOリストを顧客のステータスに応じて、
変更するというのが便利そうです。
顧客のステータスが、初回コンタクトか、
何回目かの連絡か、何かしらのコンバージョン達成時、
達成後のアフターフォローなどで聞くべき項目は変わります。
そのため、TODOリストを変更する必要がありますが、
これをコンポーネント一つで実装できます。
分割により、変更に関する影響が少なくできるのは
メリットになりえますね。

また、TODOリストで完了した項目をクリックすると、
メモを書けるコンポーネントを出し、
保存するとTODOに対する完了項目を書き出すようにすれば良さそうです。
対応ログを書くのがめんどくさいとなるのが、
人間の心情なので、定型的に作業ができるようにすることで、
オペレーターの負担を軽減できると考えています。
さらにコンポーネント側で管理することにより、
DBなどを利用し、TODOリストを管理者が変更できるようにすれば、
TODOリストが変わっても周知など最小限で済ますことができ、
周知を忘れていても、TODOリストが変わるため、
現場での対応が古いままになると言ったことは減らせられそうです。

コンポーネントを作って、
追加などを行うのは下記ドキュメントにある通りで操作可能です。
[https://www.twilio.com/docs/flex/components-add-replace-modify](https://www.twilio.com/docs/flex/components-add-replace-modify)

UIとしてはモダンですし、
コンタクトセンターのデファクトスタンダードを知らない人が多い中、
デザインをそこまで意識しなくていいのはメリットですね。
覚えることは相当多いですが、bootstrap4やUIkitと言った
ブートストラップツールも覚えること多いですし、
まあ許容範囲かなという所感です。

#### ドキュメントのコードがバグってるっぽい

[https://www.twilio.com/docs/flex/quickstart/getting-started-plugin#build-your-flex-plugin](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin#build-your-flex-plugin)

Build your Flex plugin という項で、
src/SamplePlugin.jsを置き換えるよう
サンプルコードが書いてありますが、
そのままコピペすると動きませんでした。

原因としては、
`import CustomTaskListComponent from './CustomTaskListComponent';`
ここでエラーが起きており、`CustomTaskListComponent`が無いエラーがでます。
実際に存在しておらず、ドキュメントにも書いていないため、
コメントアウトしたところ動きました。

別のページに似たような名前のコンポーネント(`MyCustomTaskInfoPanelItem`)を作るチュートリアルがあるため、
元はあったのかな？

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
* Assets

これら技術に立脚したプロダクトがFlexです。

FlexのフロントエンドはReactなので、
Reactについても知っておく必要があるでしょう。
さらにTwilioはWebRTCを利用しているので、
WebRTCでのデバッグや各ブラウザでの挙動確認が必要で、
コンタクトセンターを効率的に運用するノウハウも必要です。
これらを一人で押さえるのは無理なので、
ぜひチームで取り組んでください。

とはいえ、Flexがない状態で、
上記プロダクトを使い倒して[コンタクトセンターを立ち上げた身](https://twilio.kddi-web.com/case/leverages2018/)としては、
これでもかなり楽になったと感じます。

Flexが立ち上がって、それっぽく動いたからと言って、
やった！これで勝つる！！
って言ってすぐ導入しないでくださいね。

## Flex課題に感じるところ

チュートリアルやっただけですが、
僕が課題として感じた点をまとめました。

### Twilioアカウントがあっても、別プロジェクト扱い

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

画像をご覧ください。

TODO 画像貼る

矢印がきれいな一直線にならないのがめっちゃ気になるｗ
整列機能がほしいですね。

### Studioの操作がTwilio内でしかできない

Flexの記事かと思いきや、ほとんどStudioの話で終始していました。
Flexにおいて、Studioは重要な位置にあります。

そんな、StudioのいいところはGUIで
誰でも簡単に操作ができることだと思っていますが、
Studioを編集するために、Twilio管理画面にログインする必要があります。
しかし、Twilio管理画面は
電話番号を買うのはもちろん、**保有している電話番号をリリースしたり**、
**Studioのフローを消したり**など、
かなりクリティカルな操作が可能です。
悪意を持って操作する人はいないと信じたいですが、
うっかり電話番号を**リリースしちゃいました！**や、
うっかりFlexで使ってる**Studioのフローを壊しちゃいました！**
みたいなことは起こり得ないとはいえません。

そのため、結局はTwilioとコンタクトセンターのリテラシーが
高くないとStudioの操作を一任するということは難しく、
エンジニアの負荷を軽減するにはまだまだ発展途上という認識です。
Studioだけ操作可能などの権限設定があると
もう少し安心できますね。

## まとめ

TODO　めちゃくちゃ長くなったので、分割する