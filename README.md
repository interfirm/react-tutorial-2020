# React Tutorial 2020

## このアプリを作った背景・目的
入社前研修のReactの課題
- 三目並べゲーム (tic-tac-toe) の開発
- hook を用いて開発
- ESLint, Prettierの導入

### 追加課題
- React Tutorial [追加課題](https://ja.reactjs.org/tutorial/tutorial.html#wrapping-up)
```
1. 履歴内のそれぞれの着手の位置を (col, row) というフォーマットで表示する。
2. 着手履歴のリスト中で現在選択されているアイテムをボールドにする。
3. Board でマス目を並べる部分を、ハードコーディングではなく 2 つのループを使用するように書き換える。
4. 着手履歴のリストを昇順・降順いずれでも並べかえられるよう、トグルボタンを追加する。
5. どちらかが勝利した際に、勝利につながった 3 つのマス目をハイライトする。
6. どちらも勝利しなかった場合、結果が引き分けになったというメッセージを表示する。
```
- 関数コンポーネントに置き換える

### 参考
[React 公式チュートリアル](https://ja.reactjs.org/tutorial/tutorial.html#setup-option-2-local-development-environment)

## このアプリの使い方
`http://localhost:3000/`にアクセスし React App を開く

### 実行手順
```sh
yarn install
yarn start
```

## どこまで実装が完了して、何が終わっていないか

### 実装済
- ３目並べができる
- 追加課題

### 未実装
特になし