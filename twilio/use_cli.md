# Twilio CLI 使ってみた

## やりたいこと

APIの戻り値の実物を見たいときに、
毎回TwilioのAPIで検索して、curlコマンドをコピーして、
アカウント情報を管理コンソールから探して、コピペしてに消耗していました。
そういえば、Twilio CLIあったなと思い、試してみることにしました。

今回はあるCall Sidを元にAPIの戻り値を取得しようとしました。

## インストール

https://github.com/twilio/twilio-cli

READMEに書いてあるので、コピペします。

brewだと、1回目にzipのダウンロードに失敗したけど、
もう一回実行したらインストールできた。
npm or yarnだと、問題ないらしい。

## インストール後やること

### ログインする

`twilio login`を実行すると、プロジェクト名、アカウントSID、Auth Tokenが求められるので、
入力します。

### オートコンプリートを有効にする

`twilio autocomplete`を実行すると、
オートコンプリート情報を`bash profile`に設定するためのコマンドが表示されます。
表示されたコマンドをコピペして、実行します。

twilio と入力して、tabキーを2回押すと使えるコマンドが
バーっと出ますが、1000以上あるらしいので、もう少し絞れるように調べます。

### ざっくりできることを調べる

`twilio`と入力すると、下記が出ます（2019年6月14日時点）

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

今回はCall Sidを元に、voiceの検索したいのが
そもそもやりたいことなので、voiceのapiを探します。

`twilio api:voice`でtabキーを押すと、
オートコンプリートされるので、使っていて感触が良いです。

```
twilio api:voice:v1:
dialing-permissions:bulk-country-updates:create                dialing-permissions:countries:high-risk-special-prefixes:list  settings:create
dialing-permissions:countries:fetch                            dialing-permissions:countries:list                             settings:list
```

ただ、現状voiceに関するコマンドはこれしかないらしく、
今回やりたいことはやれなさそうです。

### せっかくなのでTaskRouterで試してみる

TaskRouter関連のコマンドが充実していたので、試してみました。

ひとまず、workerの一覧を取れそうな`twilio api:taskrouter:v1:workspaces:workers:list`を試します。

```
twilio api:taskrouter:v1:workspaces:workers:list
 ›   Error: Missing required flag:
 ›     --workspace-sid WORKSPACE-SID
 ›   See more help with --help
```

なるほどね〜。エラーを見ながら学んでいくスタイルになりそうです。

必要そうなパラメータを渡して、再チャレンジ。

```
twilio api:taskrouter:v1:workspaces:workers:list --workspace-sid WSxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
SID                                 Friendly Name         Available
WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  eiichi_nishiguchi     true
WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  john_doe              false
WKxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx  john_doe              false
```

取れました！Availableまで取れるのはけっこう便利ですね。
一番上のworkerであるeiichi_nishiguchiのAvailableをfalseにして、
再度コマンドを実行したところ、ちゃんとfalseに変更されたので、
リアルタイムでちゃんとAPIを取得しているようです。

ちなみにTaskRouterは下記のようなコマンドが提供されています。

```
twilio api:taskrouter:v1:workspaces:
activities:create                       remove                                  task-queues:remove                      workers:channels:fetch                  workers:statistics:list
activities:fetch                        statistics:list                         task-queues:statistics:list             workers:channels:list                   workers:update
activities:list                         task-channels:create                    task-queues:update                      workers:channels:update                 workflows:create
activities:remove                       task-channels:fetch                     tasks:create                            workers:create                          workflows:cumulative-statistics:list
activities:update                       task-channels:list                      tasks:fetch                             workers:cumulative-statistics:list      workflows:fetch
create                                  task-channels:remove                    tasks:list                              workers:fetch                           workflows:list
cumulative-statistics:list              task-channels:update                    tasks:remove                            workers:list                            workflows:real-time-statistics:list
events:fetch                            task-queues:create                      tasks:reservations:fetch                workers:real-time-statistics:list       workflows:remove
events:list                             task-queues:cumulative-statistics:list  tasks:reservations:list                 workers:remove                          workflows:statistics:list
fetch                                   task-queues:fetch                       tasks:reservations:update               workers:reservations:fetch              workflows:update
list                                    task-queues:list                        tasks:update                            workers:reservations:list
real-time-statistics:list               task-queues:real-time-statistics:list   update                                  workers:reservations:update
```

うん、だいたいの情報参照と更新ができそうですね。

TaskRouter使ってるとまれによくあるのですが、
WorkerのFriendly Nameはわかるけど、Workerの情報がほしいということも
Twilio CLI使えば可能です。
Twilio管理コンソールでは提供されていない機能なので、実はすごい便利だと思います。
上記をshell芸をファイルにして、FriendlyName部分を引数で受け取れるようにするのが良さそうです。