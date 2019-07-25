# Twilio CLI 使ってみた

こんにちは、[@24guchia](https://twitter.com/24guchia)です。

TwilioはAPIでいろいろな機能が提供されていますが、
実はCLI(Comman Line Interface)が下記Githubで目下実装中です。
[https://github.com/twilio/twilio-cli](https://github.com/twilio/twilio-cli)

今回はTwilio CLIを試してみました。
先に結論から書くと、かなり便利で気に入りました。
tabキーによるオートコンプリート機能、
統一されたコマンドとオプション書式、
わかりやすいhelpオプション、shellファイルに組み込みやすい点など
こういうのがほしかったという所感です。

なお、Twilio CLIは現在プレリリース版で正式版ではないので、
プロダクトに組み込むかどうかは各自でご判断ください。
また、コマンドの結果などは、執筆したときの内容です。

## やりたいこと

APIの戻り値の実物を見たいときに、
毎回TwilioのAPIで検索して(意外と検索しても該当のページに辿り着きづらい・・・)、
curlコマンドをコピーして、アカウント情報を管理コンソールから探して、
コピペしてと手順がかなり面倒で、消耗していました。
そういえば、Twilio CLIあったなと思い、試してみることにしました。

今回はあるCall Sidを元にCLIで検索をしてみます。

## インストール

[README](https://github.com/twilio/twilio-cli#setup)に書いてあるので、コピペします。

brewだと、1回目にzipのダウンロードに失敗したけど、
もう一回実行したらインストールできました。
npmだと、1回で問題なくインストールできました。

## インストール後やること

### ログインする

`twilio login`を実行すると、
プロジェクト名、アカウントSID、Auth Tokenが求められるので、入力します。

### オートコンプリートを有効にする

`twilio autocomplete`を実行すると、
オートコンプリート情報を`bash profile`に設定するためのコマンドが表示されます。
表示されたコマンドをコピペして、実行します。

`twilio`と入力して、tabキーを2回押すと使えるコマンドが
バーっと出ますが、1000以上あるので、もう少し絞れるように調べます。

### ざっくりできることを調べる

`twilio`と入力すると、下記が出ます。

```
twilio
unleash the power of Twilio from your command prompt

VERSION
  twilio-cli/1.2.0 darwin-x64 node-v10.16.0

USAGE
  $ twilio [COMMAND]

COMMANDS
  api            advanced access to all of the Twilio APIs
  autocomplete   display autocomplete installation instructions
  feedback       provide feedback to the CLI team
  help           display help for twilio
  login          add credentials for an existing Twilio project
  phone-numbers  manage Twilio phone numbers
  plugins        list installed plugins
  projects       manage credentials for Twilio projects
```

### apiを探す

今回はCall Sidを元に、callの検索をしたいので、callのコマンドを探します。
ちょっと分かりづらいのですが、callのコマンドは
`api:core:calls`の下にいます。

`twilio api:core:calls`と入力し、tabキーを押すと、
オートコンプリートされるので、使っていて感触が良いです。

```
twilio api:core:calls:
create                   fetch                    recordings:fetch
feedback-summary:create  list                     recordings:list
feedback-summary:fetch   notifications:fetch      recordings:remove
feedback-summary:remove  notifications:list       recordings:update
feedback:create          notifications:remove     remove
feedback:list            recordings:create        update
```

fetchがあるので、これを使って探してみます。

### Call Sidを元に通話を探す

fetchで探せそうだけど、Call Sidの渡し方がわからないので、
helpを出してみます。各コマンドに`—-help`をつけると
説明が見れるので、付けてみましょう。

```
twilio api:core:calls:fetch --help
Fetch the call specified by the provided Call SID

USAGE
  $ twilio api:core:calls:fetch

OPTIONS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv)            [default: columns] Format of command output.
  -p, --project=project            Shorthand identifier for your Twilio project.

  --account-sid=account-sid        The SID of the Account that created the
                                   resource(s) to fetch

  --properties=properties          [default: sid,from,to,status,startTime] The
                                   properties you would like to display (JSON
                                   output always shows all properties).

  --sid=sid
```

`--sid`をつければ良さそうです。

```
twilio api:core:calls:fetch --sid CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SID                                 From           To             Status     Start Time
CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  +8150xxxxxxxx  +8180xxxxxxxx  completed  Jun 11 2019 17:52:37 GMT+0900
```

取れました！けっこう見やすいです。
ただこれだと、curlで取得した結果より情報が少ないです。
[https://www.twilio.com/docs/voice/api/call?code-sample=code-fetch-a-call&code-language=curl&code-sdk-version=json](https://www.twilio.com/docs/voice/api/call?code-sample=code-fetch-a-call&code-language=curl&code-sdk-version=json)

しかし、その問題もアウトプット形式をjson形式に変えるとcurlと同様の結果が帰ってきます。
アウトプット形式をjson形式に変えるのは、`-o json`とつければOKです。
実際にやってみると下記のような結果が返ってきます。

```
twilio api:core:calls:fetch --sid CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx -o json
[
  {
    "accountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "annotation": null,
    "answeredBy": null,
    "apiVersion": "2010-04-01",
    "callerName": "",
    "dateCreated": "2019-06-11T08:52:26.000Z",
    "dateUpdated": "2019-06-11T08:52:37.000Z",
    "direction": "outbound-api",
    "duration": "0",
    "endTime": "2019-06-11T08:52:37.000Z",
    "forwardedFrom": null,
    "from": "+8150xxxxxxxx",
    "fromFormatted": "+8150xxxxxxxx",
    "groupSid": null,
    "parentCallSid": null,
    "phoneNumberSid": "",
    "price": 0,
    "priceUnit": "JPY",
    "sid": "CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "startTime": "2019-06-11T08:52:37.000Z",
    "status": "completed",
    "subresourceUris": {
      "notifications": "/2010-04-01/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Calls/CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Notifications.json",
      "recordings": "/2010-04-01/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Calls/CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Recordings.json"
    },
    "to": "+8180xxxxxxxx",
    "toFormatted": "+8180xxxxxxxx",
    "uri": "/2010-04-01/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Calls/CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.json"
  }
]
```

完璧ですね。

## curlとの違い

結果同じなら、curlコマンドでもよくね？となりますが、
Twilio CLIを使うメリットは下記だと考えています。

1. セキュリティがcurlより強固
2. コマンドがcurlより短い

### セキュリティがcurlより強固

CLIは`login`コマンドでAuth Tokenを一度入力し、
クレデンシャルを作った後、廃棄されます。
そのため、Auto Tokenを見せたくないメンバーに伝える必要がなく、
サーバに侵入されたとしてもAuth Tokenは保持されないため、
漏洩のリスクが少なくできます。

`curl`コマンドだと平文で使うことになり、
`history`で辿られたり、shellファイルなどに残ってしまうため、
Account SidとAuth Token両方漏洩のリスクがあります。
この2つを取られてしまうと、勝手に電話やSMSを送られるなど、
相当なリスクになってしまいます。

APIを実行結果と、各種Linuxコマンドを組み合わせて
shellファイルなどを作る場合はCLIのほうがおすすめです。

### コマンドがcurlより短い

CLIだと、Account SidもAuth Tokenも不要です。
そのため、入力するコマンドが短くできます。
比較すると下記の様になります。

まずは、CLIでcallをfetchするコマンドです。
`twilio api:core:calls:fetch --sid CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

次に、curlでcallをfetchするコマンドです。
`curl -X GET 'https://api.twilio.com/2010-04-01/Accounts/ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/Calls/CAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx.json' -u ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx:your_auth_token`

CLIのほうがかなり短いですね。
毎回Account SidやAuth Tokenを入力しなくていいだけで、
かなり楽になります。

## まとめ

触ってみた所感、かなり好感触。
Linuxコマンドなので、パイプでTwilio以外のいろんなコマンドと
連携しやすいのが非常に魅力的です。

これを使って何を作るかはみなさんのアイデア次第です。
皆さまが何を開発されるのか、目にするのが待ちきれません！