# Twilio.Taskrouterを調べて使ってみた



## Twilio.Syncで受電割り振りすると言ったな

**URL貼る**

あれは嘘だ



## 変更の経緯

そもそもSyncでデータの中身に対して、クエリを発行する方法がない。

そのため、全件取得して中身を取り出して、該当する人だったら

その人に通話を割り振るとしていたが、500件mapに入れたら検索だけで10秒位かかった。

遅すぎて流石に厳しいので、ACDに特化したtaskrouterについて調べた



## Taskrouter概要

概念としては下記の通り。

* Workspace
  * 以下概念を入れるための入れ物
* Workflow
  * ACDとして、どの呼をどのTaskqueue（後述）に入れるかのルール設定ができる
  * 挙動としては、一般的なSwitch文、記述はJSON形式で、評価はSQLライクの評価ができる
* Taskqueue
  * 呼を入れて、待たせる。保留と同等なので、架電側には保留音が流れる
  * FIFOとLIFOが選べる
  * このTaskqueueに入っているTask(後述)をどの属性を持ったWorker(後述)が対応可能かフィルタできる
  * 一般的な使い方はTaskqueueにセールス部門、サポート部門、全社員というような使い分けを行う
* Task
  * 受電した呼に属性をJSONで持たせたもの
  * Taskが持っている属性でWorkflowの評価が行われ、Taskqueueへキューされる
  * 受電以外にチケットとかも使えるらしいので、Taskという名前らしい
* Worker
  * Taskを対応する人。オペレーターや営業など
  * Task同様、JSONで属性を持つ。Taskqueueのフィルタの際に評価される
  * 例えば、Aさにセールス部門という属性をもたせ、Bさんにサポート部門という属性をもたせて、得意なTaskをこなせるように設定する
  * Task対応できるかどうかの属性(available)やどういう状況(Activity)を持たせる



Workflowによって、タスクキューという通話一覧にキューされる。

優先度と時間によってエスカレートする仕組みがある。

タイムアウトの時間設定ができるので何秒か対応できなかったら、自動でエスカレートする。



## 振り分け処理について

先述の通り、Workflowsに設定しているJSONで振り分けを行っている。

task_routingに設定されているfiltersはswitch文のように動作する。

filtersのexpressionに合致するタスクはそのfilter内のtargetsに沿って通話振り分けが行われる。

いずれにも一致しない場合、default_filterのキューに入れられる。

### expressionの文法

SQLライク。JSONのキーバリューを走査してくれる。

ANDとORで接続する。一般的な比較ができる、==,!=,>,<,HAS,CONTAINS,IN,NOT INが使える。

型はString,Numbers(int and float),Booleanがある。配列も使える。

タスクにJSONで属性つけるとexpressionでの評価対象になる。



## Taskrouterってどうやって作るの

いつも通り、管理コンソールかREST APIで作る。

https://jp.twilio.com/console/taskrouter/workspaces/create



## で、Twimlでどうやって使うの

Enqueueでworkflowに入れる。

そのときにTask名詞でexpressionの評価対象になる属性の設定ができる。



## で、クライアントではどう使うの

JavaScriptSDKが用意されているのでそれを使う。

Taskrouter.js

トークン生成が必要なので、サーバ必須。

ここのところ激プッシュしてるFunctionsでもOKらしい。動画参照

https://www.youtube.com/watch?v=XMg5ytgyn1E



## Taskrouterを使う場合の受電の流れ

1. 受電するとtwilioの受電時Webhookが呼ばれる
   1. この画面で管理してるやつ → https://jp.twilio.com/console/phone-numbers/incoming
2. 1で呼び出されたWebhook内でTaskをあるWorkflowにenqueueするtwimlを生成する
3. twilioでWorkflowの処理が呼び出だされTaskの属性とWorkerの属性によってタスク割り振りが決定し、予約が作成する
4. 割り振りされたら、コールバックが呼ばれる
   1. この画面で管理してるやつ → https://jp.twilio.com/console/taskrouter/workspaces/WSxxx/workflows/WWxxx
5. 4で呼び出されたコールバック内で、タスクをどうするかを決める処理を行う
   1. 今の使っているのはVoiceのみのため、基本的に全部callでWorkerのcontact_uriに電話かける
   2. Voice以外のタスクを取り扱うようになったら、適切なチャネルに流れるように設計する必要がある
6. クライアントに電話がかかる
   1. 具体的にはTwilio.Device.incomingとworkerのイベントでresevation.createdが**並行**して呼ばれる。
   2. 並行に呼ばれるのはかなり厄介なので、他はどうしてるか知りたい

受電のフローはこうです。

## Taskrouterの勘所

**Taskとあるが、Queue(保留)の仕組みを組み合わせているだけ**

これが理解できておらず、苦労しました。

