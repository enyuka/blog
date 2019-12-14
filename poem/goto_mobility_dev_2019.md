# MOBILITY:dev 2019 参加レポート

こんにちは、[@24guchia](https://twitter.com/24guchia)です。
MOBILITY:dev 2019に参加したので、まとめます。
[https://mobility-dev.connpass.com/event/143355/](https://mobility-dev.connpass.com/event/143355/)

日時：2019年10月31日 13:00~18:00
場所：渋谷ヒカリエ9階

`MOBILITY:dev`は移動と交通を技術で変えたいエンジニア向けのカンファレンスです。
MaaSに興味があり、参加しました。

## キーノートセッション ITエンジニアこそ実現できるモビリティのサービス化

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【登壇情報】公共交通オープンデータの推進活動などを行っている<a href="https://twitter.com/niyalist?ref_src=twsrc%5Etfw">@niyalist</a> 東京大学 生産技術研究所特任講師 伊藤昌毅氏に「ITエンジニアこそ実現できるモビリティのサービス化」「GTFSオープンデータで公共交通をアップデート」二つのテーマでお話いただきます。<a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://twitter.com/hashtag/%E3%82%AA%E3%83%BC%E3%83%97%E3%83%B3%E3%83%87%E3%83%BC%E3%82%BF?src=hash&amp;ref_src=twsrc%5Etfw">#オープンデータ</a> <a href="https://twitter.com/hashtag/MaaS?src=hash&amp;ref_src=twsrc%5Etfw">#MaaS</a> <a href="https://t.co/YKgJuiQyC1">pic.twitter.com/YKgJuiQyC1</a></p>&mdash; MOBILITY：dev (@mobility_dev) <a href="https://twitter.com/mobility_dev/status/1179660650215174144?ref_src=twsrc%5Etfw">October 3, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### モビリティは100年に一度の大変革の時代

トヨタが変革の訪れを感じ取り、動き始めている。
すでに、経済雑誌でMaaSや移動経済について語られている。

#### CASEという考え

Connected Autonomous Shared and Service Electric の略。
ダイムラーが提唱。

TESLAの車は自動運転に必要なハードウェアを用意済み。
ソフトウェアアップデートで、機能追加を出来るようになっている。
ITエンジニアが作る車という印象。
CASEのビジョンに合わせた進化をしている。

トヨタもWebエンジニアを集める求人を出している。
今ある自動車が自動運転に成り代わるわけではない。

#### MaaS とは

Mobility as a Serviceの略。
モビリティの所有から利用へ。

モビリティとはこのコンテキストだと、自動車や自転車などを指す。
特徴は
* 移動手段を所有する必要はない
* 必要なときにスマホから必要なだけ呼び出せる
* 初期費用無し
* 都度払いor定額制

`ITの方法論が実世界のサービスを巻き込む世界`がMaaSと言える。

##### Whim

Whimというヘルシンキ（フィンランド）の企業が、
MaaSを実現した一例。

Whimアプリの利用方法として、目的地までの経路探索をし、
チケットの購入と公共交通機関へのチケットをスマホに表示する
というユースケースがある。
スマホ1つでシームレスな移動体験を得られる。

#### 富豪的解決 vs スマートな解決

専用車を用意し、ドライバーも用意する富豪的解決は
待ち時間やお金といった無駄が発生する。
対して、スマートな解決はMaaSが提唱するビジョン。
移動の全体効率化をすることで、保有を減らす。

##### 実例 Uber Express Pool

[乗客がちょっと歩いて割引と時間短縮 — Uber Express Poolとは](https://tarosite.net/how-uber-express-pool-works-4e7189889baf)

同じ方向に向かうユーザを一箇所に集めて、
相乗りさせることで、移動を効率化するサービス。

#### MaaSのプラットフォーム化

GAFAに匹敵する大きなプラットフォームが出てくる可能性があり、
覇権争いが始まっている。

一例として、ダイムラーとBMWの連携がある。
自動車メーカーとしてはライバル関係だったが、
統合的な移動体験の提供のため、手を組んだ変革の一つと言えます。
[BMWとダイムラーがモビリティ事業を統合…「NOW」合弁5社を設立](https://response.jp/article/2019/02/25/319473.html)

### 感想

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">僕がMaaSに興味あるのは、現実を巻き込んだ変革があるから。このスライドのメッセージ意識してこう<a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://t.co/skZpFn9yUO">pic.twitter.com/skZpFn9yUO</a></p>&mdash; 24guchi (@24guchia) <a href="https://twitter.com/24guchia/status/1189761929708879872?ref_src=twsrc%5Etfw">October 31, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## GTFSオープンデータで公共交通機関をアップデート 
伊藤 昌毅様 [@niyalist](https://twitter.com/niyalist)

### スライド資料

[https://www.slideshare.net/niyalist/gtfs-188872058](https://www.slideshare.net/niyalist/gtfs-188872058)

### GTFSとは

[https://ja.wikipedia.org/wiki/General_Transit_Feed_Specification](https://ja.wikipedia.org/wiki/General_Transit_Feed_Specification)
Wikipediaより引用

> General Transit Feed Specification (GTFS) は、公共交通機関の時刻表と地理的情報に関するオープンフォーマットである。GTFSのような共通のフォーマットで情報が公開されることで、複数の公共交通機関の情報を利用する経路検索などのアプリケーション開発が容易になる。

### 海外の事例

路線図・時刻表・リアルタイムな車両位置情報などのデータを開放している。
欧米ではすでにデファクトスタンダードで存在している。
いろいろな交通情報が共通形式データで提供されるため、
交通機関に関するサービスが作りやすくなる。

### 日本の事例

[標準的なバス情報フォーマット](https://www.mlit.go.jp/report/press/sogo12_hh_000109.html)を国土交通省が公開している。
このフォーマットに従ったデータを
全国多数のバス会社が公開を始めている。

由布島という水牛が引っ張る水牛車も
[バスの時刻表](https://www.nanseirakuen.jp/yubujima_timetable.pdf)として提供されている。

水牛車も言うなればモビリティのひとつなんですね。定義が広い。
TODO 写真貼る

### GTFSを作るには？

#### Excelマクロを利用する

出力機能を持ったExcelマクロを利用する。
時刻表を打ち込むと、GTFS形式で出力してくれます。
~~つら・・・~~

#### 無償ソフトウェアを利用する

[その筋屋](http://www.sinjidai.com/sujiya/)という無償配布している
バス事業運営に利用できるソフトウェア。

無償配布なのに、バス会社も始められるクォリティとのことです。
バス会社運営に興味がある方はぜひ。

### GTFSは品質が命

下記理由につき、データの鮮度や正確性が大事になります。

#### バス停の位置が適当だと乗り継ぎに失敗する

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">マップ上のバス停の位置が雑だと、バスに間に合わなくなるのはあるあるw<a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://t.co/xbqidGhXlJ">pic.twitter.com/xbqidGhXlJ</a></p>&mdash; 24guchi (@24guchia) <a href="https://twitter.com/24guchia/status/1189770153598189568?ref_src=twsrc%5Etfw">October 31, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

交差点の向こう側がバス停だったと現地で気づくと、
乗り継ぎに失敗して次のバスまで待つはめになる。あるあるですね。
交差点のど真ん中にとりあえずバス停として雑に位置設定すると、
乗り継ぎに失敗するので、正確な位置を設定するのが重要です。

Google Mapsだと、ピンポイントでバス停の位置を設定できるので、
バスの乗り継ぎなどが経路検索しやすく工夫されています。
下記画像は道玄坂の上あたりから六本木ヒルズまでの
経路検索してみました。

TODO画像貼る

渋谷駅にはバス停があっちこっちにありますが、
画像の通り、正確にバス停位置が設定されているので、
迷わずに済みそうですね。

#### 臨時便の設定をしないと経路検索の正確性が下がる

年や月に1回しか走ってない臨時便もデータ反映されないと、
臨時便に乗れば早く着いたのに気づけないということが起こり得ます。

#### データ更新漏れで廃線になった路線も経路検索に引っかかってしまう

廃線になった路線のデータ更新が間に合わず、
いつまで経っても路線検索で表示されるという致命的な問題。
データの鮮度が大事ですね。

### GTFSの仕様

国土交通省が仕様を提供しています。
[静的バス情報フォーマット](http://www.mlit.go.jp/common/001283244.pdf)

上記仕様書から一部抜粋。

TODO 画像貼る

・・・
これはなかなかハードな仕事になりそうですね。

#### 取り扱い方法

PostgreSQLなどのRDBMSを利用するのがおすすめとのことです。
詳しくは伊藤様のQiitaの記事参照してください。
[PostgreSQL+PostGISに格納したGTFS形式の公共交通オープンデータを操作する](https://qiita.com/niyalist/items/39142d03fbfe241166ea)

### 感想

データの見える化が現実世界までコモディティ化すると、
かなり多くの情報が得られそうですね。
Google Mapsでいつもお世話になっている経路検索も
地道なデータの積み重ねを感じられました。

## 秘伝のソースがつなぐ技術と人

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【登壇情報】乗り換え案内サービス「駅すぱあと」を開発している、株式会社ヴァル研究所　執行役員CTO 兼 ナビゲーション開発部部長 見川孝太氏に「秘伝のソースがつなぐ技術と人」をテーマにお話いただきます。是非ご参加ください！<a href="https://t.co/aV7HyyVMRn">https://t.co/aV7HyyVMRn</a><a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://twitter.com/hashtag/ekispa?src=hash&amp;ref_src=twsrc%5Etfw">#ekispa</a> <a href="https://twitter.com/hashtag/MaaS?src=hash&amp;ref_src=twsrc%5Etfw">#MaaS</a> <a href="https://t.co/6V8TRfGUpD">pic.twitter.com/6V8TRfGUpD</a></p>&mdash; MOBILITY：dev (@mobility_dev) <a href="https://twitter.com/mobility_dev/status/1182146649717501952?ref_src=twsrc%5Etfw">October 10, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### 経路検索？いや、経路探索です

駅すぱあと創設者の方は
経路`探索`という単語にこだわりを持っていたとのことです。

検索
データ集合から目的のデータを探し出す

探索
特定の制約条件を満たすものを見つけ出す行動のこと

### 経路探索の改革

紙の本を使って人が調べるから、
PC+ソフトウェアで経路の探索をするというイノベーションを起こした。

### 駅すぱあとの秘伝のソース

このイノベーションを起こした当時からの
ソースコードに継ぎ足し継ぎ足しで改修を行っているとのこと。
~~こわ。~~

### 駅すぱあとのMaaSの実例

EMOTというサービスの提供
[https://www.emot.jp/](https://www.emot.jp/)

EMOTは小田急電鉄と組んで、
小田急線沿線のモビリティを実現しているアプリです。
2019年10月30日出たばかりなので、
ぜひインストールしてみてください。

### 移動の抽象度が高すぎる問題点

経路探索は駅から駅といった点でしかつながっていない。
しかし、現実は家から駅までは歩かないといけないし、
適切な路線の電車に乗り、駅から駅へ移動しないといけない。
このような詳細度の高い探索結果は得られない。

MaaSのシームレスな移動を提供するという観点から考えると、
機能が不足している現状がある。

また、利用ユーザはどのような属性を持っているかも考えることが必要。
普通に歩けるのか、足をけがしていて歩くのに難があるのかによって、
本来は探索結果を変える必要がある。

### 感想

<blockquote class="twitter-tweet" data-partner="tweetdeck"><p lang="ja" dir="ltr">詳細の解決のために、ハードのみならず、経路探索と言ったソフトの進化も求められる。ソフトの進化のためには、エンジニアの力が必要<a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://t.co/P1VEsRtL0U">pic.twitter.com/P1VEsRtL0U</a></p>&mdash; 24guchi (@24guchia) <a href="https://twitter.com/24guchia/status/1189786018662084608?ref_src=twsrc%5Etfw">October 31, 2019</a></blockquote>
<script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

現状の移動体験には問題点が多くあり、
課題解決にはエンジニアリングの力が必要。
IT・Webエンジニアだからといって、
自動運転が関係ないと断ずるのは早計。
エンジニアが活躍できるフィールドがたくさんある。

## Webエンジニアが自動運転企業でやっていること

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【登壇情報】オープンソースの自動運転OS「Autoware」の開発を推進する、株式会社ティアフォー 技術本部エンジニア 森本 潤一氏に「Webエンジニアが自動運転企業でやっていること」についてお話いただきます。是非ご参加ください！<a href="https://t.co/aV7HyyVMRn">https://t.co/aV7HyyVMRn</a><a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://twitter.com/hashtag/%E8%87%AA%E5%8B%95%E9%81%8B%E8%BB%A2?src=hash&amp;ref_src=twsrc%5Etfw">#自動運転</a> <a href="https://twitter.com/hashtag/IoT?src=hash&amp;ref_src=twsrc%5Etfw">#IoT</a> <a href="https://t.co/YRxNyoG0m6">pic.twitter.com/YRxNyoG0m6</a></p>&mdash; MOBILITY：dev (@mobility_dev) <a href="https://twitter.com/mobility_dev/status/1181059663539818497?ref_src=twsrc%5Etfw">October 7, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### MaaSに興味があるけど・・・

WebエンジニアがMaaS業界で
何やるのかイメージつかない人が多いので、
その情報を補完するセッション。

### Autoware とは

自動運転OS。車椅子やゴルフカートなども適用できる。
OSSとして提供することで、国内外200社、1200人以上の
コミュニティを作っている。
さらにオープン化による業界標準を目指している。

GitHubは下記
[https://github.com/autowarefoundation/autoware](https://github.com/autowarefoundation/autoware)

技術的にはROSベースで作られている。

### ROS とは

Robot Operation System の略。
最近はバージョン2に移行しつつある。

#### 並列処理が得意

個別処理をノードで起動し、
ノード間をPub/Sub通信してくれる。

実際の使用例として、画像トピックをカメラがPublishとして発行し、
信号認識や歩行者認識といったSubscriberのノードが購読する。
カメラが発行した画像を各ノードが購読することで、
リアルタイムで画像取得と認識を行っている。

#### ROSBAGというファイル形式

ROSのトピックをタイムスタンプとともに保存が可能。
さらに再生が可能なので、後からアルゴリズムを変えた後の
検証が可能になる。
ROSBAGの可視化ツールとして、rvizがある。

WebRTCも同様に、リアルタイム性があるプロダクトだと、
過去のある時点が再生できるかどうかは
デバッグしやすさが大きく変わってきます。
この点、すでにROSBAGというファイル形式が用意されているので、
デバッグやアルゴリズムの改修がやりやすそうですね。

#### rosbridge

ROSメッセージを他のプロトコルにブリッジするモジュール
→UDP,TCP, Websocketなど

Autowareとの通信が可能なので、
Webエンジニアの領域に入ってくる。

### 自動運転開発のためのツール

ハード（車など）に乗せるツールが1割、
それ以外のインフラやマップエディターやシミュレーションと
言ったツールも9割くらい使われる。
Webエンジニアが力を発揮できる領域もかなり多い。

### 清水建設とティアフォーの協業

[[自動運転技術と歩行者ナビを連携した施設内移動サービスを構築](https://www.shimz.co.jp/company/about/news-release/2019/2019022.html)](https://www.shimz.co.jp/company/about/news-release/2019/2019022.html)

[豊洲まちなみ公園](http://sportxart.jp/interview03/)という住宅展示場での自動運転の実例です。
いまいちすごさがわからなかったですが、
普通のモデルハウスが30棟は立てられるとのことで、
けっこうな広さですね。
確かにこの展示場で歩く距離減らせられるのは便利そう。

### 感想

AutowareはOSSで、車に限らず何にでも適用ができる。
実際にラジコンにAutowareを導入し、
ラジコンを自動運転しているブログが存在しています。
[https://faboplatform.github.io/AutowareDocs/04.Autonomous_Drive/01.car/](https://faboplatform.github.io/AutowareDocs/04.Autonomous_Drive/01.car/)

身近なところだと、お掃除ロボットにも適用できそうなので、
そのうち触ってみたい。

僕個人のスキルセットとして、
Web全般、特にWebRTCの開発経験が活かせそうだと感じました。
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">自動運転でもWebRTCの技術使うので、Webエンジニアでもやれることけっこうありそう<a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://t.co/JhW1bwyZzP">pic.twitter.com/JhW1bwyZzP</a></p>&mdash; 24guchi (@24guchia) <a href="https://twitter.com/24guchia/status/1189798765718204416?ref_src=twsrc%5Etfw">October 31, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

## 便乗交通SAVSが変える移動のあり方

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【登壇情報】SAVSの社会実装を目指し、配車アルゴリズムの高度化と交通シミュレータの開発に従事されている、株式会社未来シェア 技術研究員 落合純一氏に「便乗交通SAVSが変える移動のあり方」についてお話頂きます。是非ご参加ください！<a href="https://t.co/aV7HyyVMRn">https://t.co/aV7HyyVMRn</a><a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://twitter.com/hashtag/MaaS?src=hash&amp;ref_src=twsrc%5Etfw">#MaaS</a> <a href="https://twitter.com/hashtag/%E6%9C%80%E9%81%A9%E5%8C%96?src=hash&amp;ref_src=twsrc%5Etfw">#最適化</a> <a href="https://twitter.com/hashtag/SAVS?src=hash&amp;ref_src=twsrc%5Etfw">#SAVS</a> <a href="https://t.co/1JWBzY1I3y">pic.twitter.com/1JWBzY1I3y</a></p>&mdash; MOBILITY：dev (@mobility_dev) <a href="https://twitter.com/mobility_dev/status/1181772197175517184?ref_src=twsrc%5Etfw">October 9, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### SAVSとは？

Smart Access Vehicle Service の略。

ユーザが目的地をアプリで設定すると、
AIが効率のよいルートを選択し、タクシーを配車してくれる。
さらに途中経路に別ユーザが近くの目的地までを設定されると、
リアルタイムで経路を変更しつつ、そのユーザも乗せていくアプリです。

### 便乗交通とは？

便乗は"便"利に"乗"る交通という意味合いをもたせている。
また、相乗りや乗り合いは別の意味があるとのことです。

リアルタイムで経路を変更しながらオンデマンドに
配車がされるため、相乗りや乗り合いとは一線を画しているので、
SAVSは便乗という意味を持たせたとのこと。

### 各種事例紹介

[志摩MaaS](https://www.kintetsu-g-hd.co.jp/kintetsumaas/shimamaas/)
特徴的なのが、マリンキャブという海上タクシーも
経路の一つとして数えられている点です。
陸路で迂回するより、海を突っ切っていったほうが早く到着でき、
観光資源としても有効に活用できそうな印象を受けました。

[福祉Mover](https://mws-hidaka.jp/publics/index/137/)
介護施設の一つ、デイサービスへの通う方を対象にした
送迎システムです。
> 通院や買い物等で外出したくなった時にスマートフォンを使って送迎中の介護送迎車両をSAV(Smart Access Vehicle)として呼び出すことができます

介護される方が気を使ってしまうということは
往々にしてありますが、このようにシステムを経由することで
気を使わなくても済む自由な生活が送れそうですね。

### 感想

便乗交通によって、免許返納や過疎地の交通状況改善などの
社会問題に取り組んでいる姿勢が見えた。
データ分析などによって、より効率化が進められる
可能性も感じます。

## 自動運転車を動かすサーバレスシステムの中身

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">【登壇者情報】SBドライブ株式会社 CTO <a href="https://twitter.com/atsutoms?ref_src=twsrc%5Etfw">@atsutoms</a> 須山温人氏、同社 バックエンドエンジニア 関谷 博之氏のお二人に「自動運転車を動かすサーバレスシステムの中身（仮）」についてお話いただきます。是非ご参加ください！<a href="https://t.co/aV7HyyVMRn">https://t.co/aV7HyyVMRn</a><a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://twitter.com/hashtag/%E3%82%B5%E3%83%BC%E3%83%90%E3%83%AC%E3%82%B9?src=hash&amp;ref_src=twsrc%5Etfw">#サーバレス</a> <a href="https://twitter.com/hashtag/Lambda?src=hash&amp;ref_src=twsrc%5Etfw">#Lambda</a> <a href="https://twitter.com/hashtag/DeepLearning?src=hash&amp;ref_src=twsrc%5Etfw">#DeepLearning</a> <a href="https://t.co/uS7fMIW5HP">pic.twitter.com/uS7fMIW5HP</a></p>&mdash; MOBILITY：dev (@mobility_dev) <a href="https://twitter.com/mobility_dev/status/1181421646420168704?ref_src=twsrc%5Etfw">October 8, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### SBドライブのメイン事業のソフトウェアについて

Dispatcherというソフトウェアを提供している。
[Dispatcher](https://www.softbank.jp/drive/dispatcher/)

車両とシステムをパッケージで提供し、
バス会社が使えるように販売していく。
自動運転時代の運行管理サービス。

### 自動運転バスの運用

自動運転だけでなく、営業するためのフローを考える必要がある。
マップや時刻表の作成、セッティングや遠隔監視のインフラ整備などを
サポートしていく。

信号機との連携ができ、監視などはDispatcherで行っている。
運行設定にはGTFS形式のダイヤデータを元に、
ダイヤ通りに自動運転される。

監視した結果のフィードバックを国に提出することで、
自動運転に関するガイドラインに適用ができるPDCAが回っている。
過去の走行を分析し、運行の改善も同時に行っているとのことです。

### ビジョン

自動運転とスマホアプリは似たレイヤーを持っていて、
ハードが異なるだけで、ほかは同じになっている。
また、SoftBankのキャリア通信網を生かして、
サービスエリアを広くすることが可能。

### Dispatcherの構成

AWS上に展開されている。

#### WebSocket

車両の状態を1秒毎に監視できる。
複数車両の現在地を地図上でリアルタイム表示し、
車両ごとの詳細情報や制御をすることが可能。

#### API

GTFSデータ形式のダイヤを用いて、
自動運転に設定するAPIが提供されている。
車両に飛ばすAPI自体はLambdaを使っているので、
Webエンジニアでもよく見る構成でした。

### 分析

ユーザごとに変えられるようにし、基本はkibana。
内部エンジニアはJupyter、Athenaなどを使うとのこと。

### Batch処理

開発中の自動運転のデータがきたないので、
PySparkで前処理し、RDSでGIS処理。
最後にESへ格納するとのこと。

ウェブエンジニアだったら知ってることがけっこう多いですね。
<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">モビリティとは思えない悩みw動かすハードが車なだけで、Webに関する知識は活かせそうですね<a href="https://twitter.com/hashtag/mobilitydev?src=hash&amp;ref_src=twsrc%5Etfw">#mobilitydev</a> <a href="https://t.co/naV7elnRB3">pic.twitter.com/naV7elnRB3</a></p>&mdash; 24guchi (@24guchia) <a href="https://twitter.com/24guchia/status/1189822265073913856?ref_src=twsrc%5Etfw">October 31, 2019</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

### 各地の交通課題は切実

日本は自動運転に最適
* 超高齢化社会
* 人件費高い
* 自動車メーカーが強い
* 安倍首相の後押し
  * 警察や国土交通省が規制緩和に向けて動いている状況らしい
* IT企業が多い

### 感想

車両ごとに取得できるデータはいろいろと異なるらしい。
コンタクトセンターを作ったときに、
電話機や通信キャリアによって、
取得可能なデータが変わるだけでも大変だったのに、
大きい車でのデバッグやデータ確認はどうやってやっているんだろう・・・

内容としては一般的なWeb開発の知識が問われるものが多かった。
最終的に動かすものが車というだけで、
Webエンジニアが参画できる領域が非常に多いことがわかった。

## クロージングセッション

長谷 歴様

交通にはWebとは違う世界があると思っていたが、
実際はWebで解決できることが非常に多い。
そのギャップを埋めるため、Mobility:devの開催する
動機になったとのことです。

### 技術の地盤の上に成り立つモビリティ

2000年でIT革命が起き、
2010年からスマホで生活が変わった。
さらにこれらインターネット・スマホ技術の地盤の上に、
モビリティの革命が起こりうる時代に変わっていっている。

これが**100年に一度の大変革の時代**と言われる
ゆえんでもある。

## まとめ

濃い内容が多く、非常におもしろいカンファレンスでした。

最終的なアウトプットが車といったハードウェアを動かすだけで、
Webやスマホアプリといった技術力が求められています。
Webエンジニアの僕としては、自分のスキルセットで
問題解決できる領域が見え、視野が広がりました。

Mobility:dev 2020も楽しみにしています！