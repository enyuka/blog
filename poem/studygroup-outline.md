# 社内勉強会 10 回を迎えたのでまとめ

こんにちは。開発事業部の西口です。

年始から始めた社内勉強会が無事に 10 回目を迎えたので、経緯などをまとめていこうと思います。社内勉強会を始めたい人、始めたけどうまく行かなかった人などに参考になればうれしいです。

## そもそも、なぜ勉強会を始めたのか？

詳細は後で紹介するスライドの通りですが、理由は下記です。

### 売上向上への貢献のため

ベルフェイスのような IT 企業において、自己組織化した自律的に動くエンジニアチームを作ることが、売上貢献につながると考えていました。

ベルフェイスではエンジニアは大きく分けて 2 つの事業部に所属します。この 2 事業部間でコミュニケーションを取る場が少なく、部をまたいだ自己組織化は難しいと感じていたため、コミュニケーションを取る場を作り、技術的に研鑽できるエンジニアチームにしようと考えました。この場を通して、自己組織化したチームが売上向上に貢献するのでは？と仮説を立て、はじめました。

### ベンチャーのデフォルトの結末である死を避ける

ブリッツスケーリングという本から引用すると、`ベンチャーのデフォルトの結末は死`です。

エンジニア観点から見た、明日の死の可能性は現状のレガシーシステムです。求職票を見てもらえばわかるとおりですが、 CakePHP2 が現役で動いています。現役で CakePHP2 を使うということは下記の様な問題があります。

* セキュリティサポートが 2021 年 6 月終了予定
* 若くて優秀な人材を採用する際に足かせになる
* 会社のビジョン、 Technology for Sales と不一致

そこで死を避けるために、リプレイスをしないのか同じ事業部のエンジニアに聞いたところ、別の事業部のエンジニアが進めていると聞きました。ここで事業部の壁を感じました。

社内勉強会であれば、コミュニケーションの障壁を下げつつ、リプレイスに関するディスカッションの場としても機能しそうだと考えました。

## 社内勉強会を定着させるためにやったこと

僕と同じように社内勉強会を始めたが、うまく行かないというのはよく聞きます。僕も何回かやったところ、いろいろと問題が起きました。

### 参加者数が少ない問題はこだわりを捨てることで解決

当初は`エンジニアが部署をまたいでやる`というこだわりを持ち、エンジニアだけに広報していましたが、なかなか参加者が集まりづらい状況でした。そこで、当初のこだわりを捨てて、職種を無視して、広報するように切り替えました。僕から発信よりも、会社でいろんな事業部とすでにリレーションを築いていた広報のエミさんに目をつけて、勧誘したところ、無事に手伝ってくれることになり、今も感謝しています。

エミさんのリレーションも活用したところ、エンジニア以外も多く参加するようになり、最近は 20 名程度で推移しています。 20 名は全社の 1 割弱で自主的な勉強会としてはよい数字だと思ってます。

### オンラインでも社内勉強会はできる

最初は新橋オフィスで社内勉強会をやっていましたが、まさかの 2 回目でコロナの流行が本格化してきて、出社ができなくなりました。その後、社外のオンライン勉強会に参加し、そこで得た配信方法やオンラインならではのコミュニケーション方法などを社内勉強会にフィードバックしつつ、オンラインに移行していきました。

現在は zoom で画面共有しながら登壇し、あえて**参加者のマイクオン**も OK にしています。

登壇する人はわかると思いますが、アイスブレイクのネタが受けてるのか受けてないのかわからず、不安になりますよね。そういう意見を受けて、マイクオンでちゃんと反応が見えるようにしています。また、 Slack でアイスブレイクの質問をして、マイクオフの人もそこのスレッドで和気あいあいとしています。

![ss 2020-08-02 16.18.18](./ss%202020-08-02%2016.18.18.png)

肉はメロディー...?????

## 社内勉強会のテーマ振り返り

ここから 10 回に渡って行った社内勉強会でのテーマ振り返りをします。

### 第 1 回 社内勉強会をなぜやるか

登壇者は僕です。リプレイスのリーダーとして開発事業部のエンジニアです。
この記事に書いたような内容を話しました。詳細は文末のスライドのとおりです。

### 第 2 回 モノリシックからマイクロサービスへ

登壇者は DevOps の浸透を進めているエンジニアリーダーの是永さんです。資料非公開ですが、前職での経験を踏まえて、マイクロサービスの俯瞰的な概要とベルフェイスでどうマイクロサービス化を薦めるかのテーマでした。

