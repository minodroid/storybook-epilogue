# The Storybook – Epilogue

既存の Find Our Story 本番サイトとは完全に独立した、結婚式後のお礼ページです。

## 特徴
- ログイン不要
- Supabase不要
- API不要
- 既存コードへの変更不要
- HTML / CSS / JavaScriptのみ
- Vercelへそのままデプロイ可能
- スマホ対応
- Opening / Profile Movie 埋め込み対応
- Lost Piece答え合わせ
- Lost Pages 7ページを全公開

## まず編集する場所
`content.js`

### 1. 動画URL
```js
videos: {
  opening: "YouTube URL",
  profile: "YouTube URL"
}
```

YouTube限定公開URLでも埋め込み可能です。

### 2. クイズ
`answers` 配列を最終確定内容に差し替えてください。
現時点で確定情報が不足している項目には「※ 最終確定...」を入れています。

### 3. Lost Pages
`pages` 配列の文章を自由に編集できます。

## Vercelへの公開方法
1. このフォルダを新規GitHubリポジトリへアップロード
2. Vercelで `Add New > Project`
3. 新しいリポジトリをImport
4. Framework Presetは `Other`
5. Build Commandは空欄
6. Output Directoryは空欄
7. Deploy

既存の `storybook-explore-demo` プロジェクトには一切触れません。

## URL例
`storybook-epilogue.vercel.app`

公開後、そのURLからQRコードを作成してください。

## 動画の権利について
披露宴会場で上映できた映像でも、Web上での公開・配信は別の権利処理が必要になる場合があります。
市販楽曲を含む映像は、公開前に権利条件を確認してください。


## Google Drive動画設定
Opening / Profile はGoogle Driveの /preview URLを設定済みです。Drive側の共有設定を「リンクを知っている全員が閲覧可」にしてください。