* Taskrouterで割り振られた通話の親通話がなぜか取れない

  →callAPIの受電では親通話に紐付いて、クライアント側は子通話が生成されるが、Queueと同じ仕組みのため、

  割り振られた受電でも、Queueに入っている通話に対して架電しているので、親子関係が生成されない

**ACDって要するにロードバランサーだよね**

Automatic Call Distributor/着信呼自動分配装置って、名前いかついし

そんなのWebで似た概念ないよな・・・って思ってたけど、

ロードバランサーと同じってのに気づくと、よく分からないものから

なんとなくイメージが付けやすくなると思います。



## 良いところ

* 振り分け、タイムアウト、エスカレートできる
  * ACDだから当然っちゃ当然ですが
* ソースを修正せずに、管理コンソールだけで受電振り分け設定を変更できる
  * 注意として、管理コンソールだけでは使用できない設定があり、更にAPIで設定しても管理コンソールに表示されないようなので、この事情を知らない人が勝手に変えると壊れる可能性があります
* 受電したとき、clientだとcurrentの親callを取らないどこからの受電分からないが、taskrouterだとreservation.task.attributesに入ってる
* taskの生成を行う際、JSONになんでも情報を持たせることができ、クライアントでtask.attributesで参照できる



## 困りどころ

* dequeue/callを使うと、クライアントの受電とアサインされたtaskの受電で2つとも同じ処理(Twilio.Device.incoming)を通るので、処理の切り分けが必要
  * dequeueだと、connection.parameters.ApiVersionがなぜかないが判断基準にするには微妙（そもそもない事自体がバグなのでは？）
* dequeue/callを使うと、Twilio.Device.incomingがreservation.createdより先に発火する***事が多い***。
  * 電話は鳴るが、アサインされたtaskが参照できないので若干無駄な瞬間がある
  * たまにreservationの方が速かったりするので、reservattion.createdを必ず待つことができない
* ワーカーのavailabilityを見て、割り振りするかの設定であるskip_ifが管理コンソールで変更できない
  * API呼び出しで解決
  * APIでskip_if付けても、管理コンソールに表示されないっぽい?
  * 反映はされているらしい
  * StackOverflowで聞いてるけど、回答が来なくて悲しい
  * https://stackoverflow.com/questions/46884250/how-do-i-configure-skip-if-on-twilio-taskrouter-workflow
* TaskQueueに対応可能Workerがいなくても、一旦キューに入ってタイムアウトまで待つ
  * 次のキュー判定に入るかどうかの設定がほしい
* TaskAttributesがマルチバイト文字が未サポート
  - 下記、気合のエンコードとデコードで解決
  - サーバ側(Php)でurlencode()でエンコードして、クライアント側(Taskrouter.js)でdecodeURIComponent(reservation.task.attributes.name)でデコードする
  - Syncではマルチバイト文字対応してるのになんでだろう





## REST APIではまったとこ(Php)

https://www.twilio.com/docs/api/taskrouter/workers

* Workerを作るAPIのオプショナルパラメータでドキュメントのFIELDがプログラムで使う連想配列のキーと一致しない
  * ActivitySidはactivitySid、Attributesはattributesをキーにする必要がある。ドキュメント仕事してくれ
* Attributesに設定するのは単純な配列じゃなくて、JSON化する必要がある
  * JSON化はtwilioのライブラリ側でやるでも良いような気がする
  * json_encode,json_decodeしないで文字列でゴリゴリJSONを扱うってあんまりないよね？
* Worker削除しようとする時に、そのWorkerのavailableがtrueだと削除できない。
  * 対応として、削除する関数にforce引数を付けて、force=trueだったら削除前にavailableがfalseのactivityに変えている。
* QuickStartのドキュメントは更新されてないので、APIは別でドキュメントを読む必要あり
  * https://www.twilio.com/docs/quickstart/php/taskrouter/reservations-create-task-rest
  * まあしょうがないね


## Taskrouter.jsではまったとこ（クライアント側）

* Workerのトークン生成でreservation更新を許可しておらず、403が出た
  * エラーメッセージがちょっと分かりづらい
  * 403 Policies defined such that we cannot access the given resource
  * dequeueでかかってきた通話をconnectするとreservationが更新されたのでより混乱してしまった
* Worker生成のオプションでdisconnectActivitySid設定しても、アクティビティが変わらない？
  * 60秒経ったらタイムアウトするっぽい？↓
  * https://www.twilio.com/docs/api/taskrouter/js-sdk/changelog#193-february-7-2017




## まとめ

困りどころ多いですね！

ただそれを差し引いても便利機能なので、がんばって実装しましょう。



## 後で使いそうなドキュメント

* 時間や曜日ルーティング
  * https://www.twilio.com/docs/api/taskrouter/time-day-routing



