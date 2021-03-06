# マイクロサービスアーキテクチャを読んだ

こんにちは、[@24guchia](https://twitter.com/24guchia)です。

オライリーの[マイクロサービスアーキテクチャ](https://amzn.to/2zQc3eZ)を読みました。というのも、現在アサインされているプロジェクトでも、マイクロサービスを導入したいという話が出てきたからです。名前と概要をざっくり知ってるだけだったのですが、僕の今のポジション的にちゃんと知ってないとまずそうと思い、とりあえず一番メジャーな教科書を手に取ってみました。

TODO URL

割と多読で速く本を読む方だと思いますが、歴代読破したオライリー本の中で最速の、購入から 5 日目に読み終わりましたｗ一応 300 ページ弱あるので、決して短い本というわけではないです。

ちなみにこの本の代金はベルフェイスの書籍購入補助制度で購入し、また 8 割方業務時間中に読むという、会社からの厚い支援がありました。というわけで、一旦 PR です。

[https://hrmos.co/pages/bellface/jobs/840](https://hrmos.co/pages/bellface/jobs/840)

PR 終わり

## マイクロサービスとは

ビジネスドメインに合わせて、サービスを細かく分割し、開発する手法・設計。目指すべきところは、疎結合・高凝集性です。

これはエンジニアならみんなわかる。

### 技術的な話

サービスをビジネスドメイン単位で分割し、各サービスごとにサーバやデータベース、コードなどを保持する。分割して保持することで、あるサービスが他のサービスに影響が出ないよう、物理的に分割する。分割したサービス間のコミュニケーションは基本的に、 API で行う。

#### API Gateway パターン

API でどうやってコミュニケーション取るのかというと、 [API Gateway パターン](https://microservices.io/patterns/apigateway.html)という手法が使われます。

Web アプリケーションやネイティブアプリから一つの API を呼び出し、 API Gateway が各サービスにいろいろな API を呼び出し、ゲートウェイでデータを組み合わせて、返却するとのことです。

AWS からはまんま [Amazon API Gateway](https://aws.amazon.com/jp/api-gateway/) という製品が出ています。 Amazon 社は 2001 年頃にはすでに導入が進んでいたようです。
GCP からは [Cloud Endpoints](https://cloud.google.com/endpoints?hl=ja)がそれに相当するようです。

マイクロサービス初心者としては、 API Gateway 自体が一つのモノリスに見えるのですが、どうなんでしょうか・・・プロにはマイクロに見えているのか？

### 組織的な話

特徴的なのが、分割したサービスのビジネス的な成長まで責任をサービス担当者が負う点は忘れてはいけない。エンジニアだから・・・と言って、売上や数値的な目標へのコミットをしなくてもいいというわけにはならない。モノリシックな開発よりビジネス目標へのコミットがより強く求められる。

### メリット

#### 疎結合

サービス間で影響が出ないよう、分割を行うこと。この疎結合を実現しやすいことが、マイクロサービスを導入する一番のモチベーションになる思う。全然関係ないサービスのデプロイ時に、ハラハラしたりはしたくないが、モノリスだとそうも言ってられないこともありますよね。

その点を解決してくれるのは魅力的。

#### 高凝集性

一つのサービスはそのサービスに関連そのサービスに関連したことだけをまとめること。関連って何かというと、一般的な回答はなく、各自で考えないといけない点が難しいところ。

適切な分割を行い、高凝集性が実現されることで、サービスに特化した知識のみを得ることで、すばやく改善のサイクルを回せることがメリットです。

#### いろんな意味でスケールしやすい

疎結合を達成することで、開発やデプロイの速度が上げられます。一つの企業で複数サービスを持つということはある程度成長した企業ではよくありますが、モノリシックなリポジトリで複数サービスを持つと影響範囲がわかりづらくなってしまいます。しかし、疎結合なマイクロサービスではサービス間に物理的な分断があるため、影響範囲は小さくできます。そのため、すばやいデプロイが可能になります。

また、高凝集性を達成することで、複数のビジネスドメインを持つ企業でも、小さく分割されたビジネスドメインのみを知ることですばやく仕事に取りかかれます。そのため、人材採用の速度を上げやすくなります（チームビルディングとかは置いておいて）。

### デメリット

#### 難易度が高い

夢のようなことを書いていますが、現実は厳しいです。

マイクロサービスに関する製品は多数世に出てきています。しかし、サービス間のコミュニケーションが API のため、ネットワーク問題発生時にどうするかや、データの一時的な不整合をどの程度許容するか、マイクロサービス全体の監視やログをどうするかなど考えることは山程あります。

特にトランザクション周りはかなり難易度が高いと感じました。一つのデータベースであれば、 ACID トランザクションを利用できますが、マイクロサービスで各サービスがデータベースを保有する都合、 ACID トランザクションは利用できません。画面上の一つの処理で、複数サービスへの書き込みが必要になった場合、各サービスへデータベース更新処理をリクエストしますが、あるサービスだけデータベース更新を失敗した場合、どのように補償するか検討しないといけません。 TCC や Saga といったパターンは存在しますが、データベースを分割した副作用に見えます。

上のようなことは、そもそもサービス分割に失敗しているだけでは？と思われるかもしれませんが、 EC サイトで顧客のカートと在庫状況はおそらく普通は別サービスに分割するでしょう。そのため、マイクロサービスを導入すると必ず補償するトランザクションについて検討しないといけません。

また、指摘の通り、サービス分割に失敗しているというケースは十分に考えられます。ただ、分割に失敗したかどうかは稼働してから気づくケースが多そうだと思いました。

#### サービス分割が難しい

上で何度も`適切なサービス分割`と書きましたが、そもそも`適切なサービス分割`とはなんでしょうか？

実はサービス分割には一般的な回答がありません。これは当然で、サービス分割の基準はその組織のビジネスドメインによります。このビジネスドメインは組織ごとに異なり、人間が絡んでくるため、政治的な要素も考えないといけません。

サービス分割に失敗すると、複数箇所に小さなモノリスができるだけで、多くのドメイン知識は引き続き求められ、開発者としては影響範囲がわからなくなり、あちこちのインフラを監視しないといけないという最悪のケースが考えられます。（そして、こんな設計を取ったのは誰だ？とエンジニアがめっちゃ怒られる未来まで見えてます・・・）

## 読み終わった感想

### 漂うバズワード感

AI でなんでも解決できます！に近い、なんとも言えないバズワード感を感じました。

モノリシックなリポジトリが抱えている問題点は、多くのエンジニアが共感を覚えるところでしょう。しかし、それを物理的に分け、さらに API でつなぎこみをするというのは難易度が高く、むしろ分割した事自体が負債になりかねない危険性もはらんでいます。

そのため、物理的な分割を行う前に、まずはコードを正しく分割して、デプロイの影響範囲を抑えたり、ブルーグリーンデプロイと言った改善ができないかといった事を考えたほうが良いです。問題の解像度を上げて、各問題を個別に回答を出すと言った努力が必要です。それでも解決できず、分割する場合、オーバーヘッドも受け入れていく覚悟を決め、マイクロサービス導入に進んでいきましょう。

### マイクロサービスは技術だけの話じゃない

[コンウェイの法則](https://ja.wikipedia.org/wiki/%E3%83%A1%E3%83%AB%E3%83%B4%E3%82%A3%E3%83%B3%E3%83%BB%E3%82%B3%E3%83%B3%E3%82%A6%E3%82%A7%E3%82%A4)から引用します。

```
システムを設計する組織は、その構造をそっくりまねた構造の設計を生み出してしまう
```

これもエンジニアなら共感を覚えると思います。モノリシックなリポジトリが問題があるからと言って、それを分解し、マイクロサービスに乗せるためには、組織の構造を変える必要があります。これは逆コンウェイの法則と言われます。

ただしこの逆コンウェイの法則を導入するには、社長以下の組織構造を変える必要がありますが、これを主導できるエンジニアは多くないでしょう。

今あなたのいる会社の社長を頭に浮かべてください。現在のシステムの問題を説明し、解決するために、組織全体の構造を変える権利をくださいと相談し、任せてくれるような関係性でしょうか？任せてくれる！と自信を持って言える方はマイクロサービスの検討を今すぐにしてもよいでしょう。

ただ、現実には任せてくれるケースはほとんどないと思いますし、そもそも、相談する場すら与えられないエンジニアが多いと思います。

マイクロサービスは技術的な設計手法ですが、組織設計にまで踏み込みます。いくら正しいからと言って、今までの手法や組織構造を変えたいと積極的に取り組める人は少ないです。エンジニアに任せたほうがいいという関係性を構築し、非エンジニアもマイクロサービスを導入したほうがうまくいくんじゃないかと気づいてもらうまで、長い時間がかけてコミュニケーションを取っていく必要があります。

この辺、もっと具体的に踏み込んだ泥臭い話があるとおもしろいのですが、この本は割とあっさりと成功した事例ばかりでした。

僕がいまいちマイクロサービスに乗り気になれないのがここの部分です。入社して半年ほどしか経っていないので、他事業部との関係性はもとより、エンジニア同士でもよく知らない人が多い中、理想的な成功を収められる可能性が高くないと直感が告げています。

## 現実的な導入方法

### 腐敗防止層

[エリック・エヴァンスのドメイン駆動設計](https://amzn.to/3bXe1ID)から参照で、レガシーシステムと新しいシステムの間に腐敗防止層と呼ばれるインターフェイスを作ります。

モノリシックなレガシーリポジトリから、小さなドメインを見極め、マイクロサービスの流儀に則って、実装を行い、レガシーと新システムのコミュニケーションは腐敗防止層を介して行うことで、段階的にマイクロサービスを導入するというのが現実的かと考えています。

### 逆コンウェイファースト

システムを書き換える前に、組織改善を進めていき、分割をしやすい関係性の構築を先に行う方式。今すぐにマイクロサービスを導入して、クソコードを駆逐したい！という感情を捨ててください。

**そのクソコードは、本当にクソコードですか？**

純粋に仕様が難しく、理解できていないからかもしれません。急いで進めて、失敗してさらなるクソコードを生み出すことは避けましょう。この辺は[レガシーソフトウェア改善ガイド](https://amzn.to/3c0gCBq)にも書いてあります。

### 新しいサービスをマイクロサービスで作る

モノリスリポジトリを分割するのは影響が大きいので、新規サービスをマイクロサービスの設計で作ってみて、本当にやれるのかを検討します。腐敗防止層を使えば、モノリスとのつなぎこみも比較的かんたんだと思います。

## まとめ

どんな技術でもそうですが、銀の弾丸はありません。目の前のつらみに追われて、マイクロサービスなら解決できるのでは？と安易に手を出すと危険です。落ち着きましょう。

特にマイクロサービスは一つ一つの技術が難しくて、おもしろそうなのでテックに傾倒するエンジニアには魅力的に映りそうです。ただ、あなたの給料はどこから出ているのか考えて、やってみたいからやるっていう安易な考えは捨ててください。

ひとまずは腐敗防止層を用いたマイクロサービスの導入を進めていくようなので、進捗を出していきたいです。