### 第 3 回 Twilio をはじめる人へのメッセージ

登壇者はまたしても僕です。 Twilio のイベントで登壇依頼があったので、練習したのですが、イベントテーマが大幅に変わり、このスライドはお蔵入りに・・・

### 第 3 回 Slack アプリを使ってデイリースクラムを効率化

これまたまたしても是永さんの Slack アプリを使ってデイリースクラムを効率化です。
スクラムという開発手法があり、その中にデイリースクラムという 15 分の業務連絡を行うプロセスを効率化するという内容でした

### 第 4 回 レガシーコードつらみの背景と改善した・してるところの紹介

デザイナーの平野さんから現行システムのレガシーなところのつらみの背景と改善していることの紹介でした。こちらも資料社外秘です。

### 第 4 回 雑に理解しない最近のCookie事情

ともにリプレイスを進めているリードエンジニアの木山さんが話してくれました。
クッキーの最新事情についてです。機能的な最新の話から、非機能要件までまとまっていて、難易度は高かったですが、いい内容でした。こちらも資料社外秘でした。

### 第 5 回 使いにくさはどこから生まれるのか？オブジェクトベースのUI設計 [入門編]

デザイナーの栗山さんから、オブジェクトベースでの UI 設計手法である OOUI についてです。
OOUI は最近日本語訳の本も出たばかりで、僕もはじめて聞きました。添付した画像にあるようなピザ屋のウェブサイトといった身近な例を添えてくれたので、わかりやすかったです。

### 第 6 回 文章はルールにのっとれば誰でも書ける

経営企画室社内広報のエミさんから、いい文章の書き方についてです。
タイトルにある通り、いい文章の裏にある書き方のルールについてまとまっています。ちなみにこの記事もルールにのっとって書いています（つもり）。

### 第 7 回 GitOps環境におけるremote_clusterでの開発

ともにリプレイスを進めているエンジニアの大平さんのコンテナ技術についてです。
KubeFest Tokyo で LT したときの練習です。参加者 1,000 人越えのイベントでプロたちに向けて話すということで緊張感ありそうでしたが、しっかりと練習できていました。

### 第 8 回 動画編集のススメ

コーポレートグループ(いわゆる情シス)の石塚さんから動画編集についてです。
どうやって動画編集を学ぶか。また、社内報の記事で取り上げたチャオズキッチンの動画での裏話などを話してくれました。

### 第 9 回 ビデオSaaSのエンジニアリング最前線(社外勉強会)

またまた登壇者は僕です。友達の CTO と社外勉強会として開催しました。
[ビデオSaaSのエンジニアリング最前線](https://webrtc-users.connpass.com/event/180262/)

はじめて開催側としてイベントをやってみたところ、学ぶことが多かったです。また、はじめてのイベントでしたが、 50 名参加者も集まり、[ハッシュタグ](https://twitter.com/search?q=%23video_saas)もなかなか盛り上がったのでありがたかったです。

### 第 10 回 社内勉強会のふりかえり

これもまた僕です。 10 回目ということで、今まで参加していなかった人もいたので、改めてなんで社内勉強会をやっているのかと、今後の改善施策について話しました。

## データの推移

10 回を経て、データ的にどうなったかをまとめます。

### 定量的な話

最初に参加していた部署はエンジニアを中心に、 3 部署ではじめていたのですが、 10 回時点で 13 部署まで増えました。当初の目的であった部署をまたいだコミュニケーションの場としては上々な推移だと考えています。

### 定性的な話

TODO

## ファーストフォロワー

初回から比較すると定量・定性共に改善していますが、 20 名ほどの参加者数で会社全体としては 1 割弱といったところです。まだまだ伸びしろがあると考えています。

最近ではエンジニア以外でも常連の参加者が増えてきており、ファンも増えてきましたｗ

![](./hie.png)
ﾋｴｰ

今回の社内勉強会のような新しい取り組みに積極的に参加してくれる人を`ファーストフォロワー`と呼びます。詳しくは下記の動画のとおりです。

https://www.youtube.com/watch?v=qdwO1l5nKyg

今いるファーストフォロワーを大事にし、フォロワーのフォロワーが更に集まって、より全社的な取り組みになるようにさらに改善を進めていきます！ファーストフォロワーが勉強会に参加し続けてくれて、さらに同じ部署の人が参加してくれるようになるよう施策を打っていくつもりです。