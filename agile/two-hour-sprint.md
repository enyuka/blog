# 2時間スプリントでモブプロを回してみたのでまとめ

題名の通り、 2 時間スプリントでモブプロを試したので、まとめておきます。

## なぜ 2 時間スプリントを導入したか

前職で組んでいたチームが全員退職に伴い、最後に辞める人たちで最速最効率を求めたためです。ちなみに前職はこちらです。
https://harinoma.info/retire-from-bellface/

短時間のスプリントを回すことで、素早い改善フローが回せると考えたからです。

## 2 時間スプリントを回してどうだったか？

長所短所がはっきりした手法だと感じました。

### 長所

短時間でスプリントを回すため、不明点などが出てもすぐに次のレトロスペクティブが始まります。

そのため、不明点を聞くタイミングがわからず、不必要に長く考えてしまうということが起こりづらいです。また、モブプロのため、[トラック係数](https://dic.nicovideo.jp/a/%E3%83%88%E3%83%A9%E3%83%83%E3%82%AF%E4%BF%82%E6%95%B0)が高くできます。

### 短所

めっちゃ疲れます。

とにかく短時間でスプリントプランニングで決めたことを達成するようコミットするため、短時間で全速ダッシュが求められます。モブプロのため、ちょっと休憩とかもできないですし、スプリント本来の意味通りに全速ダッシュです。


あと、おじさん 3 人でやったのですが、おじさんはいろいろとノイズが出ますｗくしゃみしたり、鼻すすったり、あくびしたり。

zoom でつないでイヤホン使ってやってたのですが、このノイズが個人的にはけっこうストレスでした。2 時間以上連続はキツイなーという印象。

[Krisp](https://jp.vcube.com/service/krisp) をお互いのために導入したほうがいいと思う。

### 使い所

#### オンボーディング

新しく入ってきた人のオンボーディングで使うのがよいと感じました。

何でも聞いていいよ！と言われたところで、新しく入ってきた人が何でも聞けるかというとそんなことはないです。

この質問したら、こんなこともわからないのかとか思われないか？と不安になったり、調べればわかることなのか、現場での独自手法なのかの切り分けができなかったり、わからないし、聞きづらいことだらけです。

オフラインだとさっと聞けていたところが、オフラインでみんなが見られて、ログが残るチャットツールでとなるとハードル高いですよね。

その点、モブプロだと、短時間でスプリントしつつ、さっと質問できるのでオンボーディング向きだと思います。

#### 初期設計

また、初期の設計段階でチームの人数に割り当てられないくらいの大きいタスクを分解する際にも使えそうです。

何にせよ、初期フェーズに短期間導入が一番効果的だと思います。ダラダラやるのはあまりおすすめできない。

## スプリント内の時間割り

時間割りは下記でやっていました。

### プランニング

10 分間でこの 2 時間で何をするかを明確にします。

例えば、 API を作成し、データベースから必要なデータを取得する。取得したデータをフロントエンドに渡して、画面表示など。

誰が見てもわかるかつ、 2 時間で終わりそうな単位のタスクに切り出します。

### スプリント(モブプロ)

90 分間で複数人でプログラミングをします。モブプロについては後述。

### レトロスペクティブ

10 分間でスプリントでもっと改善できたことを KPT で出しました。 KPT にこだわらず、 MadSadGlad や FunDoneLearn などやりやすい手法でやります。

Try に出てきた改善点は必ず次のスプリントで取り入れていくとよいです。また、 Keep は意識的に一つは出すとモチベーション高くできます。〇〇さんの設計理解が高いとか、✗✗さんのナビゲートが的確とかそういう褒めをどんどん言っていきましょう。

### 休憩

モブプロは思ったよりも疲れるので、休憩は必須です。 10 分間休憩にして、 2 時間という体裁にしてましたが、 30 分間休憩でも許されると思います。

モブする人たちの信頼関係などに応じて、休憩時間を増やしてください。

### 1 日で回せるスプリント

上記時間割だと理論上は下記のようになります。

10:00 ~ 12:00 1 スプリント
14:00 ~ 16:00 2 スプリント
16:00 ~ 18:00 3 スプリント

驚異の 3 スプリント。平日全部やりきると、 15 スプリントも回せますね。

ただ、このやり方は体力を使うので、 2 スプリント程度までにしたほうがいいと思います。少なくともモブプロは午前と午後の 2 スプリントが限界です。

## モブプロの手法

下記のようにやっていました。

* 15 分でドライバーを交代する
  * 人数に合わせて、増減させてください
* VSCode の [Live Share](https://visualstudio.microsoft.com/ja/services/live-share/) を使うことで Git への Push/Pull のスイッチングコストを軽減する
* 先に進むばかりではなく、都度理解度を確認しながら進める
* スプリント外で事前に環境準備やコードの最新化などをしておく
  * 具体的に何をやるかを事前にすり合わせておきましょう

### ドライバーとナビゲーター

ドライバーはコーディングを行いますが、自分で考えて勝手にコーディングはしません。

ナビゲーターはコーディングを行わず、ドライバーに指示を出します。


明確に役割を分けて、ドライバー/ナビゲーターともに勝手にコーディングしないようにしましょう。

モブプロはお互いの理解度を深めるために行うので、誰かが勝手にコーディングしてしまうと理解度が曖昧なままに進んでしまいます。そのような進め方であれば、モブプロをする必要性が下がり、 1 つのタスクに対し、複数人をアサインするため、純粋に効率が悪いです。

必ず、役割を意識しましょう。

また、上にも書いた通り、都度理解度を確認するとよいでえす。
ナビゲーターがどういう意図でコーディングの指示を出しているか、理解しながらコーディングすることで、設計や仕様への理解が高まります。

## まとめ

スクラム開発で調べてるとたまに 2 時間スプリントというのがあり、それを試してみたいっていうのをチームが受け入れてくれてよかったです。

また、実際にやってみたところ、思った以上に効果的でした。特に不明点をガンガンと洗い出すことができ、これは自分の技術力の問題なのか、決めないとわからないことなのかをすぐに切り分けられのはよいです。

最後の仕事として 2 時間スプリント + モブプロで出したアウトプットが引き継がれて、プロダクトで使われることを願ってます。