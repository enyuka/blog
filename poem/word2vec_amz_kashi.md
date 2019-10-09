# amazarashiの歌詞をword2vecで分析し、誰が誰に対してのメッセージボトルを出していたのかを探る

こんにちは、[@24guchia](https://twitter.com/24guchia)です。
以前の会社であるレバレジーズ社内勉強会で参加していた
Rもくもく会でずっとやってたことをまとめました。

amazarashiという目下好きなバンドの歌詞を
R言語のWord2Vecを利用し、
分析するということをやっていました。

## amazarashiとは

[http://www.amazarashi.com/bio/](http://www.amazarashi.com/bio/)

上記、公式サイトから引用

> 日常に降りかかる悲しみや苦しみを雨に例え、僕らは雨曝だが「それでも」というところから名づけられたこのバンドは、「アンチニヒリズム」をコンセプトに掲げ

世界観が暗いと言われているバンドです。

[世界収束二一一六](https://amzn.to/2ODdRNw)というアルバムから引用で、
[ライフイズビューティフル](https://www.uta-net.com/song/203099/)で`暗い歌ばかり歌いやがって`と人から言われ、
[吐きそうだ](https://www.uta-net.com/song/203098/)で`生きる意味とは何だ`と自問自答し、
[しらふ](https://www.uta-net.com/song/203097/)で`自分以外皆死ね`と人に恨み言を吐く、つながりがある3曲があります。

まあ暗いと言われてもしょうがないバンドですね。（そういうところが好き）（僕は暗いとは思ってないけど、[それはまた別のお話](https://www.uta-net.com/song/172910/)）

## なんで分析を始めたか

### R言語を始めた理由

データ分析に関する勉強をすることで
今後のキャリアパスに有利だと考えていました。

というのも、以前行ったコンタクトセンターのリプレースで
Twilioを採用したのは通話データが取りやすく、
分析がしやすいからでした。
そのため、データ分析までできると
Twilioでの開発から運用保守、その後のデータ分析を元にした
施策提案と業務改善まで一括で行うことができ、
他のエンジニアとの差別化が強くできるためです。

そのようなことを考えていたタイミングで、[@SKUE](https://twitter.com/Mr_Sakaue)さんが
勉強会をやりますと広報していて、
PythonとR言語で参加しやすい曜日がR言語だったので選択しました。

### なんで分析をするか

好きなバンドは[凛として時雨](http://www.sigure.jp/)とamazarashiで、
ファン歴は時雨はかれこれ10年を越え、amazarashiは3年ほど。
ただ、毎年フェスやライブに行き、いろんなバンドを聴いてる割には
この2バンドほどにドハマリできるバンドやアーティストに出会えず、
モヤモヤしていました。

両バンド共、特に歌詞が好きなので、
似たような特徴を持つ歌詞を書いているバンドがいれば
機械的に歌詞が好きそうなバンドを探せるかもと考えてます。

ただ、**9割方ミーハー精神**ですね。

## 訓練データの集め方

GitHubはこちら↓
[https://github.com/enyuka/rlang_mokumoku/tree/master/src/amz](https://github.com/enyuka/rlang_mokumoku/tree/master/src/amz)

### 歌詞を収集する

rvestを使い、スクレイピングをしました。
スクレイピングできるならNode.jsでもPythonでも何でもいいですが、
R言語で分析する都合、R言語のdata.frameなどが
使えるほうが効率がいいため、rvestを採用しています。

詳細は[ソースコード](https://github.com/enyuka/rlang_mokumoku/blob/master/src/amz/getAmzKashi.R)を見てもらうとして、
特に難しいことはなく、CSSセレクタでスクレイピングし、
data.frameに追加するだけです。

### 歌詞を訓練する

RMeCabで歌詞を形態素解析し、
word2vecで単語をベクトル化します。
例によって、詳細は[ソースコード](https://github.com/enyuka/rlang_mokumoku/blob/master/src/amz/trainAmzKashi.R)にて。

```
if (
  tmp_rmecab_result[2] %in% c("名詞", "動詞", "形容詞") && 
  tmp_rmecab_result[3] != "記号" && tmp_rmecab_result[3] != "非自立"
) {
```

この部分で、形態素解析された単語から、
一部分析するにあたり不要そうな単語を取り除いています。
例えば、助詞の「てにをは」などです。

ちなみにword2vecで単語をベクトル化すると、
単語同士の距離（意味が近いとかそういう意味）や
足し算引き算ができる・・・

らしいです。
すいません、僕もあんまり分かってないです。

機械的に特定の括りの文章を分析するにあたり活用される手法で、
クチコミなどの意見で頻出単語は何か、
特定の単語はどういう意味で使われるかを出したりなど、
便利そうだと考えてます。

この辺、統計の知識がなくてもとりあえず使えるっていうのは、
エンジニアとしては勉強のきっかけにしやすくてよいです。

これでひとまず事前準備が終わりました。

## 訓練したモデルから言葉の定義を聞いてみる

### Word Cloudで集めた歌詞から頻出単語の意味を聞いてみる

Word CloudはSNSなどでよく見る、
頻出単語を算出して、頻度の大きい単語を大きく表示する
可視化ツールです。

amazarashiの歌詞を全部収集したテキストから
Word Cloudを生成すると下記の画像のようになります。
ソースコードは[こちら](https://github.com/enyuka/rlang_mokumoku/blob/master/src/amz/wordcloudAmzKashi.R)

TODO https://drive.google.com/file/d/18Ik0XycReIBZx5SusQs7QWGW_K89cFLd/view?usp=sharing

この手の分析って何番煎じだって話ですが、
例えば下記記事のAKB48と乃木坂48を分析された結果とは大きく異なってますね。
[https://www.randpy.tokyo/entry/r_word2vec](https://www.randpy.tokyo/entry/r_word2vec)

amazarashiの歌詞だと、不穏な単語が使われているのが
比較するとよくわかりますね。
例えば、`死体`とか`ミサイル`とか。
歌詞というか、そもそも[ミサイル](https://www.uta-net.com/song/144476/)っていうめちゃくちゃ不穏な曲がありますｗ

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=birdmangai-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00FT2SWV8&linkId=f034a964bb6cec3c6bfa9b1118ed7628"></iframe>

この時点で感覚的にはバンドとして、
歌詞の特徴が見えてきたような気がしています。

Word Cloudによると、amazarashiがよく使う単語は下記のようですね。

* 僕（ら）
* 人
* 君

amazarashiの歌詞は`僕`である、
作詞者の秋田ひろむさんの実体験が多いとのことです。
`僕`(=秋田ひろむ)が、`人`にどう言われてきて、
`君`(=聴いてる人)に何かを伝えようとしているみたいですね。

この辺の単語について、どういう意味かを
word2vecを利用し、聞いてみます。

### 僕

```
model_amz %>% closest_to(model_amz [["僕"]])
     word similarity to model_amz[["僕"]]
1      僕                       1.0000000
2    彼女                       0.8193216
3  分かっ                       0.8111108
4    面影                       0.7641332
5    自分                       0.7496599
6    描い                       0.7411502
7  間違っ                       0.7344807
8    始め                       0.7333369
9    仲間                       0.7311003
10   少年                       0.7263136
```

僕の意味は**彼女！**

[昔別れた彼女の曲](https://amzn.to/2IxOskC)書いてるし、
創作活動に影響があったようでインタビューなどで
たまに彼女の話が出ています。

作詞者である秋田ひろむを指す、
`僕`という単語に一番似た意味を持っているのが、
`彼女`なのは、amazarashiっぽいです。

### 人

```
model_amz %>% closest_to(model_amz [["人"]])
     word similarity to model_amz[["人"]]
1      人                       1.0000000
2  分かち                       0.8568998
3  増える                       0.8543683
4    作る                       0.8488121
5    呼ん                       0.8406266
6    遠い                       0.8262890
7    悪意                       0.8239513
8    散々                       0.8206008
9    嘲笑                       0.8192508
10   理由                       0.8173189
```

6番目から下がめっちゃ暗いですね。
つなげると、「遠くの人に散々悪意ある嘲笑をされる」。

このような歌詞の曲があるのも事実で、
`「それでも」`という部分を歌っているamazarashiっぽいですね。

### 君

```
model_amz %>% closest_to(model_amz [["君"]])
           word similarity to model_amz[["君"]]
1            君                       1.0000000
2          痛み                       0.7951332
3          多き                       0.7580707
4          何者                       0.7563577
5          無き                       0.7544988
6          行く                       0.7526496
7          呼ん                       0.7365139
8          都市                       0.7335247
9  ルラルラルラ                       0.7331535
10         僕達                       0.7283751
```

つなげると、「痛み多き、何者でも無き僕達」。

バンドコンセプトにつながる文章ですね。
> 日常に降りかかる悲しみや苦しみを雨に例え、僕らは雨曝

君というのは、amazarashiを聴いてる僕達に
向けて歌われているのだとわかります。

## 分析の結論

僕という単語で近い意味なのは彼女と出ましたが、
これは作詞者である秋田ひろむさんへの
影響があったからで、基本的には秋田さん自身と
考えて良いでしょう。

人はamazarashiが売れる前の周りからいろいろと言われた
経験が色濃く出ているようです。

そして、君はamazarashiを聴いてる僕達。

そのため、秋田さんが人から嘲笑されつつも、
それでも僕達へ向けてメッセージボトルを出してくれている
という結論に至りました。

メッセージボトルは海に手紙を入れた瓶を出すイメージです。
その手紙は誰に届くのかもわからないし、
そもそも誰にも届かないかもしれない。
それでも、送ってくれたメッセージボトルを
受け取れたことを嬉しく思います。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=birdmangai-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B01MY9I35P&linkId=456a2f307614c17712e2435732836006"></iframe>

## 分析していて感じたこと

### 分析の結果に個人の思考/志向/嗜好が入ってしまう

最初に作成したソースコードで分析したところ、
**なんかいまいちイメージと違う**（解釈が厄介なオタク）となり、
レビューをもらいました。

そこで、次元数と学習回数が低いのでは？
という指摘を受け、[train_word2vec](https://rdrr.io/github/bmschmidt/wordVectors/man/train_word2vec.html)の引数を変更してみたところ、
結果がかなり変わりました。

変わった結果、個人の思考/志向/嗜好として、かなりamazarashiっぽい！
と思い、分析結果が改善したと感じています。
しかし、感じただけなので、手法としては本当に正しいのか？
疑問が残っています。

今回は趣味の延長線なので問題ないですが、
データ分析された結果をうのみにしたり、
恣意的な結論にならないように注意が必要そうです。

### あいうえお順で前後の曲が関係性の高い歌詞として認識される

[https://www.uta-net.com/search/?Keyword=amazarashi](https://www.uta-net.com/search/?Keyword=amazarashi)

歌詞一覧ページは上記の通り、あいうえお順で並んでいます。
このページをそのままスクレイピングし
発売日順や同じアルバムなどにソートせずに
data.frameに入れて利用しています。

そのため、アイザックとアイスクリームという曲は
発売年も離れてるし、別アルバム収録ですが、
アイザックの歌詞の最後とアイスクリームの歌詞の最初は
関連性が高いという評価になります。
発売年月日でソートしたりすることで多少は改善されそうですが、
どうするのがいいんでしょうかね？

### 本当に歌詞の特徴が出るのか？

もくもく書いている最中にこの疑問が湧いてきたのですが、
結論、特徴は出そうです。

今回分析したのはamazarashiというバンドですが、
ソースコードを流用し、Word Cloudで頻出単語を出したところ、
相当の違いがありました。

#### 凛として時雨のWord Cloud

amazarashiと似ていると思っているバンドです。
そんな凛として時雨のWord Cloudはこれです。

TODO 画像貼る

**なんということでしょう**

amazarashi頻出単語の僕、君、世界と言った単語が頻出です。
感覚的に似ているが、データによって視覚化されました。
Word Cloudの外側を見ると、
作詞者TKの独特な感性が出ているように感じます。

#### 打首獄門同好会のWord Cloud

最近、注目度No.1（個人の感想です）の打首獄門同好会です。
[https://ja.wikipedia.org/wiki/%E6%89%93%E9%A6%96%E7%8D%84%E9%96%80%E5%90%8C%E5%A5%BD%E4%BC%9A](https://ja.wikipedia.org/wiki/%E6%89%93%E9%A6%96%E7%8D%84%E9%96%80%E5%90%8C%E5%A5%BD%E4%BC%9A)

上記Wikipediaから引用。
> 日常の中で感じたことをそのまま表現した緩めの歌詞（食べ物が美味しかったこと、虫歯になったこと、風呂に入って幸せだったこと、等）が特徴で、「生活密着型ラウドロック」というジャンルを標ぼうしている

「日常」を取り扱う点ではamazarashiと打首獄門同好会は
似ていると言えるかもしれません。
ただ、amazarashiは`日常に降りかかる悲しみや苦しみ`を歌うのに対し、
打首獄門同好会は`食べ物が美味しかったこと、虫歯になったこと、風呂に入って幸せだったこと、等`、
日常の生活で感じたことを歌っているので、
コンセプトが全然異なっています。

そんな打首獄門同好会のWord Cloudはこちら。

TODO 画像貼る

最頻出単語がOK！ｗ
他の頻出単語に最高やラブと言ったポジティブな単語も多いですね。
なんと自己肯定感の高いバンドなのでしょう。

それ以外の頻出単語に孫や猫といったかわいいもの。
肉や魚、丼やタコ、岩下（の新生姜）といった
おいしい食べ物が並び、
風呂や布団と言った生活感あふれる単語が多く並んでいます。

日常を取り扱うamazarashiと打首獄門同好会。
しかし、歌詞の特徴は全く異なっており、
非常に面白い結果が出ました。

## まとめ

amazarashiっぽい歌詞っていうのはあるし、
似た特徴の歌詞を持つバンドを探すことも可能そうです。
当初の目的であった機械的に似たバンドを探してきて、
好きになれそうなバンドを見つけるっていうのが実現できそうです。

R言語もくもく会は転職にあたり参加できなくなりますが、
そもそものモチベーションは分析もできるエンジニアは
キャリアパスとして有利なのでは？なので、
これからも引き続き勉強は続けていきます。

ちなみにamazarashiも凛として時雨も打首獄門同好会も
めっちゃおすすめなのでぜひ聴いてみてください。

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=birdmangai-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00PR0IREY&linkId=faa4dffe3393df993c3ba31ab7f3a612"></iframe>

<iframe style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=birdmangai-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B07VCKB5H4&linkId=700c14c8cf7d7bcf2bfaa854386d9e9c"></iframe>