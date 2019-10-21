# Flexの技術的な話

こんにちは、[@24guchia](https://twitter.com/24guchia)です。

Flexのコンセプトや具体的なアウトプットを知るために、
記事をまとめましたが、本文が長くなったため、記事を分割しました。

（TODO URL貼る）

この記事はFlexのチュートリアルを完了するまでの、
技術的な記事です。

そのため、エンジニア、（特にフロントエンドエンジニア寄りの）デザイナー以外だと
あまり得るものがないと思いますので、予めご了承ください。
また、書いてある内容は執筆時点（2019年10月21日）の結果です。

## Flexとは何か？

FlexとはTwilioの各プロダクトをひとまとめのパッケージにして、
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

Reactを完全に理解したので、Flexのチュートリアルに戻りましょう。
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">エンジニア用語の「完全に理解した」「何も分からない」「チョットデキル」は「ダニング・クルーガー効果」で簡単に説明ができます。これは一種の認知バイアスで能力の低い段階では自分の能力の低さを認識できないためです（過大評価しがち）。その反面で能力が高くなると過少評価しがちです。 <a href="https://t.co/LGaJ4E5hWo">pic.twitter.com/LGaJ4E5hWo</a></p>&mdash; おちゃめ (@ochame_nako) <a href="https://twitter.com/ochame_nako/status/1115270046794653696?ref_src=twsrc%5Etfw">April 8, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## Flexのチュートリアルをやる ~~ コミュニケーションボットの設定 ~~

というわけで、Flexに戻ってきました。
FlexのQuickStartをやってみます。
[https://www.twilio.com/docs/flex/quickstart](https://www.twilio.com/docs/flex/quickstart)

コミュニケーションボットとは、電話などによる音声コミュニケーションから、
SMSと言ったメッセージングまで、すべてのコミュニケーションに対して、
自動対応するボットをまとめて指しています。
そのようなボット全般を一旦コミュニケーションボットとしました。

チュートリアルドキュメントは全編英語でお送りされますが、
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
それのフローを設定し、
チャットボットが返信するように設定の変更をします。

Studio内のダイアログ外をクリックすると、
ウィジェット追加メニューが表示されるので、
`Messaging ＞ Send Message`を追加します。
追加されたウィジェットで
Widget NameとMessage Bodyを適当に入れます。

チュートリアルなので、Nameは適当でいいですが、
本番稼働をする際は名前付けは一定のルールに従って付けましょう。
適当に名前をつけると、**多分10個超えたあたりから後悔します**。

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

### SMSボットを設定する

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

### TaskRouterの設定について

[https://www.twilio.com/docs/flex/quickstart/flex-routing-skills](https://www.twilio.com/docs/flex/quickstart/flex-routing-skills)

チュートリアルとしてはここから先に記載があります。
しかし、チュートリアルを完了するにあたっても
実際の挙動確認にPC2台用意する必要があるなど、
なかなか手間なので流し見だけしました。
~~(僕は業務でやってたから再度チュートリアルやる必要もない)~~

上で書いてある通りですが、
IVRでTaskをスキルベースルーティングする旨が書いてあります。

## Flexのチュートリアルをやる ~~ プラグインをReactで作成する ~~

Reactチュートリアルやったのに、
Reactを使わない？！と思ってましたが、
このチュートリアルから使うことになります。
一安心ですね。

### CRM連携デモ

[https://www.twilio.com/docs/flex/quickstart/getting-started-plugin](https://www.twilio.com/docs/flex/quickstart/getting-started-plugin)

上記チュートリアルドキュメントのデモではbingと連携しています。

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

Assetsは静的ファイルをホスティングができる
Twilioのプロダクトの一つです。

`Load a Flex plugin to your hosted instance`の
チュートリアルドキュメントでは`localhost:3000`でbing連携を行い、
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

#### 改修案

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

`Build your Flex plugin`という項で、
src/SamplePlugin.jsを置き換えるよう
サンプルコードが書いてありますが、
そのままコピペすると動きませんでした。

原因としては、
`import CustomTaskListComponent from './CustomTaskListComponent';`
ここでエラーが起きており、`CustomTaskListComponent`が無いエラーがでます。
実際に存在しておらず、ドキュメントにも書いていないため、
コメントアウトしたところ動きました。

別のページに似たような名前のコンポーネント(`MyCustomTaskInfoPanelItem`)を作る[チュートリアル](https://www.twilio.com/docs/flex/tutorials/adding-components-flex-ui)があるため、
元は意味がある記述だったようです。

## まとめ

上記をなぞるだけで、
Flexのチュートリアルは完了させられます。
一通り完了することで、Twilioが何ができて、
何が便利なのかが分かると思います。
今まで、この領域はベンダーロックインされた状態で、
改修するにも高い金額が必要だった領域です。
Twilioによってコミュニケーションの民主化を進めており、
誰でも改修できるように進んできているのは非常に好感が持てます。

ただ、この記事を読んでいるほとんどの方が、
覚えることがめっちゃ多いと感じると思います。

実際、Flexを1から覚えるのはなかなかに大変です。
業務委託といった契約形態でご協力できることも
あると思いますので、[DM](https://twitter.com/24guchia)でご相談ください。