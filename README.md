# Procyon（仮称）

## 概要
Comfortable PandAに加えていくつかの機能を追加します．Comfortable PandAとUIが似ていますが，依存関係はありません．

## 時間割管理機能
ページ上部に"+"アイコンが追加され，クリックで開くと時間割表にコースへのリンクが現れます．
- リンクのエントリー右側にある下矢印をクリックするとメニューが現れ，「お知らせ」「課題」といった各コースのサイトに直接移動することができます．
- 最も締切が近い未提出の課題を取得し，締切までの残り時間によってエントリーを色分けします（Comfortable PandAと同じ色分け）．**すでに提出した課題は締切の判定から除外されます**．
- 時間割の表はライトテーマ・ダークテーマの両方に対応しています．

### 注意
- アイコンはログイン時のみ表示されます．
- クイズの一覧と締切時刻は取得できますが，**クイズを提出したかどうかは取得できません**．これはPandAが用いているAPIの仕様で，今のところ解決する方法はないようです．したがって，クイズについては「提出していてもいなくても締切の判定に用いる（＝すべて未提出と判断する）」「クイズは締切の判定において無視する（＝すべて提出済みと判断する）」という二つの選択肢がありましたが，現時点では後者を採用しています．開発段階ですので前者のほうがよいということであれば教えてください．
- エントリーの色分けでは，締切の基準日数・色は現状Comfortable Pandaのデフォルトで固定されています．自由に設定できる機能を実装予定です．

## その他の機能
- デフォルトのPandAでは，右上のメニューからコース一覧のウィンドウを出したあと，このウィンドウを (1) ウィンドウ右上の☓印をクリックする，(2) ウィンドウの外側をクリックする，(3) キーボードのEscキーを押す ことで閉じるとウィンドウが正しく閉じたことにならず，スクロールがロックされます．この拡張機能はこれらの操作でウィンドウが正しく閉じるように設定します．
- ECS-IDとパスワードでログインする際，ログインボタンの上にカーソルを置くとポインター（指のようなアイコン）になるようにします．
