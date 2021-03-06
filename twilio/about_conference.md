# TaskRouterとConferenceの組み合わせる

こんにちは、[@**24guchia**](https://twitter.com/24guchia)です。

以前の記事で、日本国内でTaskRouterを使う場合、Conferenceを使いましょうとの結論を付け、
実際に運用をはじめたので、Conferenceと通話の違いについて書きます。

この違いを押さえておくと、TaskRouterを使わない場合でも、
Conferenceを使って、通話のモニタリング機能を拡張できるようにしておくか、
それとも通常のDialで済ませるかの判断基準になると思います。

## 日本国内でTaskRouterを使う場合、Conferenceを使う理由って？

端的に言うと、TaskRouterで割り振った受電の通話音声が
必ず遅れやすい環境での通話を強いられます。
詳細は過去記事を参照してください。
http://harinoma.info/?p=73

### TaskRouterのみの影響ということは受電だけ直せばよいか？

これはケースバイケースですが、基本的には架電もConferenceに置き換えたほうが良いです。
理由はConferenceとDialが混合するため、コードが読みづらくなり、拡張性や保守性が下がります。
また、保留を提供している場合、受電と架電で処理を分ける必要があります。
日本国内でTaskRouterを使う場合、Conferenceでの受電架電の機能提供は
セットで必須になると思います。

### TaskRouterは使いたいけど、Conferenceは使いたくない場合は？

下記選択肢から選んでください。

1. 受電は遅れるものとして受け入れる
2. 一旦受けて、必ず即時折り返す
3. TaskRouterの日本サーバができるのを待つ

3以外はあんまり現実的な選択肢はないですね。
ただ、3はいつになるか不明です。
今日時点（2018年5月27日）では、諦めてConferenceを使いましょう。

## そもそもConferenceとは

250人まで同時通話できる機能です。
Dialは1対1の通話に対し、250人まで**同時に話せます**。
グループ通話機能を作ったりするのが一般的なユースケースです。

### AgentConferenceとは

Conferenceの拡張機能です。
Conferenceとの決定的な違いは、coachプロパティにより、
話した音声を特定の相手に届けられる点です。

この機能は何に使うかというと、新人営業と顧客の通話を先輩営業が聞きながら、
話し相手には聞かれずに、先輩が新人に口頭で直接指示を出すといった場合に使います。
リアルタイムで指示が出せ、さらにソフトフォンを使えるため、
場所を問わず、コーチングが出来ます。
声が荒ぶっても、話し相手には音声が聞こえないので、
近くの新人をコーチングする場合でも、この機能を使うと安全です。

一般的なビジネスフォンでもウィスパリングやら、モニタリングやら
といった名称で提供されていることもあります。

## Conferenceのハマりどころ

### 概念が違う

先にも書いた通り、Dialは1対1の通話に対し、
Conferenceは**1人以上250人まで**の通話という点が違います。
二人以上ではなく、**1人以上**のため、
普通の通話では考えなくても良いことを考える必要があります。

### 誰かが通話を終了した時、Conferenceを終了させるかどうか考える必要がある

Conferenceは1人以上でも、**通話が可能です**。
そのため、二人で話していて、相手が電話を切っても、
**残された方は自動で電話が切れません。**

例えば、endConferenceOnExitというプロパティがあり、
このプロパティをtrueにすることで、このプロパティがtrueの人が通話を終了したら、
自動でConferenceを終わらせる機能があります。

じゃあ、これを一律でtrueにすればよいかというと、
基本的にはダメです。その理由は保留があるからです。
保留する場合、その人はConference上の通話を終了するため、
このプロパティがtrueだとConferenceが終了してしまいます。

一律ではなく、顧客の通話のみ、このプロパティをtrueにします。
また、このプロパティがfalseの側が通話を終了した場合、
API経由で必ずConferenceを終了させましょう。
終了させないと、通話相手は自動で電話が切れないので、
気付かずずっと通話状態になっているとクレームにつながります。

### Twilio.ClientでConferenceSidが取れない

ConferenceSidは通話を終了したり、
参加者に対して更新処理をかけるのに必要な情報です。

先に挙げたように、必ずAPI経由でConferenceを終了させる必要がありますが、
ClientにはなぜかConferenceSidを受け渡されません。
じゃあ、CallSidから参照しようという手も無理です。
CallSidからConferenceに関する情報は取れません。

解決方法としては、架電と受電で異なる方法を用います。

#### 架電の場合

ConferenceにStatusCallbackイベントが設定できるので、
イベント時にSyncでClientに通知しました。

かなりトリッキーな方法で一刻も早く別の方法で直したいのですが、
現時点ではこういう方法以外は見つけられませんでした。

#### 受電の場合

TaskRouterを使う場合、TaskSidがConferenceのFriendlyNameに設定されるため、
Taskを受領する際、FriendlyNameで検索することでConferenceSidが取得できます。
TaskSidはTwilioが付与する一意なIDなので、1件のみ取れます。

一個余計なAPIを投げる必要があり、余計なコストだと考えています。
まあ、架電に比べたらかなりマシです。

#### この解決方法の問題点

Syncにしても、API経由にしても、時差があります。
Webページなら気にならない誤差ですが、電話ではけっこう致命的な時差です。

一番の問題として、ConferenceSid取得前に電話を切ろうとすると
Conferenceを終了させるAPIに失敗します。
そのため、この方法で解決する場合、ConferenceSidが取得できているか、
できていない場合、再度時間を置いてAPIを呼び出すよう待つ必要があります。

### 架電時、架電先がビジー応答返却すると、Conferenceが重複した

なんだそれ、という感じですが架電時の処理を下記の通りに組むと重複します。

1. Twilioの番号と架電先の番号の通話をConferenceに参加させるAPIを実行する
2. 1で作られたConferenceにdialするTwimlを返却する

これは普通に待受状態の電話機に通話する場合は問題ありません。
問題が発生するのは、ビジー応答を返却する電話機の場合のみです。
ちなみにビジー応答は、通話中かつ留守電設定がない電話機の場合、
ビジー応答が返却されるようです（観測範囲内）。

なぜ重複するかというと、1でConferenceに入る前に、
ビジー応答が返却され、通話中の参加者がConferenceからいなくなり
1のAPIで作成されたConferenceが即時終了します。
そして、2ではすでに終了したConferenceに架電しようとしますが、
存在していないため、同名の別のConferenceを作成し、そこに1人で参加します。

これにはけっこうハマりました。
Conferenceは1人以上で成立するという仕様のため、
電話を切る必要があるが、上でも挙げている通り、
ConfereceSidがClientに渡されない。
さらに同名のConferenceにはStatusCalllbackのイベントを設定できず、
ConfereceSidをSyncで渡すという実装をしていたので、
電話を切るために行った対策がすべて通用しませんでした。

これの対策は1と2の間で1秒待ち、1で生成されたConferenceが生きているか確認したり、
StatusCallbackで対策したりと方法があります。
私は1秒待ち、Conferenceのstatusを確認する方法で対応するつもりです。

### StatusCallbackの数が普通の通話より増える

イベントの数が増えます。
https://www.twilio.com/docs/voice/twiml/conference#attributes-statusCallbackEvent

サーバへのアクセスが増えるので、注意してください。
うちのサーバはちょいちょい限界を迎えてます。

ConferenceSidが渡されないために、
必要以上にStatusCallback設定しています。

# まとめ

## ちょっとこれは理不尽では？

理不尽だと感じる理由は下記の通り。

1. TaskRouterはGAなのに、日本国内では通話に遅延が発生しやすいまま放置されている
2. 1のアナウンスが私のブログにしか情報がない（観測範囲内）
3. ConferenceSidをClientに受け渡す方法がなく、かなりトリッキーな実装を強いられる

これからTaskRouterを受電で使う場合はよく考えて採用してください。
TaskRouterと同様の仕組みは時間かかりますが、作れると思います。
受電はTaskRouterを使うとTwilioで完結し、良いと思うのですが、
いかんせん日本国内での使用には問題が多いです。

AgentConferenceも実装しづらいなぁという感じなので、
急いで導入する必要はあまりないかもしれません。
下記記事によると、通常のコールからシームレスにConferenceに変更できる機能が
実装予定らしいので、モニタリング・ウィスパリングしたい場合でも、
それまで待ったほうが無難かと思います。
https://www.twilio.com/blog/2017/12/agent-conference-generally-available.html

## モニタリングの下地ができたのはよしとよう

1ヶ月の実装とテスト2週間ほど（バグがめっちゃ出た）かけ、
とりあえずConferenceが導入できました。

モニタリング・ウィスパリングは元から要望が合ったのですが、
どうにもリリースに間に合わず、置いておいた要望です。
ウィスパリングのアドバイス機能はバグが発生すると、
即クレームに繋がるので、まずはモニタリングで聞くだけの機能を提供し、
その後、ウィスパリングを導入する予定です。
また、リアルタイムでの通話一覧機能を実装し、
どの通話を聞くか、アドバイスするかを選択できるようにする予定です。

これらの機能が実装でき次第、記事を上げていく予定ですので
それまで乞うご期待。

