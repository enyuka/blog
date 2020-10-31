# ハイパフォーマンスブラウザネットワーキングを読んだ

こんにちは、[@24guchia](https://twitter.com/24guchia)です。

オライリーの[ハイパフォーマンスブラウザネットワーキング](https://amzn.to/2TUDNGo)を読み終わりました。去年の 11 月に買って、なかなか難しく、積んだりして時間かかりました。

https://twitter.com/24guchia/status/1267139311742246913

やっと読み終わって嬉しくてツイートしてしまったｗ

読み始めるきっかけは WebRTC を使って開発する上での基礎力作りです。

## 最初のまとめ

この本は名前の通り、ブラウザとネットワークでハイパフォーマンスを出すための本です。僕はその中でも、 WebRTC の項目が読みたくて買いました。

いろいろな技術の積み重ねの上にある技術ということもあり、 WebRTC が最後の章。 TCP や UDP といった基本的なプロトコルから、 Wi-Fi といったユーザーが使うネットワーク、アプリケーション最適化といった章もあり、 Web に関わる人は読んでおくといい本ですね。

## WebRTC の章に書いてあったことについて改めてまとめる

WebRTC の章は今までにこの本で学んだ各章で書いてあったことです！みたいなことが多く、ラスボス戦のような感慨深さがありました。感慨深さはともかく、けっこう前に読んで忘れてたり、名前が似てたりしていて、理解が難しかったです。

そこで、各技術の概要をまとめてより深い理解を得ようと思います。マサカリは投げられたら対応しますので、エアマサカリはやめてください。

TODO 画像貼る

以前に調べた記事では取り上げなかった部分をメインで書いていきます。
https://harinoma.info/research-about-webrtc/

## そもそも WebRTC とは

`Web Real-Time Communication の略で、ウェブ上でリアルタイムにデータを取り扱うためのプロトコルと JavaScript の集合体`。 WebRTC というと動画や音声で使うと思われがちですが、データを取り扱えるので、いろいろな分野で使われてます。

* テキストチャット
  * https://html5experts.jp/katsura/16331/
* ファイル共有
  * https://drop.lol/
* 自動運転
  * https://tech.tier4.jp/entry/2019/01/22/170032

WebRTC にも興味はありますが、僕が本当に一番興味があるのは実は下の自動運転ですｗ

新しい技術という雰囲気がありますが、昔からのプロトコルの集合体なので、必ずしも最新の技術ではないです。たとえば、 UDP の [RFC](https://tools.ietf.org/html/rfc768) は 1980 年に仕様策定されており、新しい技術ではないことがわかります。ただ、仕様変更や技術の移り変わりがあるため、最新のキャッチアップは必要です。

次から WebRTC の詳細な技術についてまとめます。毎回混乱するので、プロトコル編と JavaScript API 編で分けます。

### プロトコル

ICE, STUN, TURN は以前もまとめましたが、改めて。

#### ICE

Interactive Connectivity Establishment の略。 [RFC5244](https://tools.ietf.org/html/rfc5245)で定義されています。

ピア同士が接続する際に、 NAT はあるかどうか、 NAT がある場合、 STUN が利用できるか、 STUN が利用できない場合、 TURN は利用できるかというような候補情報を集めて、`接続できる経路が見つかるまでトライ`してくれます。

Trickle ICE といったおしゃれな名前の拡張プロトコルもあります。

##### STUN

Session Traversal Utilities for NAT の略。 [RFC5389](https://tools.ietf.org/html/rfc5389)で定義されています。

NAT 内にあるピアが、 STUN に対して、テストパケットを送り、 `STUN が割り当てられているパブリック IP とポート番号を返却します`。 STUN から返却された情報を利用し、ピア同士の接続をします。また、キープアライブの機構も備わっているので、 NAT でタイムアウトしないようになっています。

STUN は UDP ベースで、 UDP をブロックや制限するような設定がなされているファイアーウォールなどが存在する場合があります。そのような場合は、 STUN ではどうにもできないので、次の TURN を利用します。

##### TURN

Traversal Using Relays around NAT の略。 [RFC5766](https://tools.ietf.org/html/rfc5766)で定義されています。STUN の拡張プロトコルです。

`メディアをリレーするためのプロトコルです`。ピア A, ピア B が TURN 実装のリレーサーバーを経由して、通信を行います。また、 UDP で動作しなかった場合、 TCP に切り替わります。そのため、 UDP をブロックするファイアーウォールなどが経路にあっても STUN とは異なり、動作します。

リレーサーバーを経由するので、ピア同士は直接接続していませんが、そんなことはユーザーには関係ないので、気にしないでください。

ICE, STUN, TURN はなにげに Twilio のドキュメントできれいにまとまってました。前調べたとき、こんなのあったかなあ。こちらも参照してください。
[STUN、TURN、および ICE とは何ですか。](https://jp.twilio.com/docs/stun-turn/faq)

#### SDP

Session Description Protocol の略。 [RFC4566](https://tools.ietf.org/html/rfc4566)で定義されています。

`お互いのピアがやりとりする音声や動画といったメディア情報、コーデックや設定などといった情報を記述するプロトコルです`。シグナリングの際にピア同士でやりとりし、コーデックは何かや、使用する IP/ポートなどを選定する際の情報として利用します。具体的には下記のような情報が送られてます。

TODO 画像貼る

・・・わかりづらいですね。

RFC の [SDP Specification](https://tools.ietf.org/html/rfc4566#section-5)に記述がありますが、`v`でバージョン、`s`でセッション名といったかなり短い略称を使っており、人が読むにはなかなかつらいものがあります。ただ、 WebRTC のサービスを使ったりする分には、基本的にはそんなに気にすることはないですし、後述する`RTCPeerConnection`がいい感じに処理してくれます。

#### DTLS

Datagram Transport Layer Security の略。バージョン 1.0 が [RFC4347](https://tools.ietf.org/html/rfc4347)、バージョン 1.2 が [RFC6347](https://tools.ietf.org/html/rfc6347)で定義されています。

Datagram とあるように、 UDP(User Datagram Protocol) に関係があります。 WebRTC では通信されるデータの暗号化を仕様として求めており、仕様を満たすため、 `UDP を暗号化する際に利用している TLS 相当の仕様です`。[Overview of DTLS](https://tools.ietf.org/html/rfc6347#section-3)にも記載ある通りですが、 TLS は UDP に使用できないため、 UDP 用に TLS 相当の仕様を策定しています。DTLS は TLS が UDP で使えない理由を直しているだけで、 TLS と似た仕様になっています。

#### RTP

Real-time Transport Protocol の略。 [RFC3550](https://tools.ietf.org/html/rfc3550)で定義されています。

`RTP は端末間の音声や動画といったリアルタイムデータをネットワーク上でやり取りするための仕組み`を提供します。 UDP 上で動作することがほとんどで、音声通話や動画配信などで利用されています。同じ RFC で定義されている RTCP と別のポートでやりとりしますが、同時に使用されます。

##### SRTP

Secure Real-time Transport Protocol の略。 [RFC3711](https://tools.ietf.org/html/rfc3711)で定義されています。

`RTP のセキュア版です。` RTP と RTPC に暗号化とメッセージ認証のセキュリティ機能を提供するフレームワークです。

#### RTCP

RTP Control Protocol の略。 RTP と同じ [RFC3550](https://tools.ietf.org/html/rfc3550#section-6) で定義されています。

`RTCP はデータ配信の品質や制御情報をやり取りします`。また、 RTP と同時に別ポートで使用されます。 

##### SRTCP

Secure RTP Control Protocol の略。 SRTP と同じ [RFC3711](https://tools.ietf.org/html/rfc3711#section-3.4) で定義されています。

`RTCP のセキュア版`で RTCP パケットに 3 つの新しいフィールド（ SRTCP インデックス、「暗号化フラグ」、認証タグ）とオプションフィールド( [MKI](https://documentation.avaya.com/bundle/AdministeringAvayaSBCE_r7.2.2/page/Master_Key_Identifier_.html) )を追加しています。

#### SCTP

Stream Control Transmission Protocol の略。 [RFC4960](https://tools.ietf.org/html/rfc4960)で定義されています。

公衆交換電話網( PSTN ) を IP 上でメッセージやり取りできるように設計されていますが、いろんなアプリケーションで利用可能です。また、後述する DataChannel はこの SCTP に依存しています。メッセージ指向で信頼性の高いプロトコルです。本より引用すると、`SCTP は TCP と似たサービスを提供`とあります。

今までの流れから来ると、 SCTP はセキュアな何かのプロトコル？って思うと間違えて、この場合の`S`は`Stream`の頭文字なのがミソ。毎回間違える。

### JavaScript API

プロトコルっていっぱいあるんだな〜（白目）になった方が多いかと思います。

でも、安心してください。そんなたくさんあるプロトコルをラップして、ブラウザでビデオや音声通話をするのに必要な機能を JavaScript API として公開しているインターフェイスがあります。

#### RTCPeerConnection

P2P 接続を行うための API です。具体的には下記のようなことを内部でしています。

* ICE ワークフローの管理
* STUN を利用している場合のキープアライブ
* ローカル/リモートストリームの変化の記録
* ストリームの再ネゴシエーション
* オファー/アンサーするための API の提供

なんとも頼もしい存在ですね。[詳しくはドキュメント](https://developer.mozilla.org/ja/docs/Web/API/RTCPeerConnection)参照。

#### DataChannel

ピア間のアプリケーションデータの双方向のやり取りを行います。

RTCPeerConnection とは依存するプロトコルが異なり、 `RTCPeerConnection は SRTP、 DataChannel は SCTP に依存`しています。 DataChannel 自体は RTCPeerConnection の`createDataChannel()`メソッドで呼び出すことができ、テキストやバイナリデータをやり取りできます。また、 WebSocket に似た実装になっています。

##### 順序、信頼性、部分的信頼性ポリシー

DataChannel では`順序通りにするかどうか、信頼性を担保するか、信頼性の担保を部分的にするかを設定`できます。やり取りするデータによって、値を変更します。オプションは初期化時に設定可能です。くわしくは[ドキュメント](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/createDataChannel#RTCDataChannelInit_dictionary)参照。

本には`maxRetransmitTime`が利用できるとありますが、現在は削除済みです。代わりに、`maxPacketLifeTime`が使用できます。[ドキュメント](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel/maxPacketLifeTime)にある通り、ミリセカンドを設定し、基本的な使い方は変わりません。
次の記事を見ると、プロパティ名の変更だけのようです。
[WebRTC DataChannels: Fix "maxPacketLifeTime" vs "maxRetransmitTime"](https://www.chromestatus.com/feature/5098889822601216)

### JavaScript API は偉大

あんなにたくさんあったプロトコルを`RTCPeerConnection`と`DataChannel`でラップしてくれています。

WebRTC プロダクトを提供する側でもない限り、プロトコルについて深入りしなくても JavaScript API を通じて、ブラウザでリアルタイムコミュニケーションを開発し、楽しむことができます。

## まとめ

なんとなくふわっと覚えていたことの理解が一気に進みました。オライリー本を読み、 RFC をたどり、最新の情報を押さえることでより深く学ぶことができます。

リモートワーク環境下ではより存在感を出している WebRTC 。そんな WebRTC を一冊で学べる[ハイパフォーマンスブラウザネットワーキング](https://amzn.to/2TUDNGo)はおすすめの本です。