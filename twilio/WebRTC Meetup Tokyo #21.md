# WebRTC Meetup Tokyo #21 参加レポート

こんにちは、[@24guchia](https://twitter.com/24guchia)です。

先日参加したWebRTCミートアップの参加レポートです。
https://atnd.org/events/105581

聞く側兼、話す側でした。
このイベント、話す側もしたのは年始に書いた記事で
Twilio以外のコミュニティに顔出ししたいと書いた目標のためです。

http://harinoma.info/?p=140

引き続きやっていきたい。

## AV1と特許の話(仮)

### [dynamis (でゅなみす)](https://twitter.com/dynamitter) さん

AV1という実用的で普及が進んでいるフリーの動画コーデックがに関して。
最近SISVELっていう会社がパテントプールを形成した。
そのプールに従い、使用料が発生するかも。という話（という認識）

https://speakerdeck.com/dynamis/av1-patent-issue

### 個人の感想

WebRTCの動画部分はほとんど門外漢なので、
正直理解が追いつかない部分があって、家帰ってから歴史などを調べた。
現状としては、先のことなので読みづらいが、
特許料や代替可能な技術かどうか、特許料を払わず徴収される場合のリスクを踏まえ、
どう動くか、各社や業界が選択していくことになりそう。

上記のスライド、38ページにあるように、また夏に動きがありそうなので、
注目しておいたほうが良さそうですね。

あと、QoSは当然聞いたことがあったが、
QoE(Quality of Experience)という体感品質を評価するサービスがあるのが初耳だった。
https://vm.webdino.org/

電話の管理をしているとQoSを調整し、各通話のデータ上の品質が高くても、
結局、各個人がどう思うかは全然別物だと感じているので、おもしろい試みだと思った。

## ライブ配信サービスのバックエンド

### hhan さん

韓国の[リモートモンスター](https://www.remotemonster.com/)という配信サービスを提供している方の発表。
スライドなどは見つけられてない。

[Janus](https://janus.conf.meetecho.com/index.html)というWebRTCのコアの操作やプラグインが提供されているLinuxベースのソフトウェア。
DockerとAWSを組み合わせているため、APIでスケールアウトがかんたんで、
Janus自体のアップデートも楽とのこと。
ドキュメントの難解さや、実際に使いこなすのは難しいらしいが、
だいたいどんな技術もそんなもんだよなという感覚なので、
サービスで必要になったら調べてみたい。

### 個人の感想

韓国でWebRTCの技術について話す場がなくて、
日本語が話せるからわざわざ日本にまで来てセッションしたとのこと。
この行動力見習いたい。

## TwilioとWebRTC

### どうも僕です

https://www.slideshare.net/ssuser4d37c8/twiliowebrtc

Twilioユーザならみんな対応したと思われる、
ChromeのUnified Plan対応に伴うTwilio Clientのアップデートと
TwilioのWebRTC関連部分を話しました。
Client使うとWebRTCすっ飛ばして作り始められるけど、
WebRTCの知識は後々必要になる日が来るよっていう話。

ClientのバージョンアップでTwilioを知らない後輩を疎通テストに
アサインするにあたり、なんで今回のバージョンアップが必要か、
TwilioとWebRTCに関して資料をまとめて説明したことを
そのままスライドに起こしました。
その後輩が一つでも理解してくれてるとありがたいんですけど、
果たしてどうなんでしょうね・・・

LT自体はいつも通りで、最近はあんまり緊張しなくなりました。
場数と練習が大事ですね。
あと、ぎっくり腰アイスブレイクがけっこうウケたので、
腰がブレイクしたのは怪我の功名という感じで、当面使っていきたい。

再度資料をまとめるにあたり、Clientはモダンブラウザをサポートし、
iOS,Androidが使え、PSTNやSIP、LINE通話までサポートしていると
ほぼ全部盛りなのはやっぱ便利だよなーと思いました。

## Google Cloud Runはシグナリングに使えるか？

### [@massie_g](https://twitter.com/massie_g) さん

[Cloud Run](https://cloud.google.com/run/)とは、GCPの新しいサービスです。
betaです（2019年6月2日時点）

https://qiita.com/massie_g/items/f1ffed2de52ff6a0d264

stateを持たないサーバレスのコンテナ技術とのことです。
http(s)は使えるが、WebSocketは使えないらしい。
WebSocketが使えないので、Cloud Runはシグナリングに使えません、終わり。

となるところですが、Long Pollingで実装する力技でシグナリングしてました。
デモのビデオ通話も動いてましたね。

とはいえ、業務レベルでやるとなるとなかなか問題ありそうという
締めくくりでした。まあなんでも技術選定は大事ということで・・・

## Chrome M75から chrome://webrtc-internalsが新しくなります

### [Yusuke Naka@SkyWay](https://twitter.com/Tukimikage) さん

これ初耳でしたが、よく使う機能なので、
どう良くなるかが楽しみです！
先述のClientのバージョンアップでも、Unified Planで通信しているかの
確認で使いました。

https://qiita.com/yusuke84/items/428affe75affa16f104d

使ってみないとどう変わったかがわからないというのが正直なところなので、
明後日のChromeアップデートで早速使ってみようと思います。

## まとめ

LTするに当たり、改めてWebRTCについて調べられ、
非常に良い勉強になりました。

月並みですが、LTや発表するとその技術について再度調査を迫られるので、
発表ドリブンで勉強するのは有用だと思います。
発表することで詳しい人だと思ってもらえる、
勉強会後で色んな有用な情報が集まる、
スライドを作ることで経歴をまとめられるなどのメリットがあります。

最近、下記ツイートがバズってますが、僕もこの手の人間で、共感してます。
人見知りでも練習すればできる、人前立ってもそもそも緊張しない
豪胆な性格なら恐れることはない。LTどんどんやっていきましょう。

https://twitter.com/pianonoki/status/1134201555631001601