# Twilio Video の OSS が出ました

[Deploy your own video collaboration app in five minutes or less](https://www.twilio.com/blog/open-source-video-apps-reactjs-ios-android)

Twilio Video が使えて、かんたんにビデオチャットができる OSS が Twilio 社よりでました。

特長としては、
- マルチプラットフォームで使える
  - Web(ReactJS)
  - iOS
  - Android
- ノーコードでとりあえず動かせる
- ビデオチャットで求められる要件がだいたい満たされている
  - 画面共有
  - カメラの有効化・無効化
  - マイクのミュート・アンミュート
  - 電波状況のモニター
  - Dominant Speaker(一番声が大きい人)を検出してくれる

というわけでやってみました。

## セットアップ

[https://github.com/twilio/twilio-video-app-react](https://github.com/twilio/twilio-video-app-react)

GitHub の README に従ってセットアップすれば OK です。各種ツールのセットアップは飛ばします。

### Twilio の各種設定値を取得し、.env に設定する

起動するために Twilio から各種値を取得し、`.env`設定します。

GitHub からリポジトリを clone してきて、 README の`Running the local token server`にある通りに`.env.sample` をコピーして、`.env`ファイルを作成します。

`cp .env.sample .env`

その後、各種値を`.env`に設定します。

#### TWILIO_ACCOUNT_SID

[コンソール](https://jp.twilio.com/console)の`アカウントSID`からコピーします。

TODO 画像貼る

#### TWILIO_API_KEY_SID と TWILIO_API_KEY_SECRET

`Programmable Video` > `ツール` > `API Keys`で新規でも既存のでも構いませんが、 API キーと API シークレットを取得します。

TODO 画像貼る

最終的に、`.env`は下記のようになります。

```
TWILIO_ACCOUNT_SID=AC91c7777488ab57526711fxxxxxxxxxxx
TWILIO_API_KEY_SID=SKe02e16bf2769837658adxxxxxxxxxxxx
TWILIO_API_KEY_SECRET=0Btmyt69OiHxxxxxxxxxxxxxxxxxxxxx
```

### ローカルで起動する

clone してきたディレクトリで下記コマンドを実行すると`localhost:3000`でビデオチャットが起動します。

`npm start`

TODO 画像貼る

参加者の名前を Name, 参加する部屋を Room に入れて同名の Room に参加者が入るとビデオチャットが始まります。

TODO 画像貼る

画面共有もこんな感じでできます（Mac の場合、セキュリティの設定を変更する必要あり）

TODO 画像はる

カメラとマイクのミュート・アンミュートも下部のボタンで動き、電波状況も可視化されます。
画面共有すると、Insufficient Bandwidth になるのは仕様でしょうか？画面共有時にも相手の顔が出るようになるとより良さそう。

#### 注意: On Your Network にある URL はモダンなブラウザでは動作しません

`npm start`すると下記のようなログが出ます。

```
[dev] You can now view twilio-video-app-react in the browser.
[dev]
[dev]   Local:            http://localhost:3000/
[dev]   On Your Network:  http://192.168.11.9:3000/
```

On Your Network にある URL を開いてもエラーが出て表示されませんが、これは**ブラウザの仕様**です。`getUserMedia`は https でないと動作しません。localhost を利用してください(このログ、なんで出しているんだろう・・・)。
参照： https://bugzilla.mozilla.org/show_bug.cgi?id=1335740

### 気になったこと

#### 参加者の最大数

[ドキュメント](https://www.twilio.com/docs/video/tutorials/understanding-video-rooms#comparing-room-types)によると、部屋にも種類があるようです。

Small Group だと4人まで、 Regular だと50人まで参加できるようです。最大参加者数がかなり多いですね。

#### 配信方法

[ドキュメント](https://www.twilio.com/docs/video/tutorials/understanding-video-rooms#comparing-room-types)によると SFU を採用しています。

参加者は自身のカメラと画面共有で最大2つをパブリッシュし、参加者数 - 1 の動画をサブスクライブします。

描画方式に mode が存在し、 mode によって、サブスクライブする使用帯域の割当方法が変わるようです。 例えば、`Collaboration`の場合、使用帯域が十分であれば、全員描画を行い、帯域が少なくなると優先度が低い参加者のビデオはオフにされ、優先度が高い参加者がちゃんと表示されるよう工夫されているようです。
優先度は参加者に指定できたり、直近たくさん話している人の優先度が上がるようです。

#### Dominant Speaker の検出

[Dominant Speaker](https://www.twilio.com/docs/video/detecting-dominant-speaker)とは、（比喩ではなく）一番声が大きい参加者を指します。

10人の参加者がいるとして、表情を見ないといけない人は黙って聞いている人ではなく、今まさに発言している人であるというのは容易に想像ができると思います。これが検出できると参加者のビデオ比率を Dominant Speaker を大きくするといったことが可能になります。

けっこう実装はめんどくさそうですが、 Twilio Video であればすばやく実装ができそうです。

## まとめ

10分もあればビデオチャットが起動でき、マルチプラットフォームという便利な OSS でした。

Twilio ってなんですか？って聞かれたときに、電話や SMS を Web API で呼び出すサービスといつも説明しているのですが、最近は Video にも注力を始めているようです。昨今のテレワーク注力化の時流に乗って、 Twilio Video も流行るとうれしいですね。