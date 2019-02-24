# Google Apps ScriptとIFTTTとTwilioでブログの死活管理をする

こんにちは。

つい先日、僕のブログ読んでください！とお伝えしたところ、
見れないんですけど・・・っていう恥ずかしい事案があったので、
各種サービスを使って、死活管理しました。

これらサービスを採用した理由は、このブログは個人でレンタルしている
さくらのVPSにWordpressを導入しているため、
サーバの外で管理したかったからです。
サーバを触ったことがないときに、
勉強用に借りたサーバでディレクトリ構成がめちゃくちゃなので、
そのうち移行したいです。

## Google Apps Scriptでやること

以下GASで。

### フェッチして、何かあったら通知するスクリプトの作成

僕のブログのトップページにアクセスして、
エラーが発生したら、IFTTTにWebhookをしてくれる物を作りました。

```javascript
function myFunction() {
  var options = {
    'method' : 'get',
    'muteHttpExceptions': true
  };
//  const blog_url = 'http://thisisnotexisturlfortest/'; // non exist url
  const blog_url = 'http://harinoma.info/';
  try {
    Logger.log('おけまる水産');
    UrlFetchApp.fetch(blog_url, options);
  } catch (e) {
    Logger.log('やばたにえん');
    const ifttt_url = 'https://maker.ifttt.com/trigger/blog_is_dead/with/key/{your_token}';
    UrlFetchApp.fetch(ifttt_url);
  }
}
```

コメントアウトしている`blog_url`をコメントインすると、
必ずエラーが起こせるのでテストの際はそのようにし、
通知が来ることを確認します。

### 15分毎にスケジュール起動する

上記GASをスケジュール起動します。



cronなどを使ったりしなくても、Google内で準備されているので、
ありがたいですね。Googleのこういうところ好き。

## IFTTTでやること

### Webhookの用意

IFTTTでWebhookというレシピが用意されています。
こちらを使うとIFTTT内でAPIのエンドポイントを用意してくれて、
そこにリクエストを投げることができます。

作り方は下記ブログを参照ください。

[IFTTTにGoogle Apps Scriptを混ぜたらヤバい化学反応が起こった件](http://moguno.hatenablog.jp/entry/2018/08/02/163119)

WebhookはTwilioを呼び出します。

## Twilioでやること

FunctionsとTwiMLBinのみを使い、
Twilio内で完結するようにしています。

### Functionsの用意



### TwiMLBinの用意

Dialで僕の携帯を呼び出すようにしています。
電話を取るとSayでブログがやばい状態であることを伝えてくれます。

## デモ動画

TODO 動画貼る

深夜だろうがなんだろうが、とにかく15分毎にひたすら
電話かけてくるので否が応でも対応せざるを得なくてつらいです。

## ちなみにZapierとかいますけど？

Zapier（ザピエル）は有料なのと、今回のやりたいこと考えると、
無料のIFTTT十分です。
Zapierの無料プランだと、100タスク/月とのことで、
上記が動きつづけると1日ちょっとで枯渇するので除外しました。

ZapierはTwilio連携がサポートされているは良いですね。
ただ、Twilioの番号で電話するっていうのは見つけられなかったので、
Zapier x Twilioのためだけに有料プラン使うっていうのは
あまりメリットはなさそうかなと感じます。
Zapierを元々有料で使っているのであれば、
Zapierのほうが良いかも。

## まとめ

Googleでフェッチして、IFTTTに通知。
IFTTTが通知を受け取り、Twilioに通知。
Twilioが電話して、人間を叩き起こして、
サーバを復活させるってピタゴラスイッチみたいですね。
IFTTTでTwilioが使えるようになると便利なんですけどねー。