# この記事を読むと分かること

* プロダクションで使うTaskrouterガチ構成が見れる
* WorkflowのルーティングのJSONファイルを公開するので、ドキュメントとは違うユースケースのルーティングを見れる




こんにちは、[@**24guchia**](https://twitter.com/24guchia)です。

[Twilio Advent Calendar 2017](https://qiita.com/advent-calendar/2017/twilio) の13日目です。



Taskrouterと1ヶ月ほど格闘し、得られた情報を社外秘のみ取り除いて、全部公開します。

Twilioドキュメント以外で、Taskrouterの記事が少なくいろいろと苦戦したので、

今後Taskrouter使う人の参考になれば良いなーと思います。



## 弊社の受電の仕様

受電の仕様は下記です。

- 受電した番号でDB検索し、担当者が存在するか確認する
- 担当者が存在する場合、担当者の電話機を鳴らす
- 担当者が電話を取らない場合、担当者と同じ部署の人の電話機をランダムで鳴らす
- 誰も受電出来ない場合、機械音声で担当できるものがいない旨を通知

割りとありがちな感じですが、企業側としては受電担当部門が不要になり、

お客様としては余計な取次による待ち時間が減らせることができます。

CTIの効果を感じられる仕組みだと思います。



## Taskrouterに落とし込むとどうなるか

### Workerの設定

Workerは電話機を使う人、一人に対して1Workerを必ず発行します。

独自で持たせている属性はメールアドレスと部署IDだけです。

FriendlyNameはemailからピリオドをアンダースコアにしただけのものを使用しています。

例：

```{"email":"hiroshi.abe@example.com,"contact_uri":"client:hiroshi_abe","department_id":1}```



### Activityの設定

デフォルトで生成されるものをそのまま使っています。



### Taskqueueの設定

TARGET WORKER EXPRESSIONに1==1を入れているだけの

キューをひとつだけ使用しています。Workflowだけでなんとかしています。



### Workflowの設定

設定しているJSONファイルは下記。

2か月前くらいは喉から手が出るほどほしかった設定ファイルです。

これだけだと、何も出来ないので好きに使ってください。

```
{
  "task_routing": {
    "filters": [
      {
        "targets": [
          {
            "queue": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "expression": "task.email==worker.email",
            "priority": "1",
            "timeout": "10"
          },
          {
            "queue": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "expression": "task.department_id==worker.department_id",
            "priority": "2"
          }
        ],
        "filter_friendly_name": "email",
        "expression": "filter=='email'"
      },
      {
        "targets": [
          {
            "queue": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
            "expression": "worker.department_id IN task.department_id",
            "priority": "3"
          }
        ],
        "filter_friendly_name": "department_id",
        "expression": "filter=='department_id'"
      }
    ],
    "default_filter": {
      "queue": "WQxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    }
  }
}
```



## WorkflowのJSONの解説

パッと見、filterって何してるんだろうと感じると思います。

これを説明するためにまず、Taskqueueの仕様について理解が必要です。



### Taskqueueの仕様

Taskqueueはキュー内に存在する、WorkerのAvailabilityはチェックしません。

そのため、割り振りしたけど、そのWorkerが離席してて受電できなかったというようなことが発生しました。



### こうやって回避した

離席している人の電話機を鳴らすということを回避するために、

Task発行前に担当するWorkerのAvailabilityをチェックするように変更しました。



Availabilityがtrueの場合、taskにキーが```filter```、値が```email```の属性を設定します。

falseの場合、taskにキーが```filter```、値が```department_id```の属性を設定します。

この属性はfilter_friendly_nameが```email```、```department_id```の下にあるexpressionで評価される際に使用します。



#### filterがemailの場合

targetsの中に2つのキューだけあります。

taskにemailの属性が設定されてあり、担当者のメールアドレスが情報として持たせてあります。

この属性を設定することにより、Taskqueueの中からWorkerのemailの属性が合致するものが選択されるため、

まず担当者の電話機が直通で鳴るようになります。



timeoutを10秒にしてあり、在席しているが取ることができなかった場合でも、

自動で次のQueueにエスカレートされ、次の判定であるdepartment_idが一致するWorkerの電話機を鳴らすようにしてあります。

担当者に直通で電話機を鳴らす場合の具体例：```{"person_name":"Alice","email":"hiroshi.abe@example.com","department_id":1,"filter":"email"}```



#### filterがdepartment_idの場合

targetsの中に1つだけキューがあります。

先の例と同様ですが、email情報は持っていません。

そのため、Taskqueueの中からWorkerのdepartmnet_idの属性が合致するWorkerが選択され、

担当者と同じ部署の誰かの電話機が鳴らすようにしています。



こちらはtimeoutを設定していないため、電話を切られるまで、

同じ部署内の誰かが電話を取るまで鳴り続けます。

担当者と同じ事業部の誰かの電話機を鳴らす具体例：```{"person_name":"Bob","department_id":1,"filter":"department_id"}```



### 回避した結果

この仕組で不在の担当者に一度着信させて、お客様を待たせるということをなくすことができました。



## まとめ

Twilioを利用するメリットはいくつもありますが、受電から担当者への取次時間を減らせるということは

Twilioを導入する企業、架電するお客様の双方に大きなメリットがあります。

* 直通で担当者につながることにより
  * お客様への安心感の提供
  * 取次が減らせるため、オペレーターが電話業務に取り掛かる時間が減る
  * 通話時間が減るので金銭的に通話料を節約できる



このようなメリットを感じられたら、ぜひTaskrouterの導入をおすすめします。