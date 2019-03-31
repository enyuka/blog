# Google Apps ScriptとTwilioでブログの死活管理をしてみた

こんにちは。

先日、僕のブログ読んでください！とお伝えしたところ、
見れないんですけど・・・っていう恥ずかしい事案があったので、
外部サービスを使って、死活管理しました。
利用する外部サービスはGoogle Apps ScriptとTwilioの2つです。

これらサービスを採用した理由は、このブログは個人でレンタルしている
さくらのVPSにWordpressを導入しているため、
サーバの外で管理したかったからです。
サーバを触ったことがないときに、
勉強用に借りたサーバでディレクトリ構成がめちゃくちゃなので、そのうち移行したいです。

## Google Apps Scriptでやること

以下GASで。

### フェッチして、何かあったら通知するスクリプトの作成

僕のブログのトップページにアクセスして、
エラーが発生したら、TwilioのFunctionsを呼び出してくれるスクリプトを作りました。

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
    const functions_url = 'https://{your_functions}.twil.io/blog_is_dead';
    UrlFetchApp.fetch(functions_url);
  }
}
```

コメントアウトしている`blog_url`をコメントインすると、
必ずエラーが起こせるのでテストの際はそのようにし、
通知が来ることを確認します。

### 15分毎にスケジュール起動する

上記GASをスケジュール起動します。
スケジュール起動するには、トリガーと呼ばされるものを設定します。

TODO 画像貼る

cronなどを使ったりしなくても、スケジュール起動ができ、ありがたいですね。
Googleのこういうところ好き。

## Twilioでやること

TwiML BinsとFunctionsのみを使い、
Twilio内で完結するようにしています。

### TwiML Binsの用意

Sayを使って、機械音声が流れるようにします。
これは後でFunctionsで使います。Sayで言わせる言葉は何でもOKです。

TwiML Binsは左側のメニューにあるRuntime（`</>`みたいな記号のメニューボタン）->
TwiML BInsというメニューを押して、開かれたページで`+`ボタンを押すと追加できます。

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Response>
  <Say language="ja-jp">お前のブログはもう死んでいる</Say>
</Response>
```

とりあえず不穏な言葉を言わせるようにしてあります。

### Functionsの用意

Twilioエヴァンジェリストの高橋さんの[記事](https://qiita.com/mobilebiz/items/34bf5a00853da34cbbde)のサンプルコードが、そのまままるっと使えます。

URLは今回は上で作ったTwiML BinsのURLを使用しています。
また、Functionsを外部から呼び出しできるように、
`Check for valid Twilio signature`のチェックを外しています。
これで外部からも呼び出すことが出来ますが、
このFunctionsのURLがバレるとイタズラでめちゃくちゃ呼び出されて、
料金がすごいことになり得るので、取扱には注意してください。

## デモ動画

TODO 動画貼る

深夜だろうがなんだろうが、とにかく15分毎にひたすら
電話かけてくるので否が応でも対応せざるを得なくてつらいです。

## まとめ

Googleでフェッチして、Twilioに通知。
Twilioが電話して、人間を叩き起こして、
サーバを復活させるってピタゴラスイッチみたいですね。

海外サーバからこのブログのサーバがアタックされていて、
けっこう死んでいたようでした。各種アタック対策をしたところ、
この死活管理ツールは今の所起動していないのが残念なような
嬉しいようななんとも言えない気持ちです。