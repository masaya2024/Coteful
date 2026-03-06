# Conteful MVP要件定義

## 1. 目的

Nuxt 4 / Vue 3 / Node.js 22 / Tailwind CSS / TypeScript で、ContentfulライクなヘッドレスCMS管理画面のMVPを構築する。

初期フェーズでは以下を重視する。

- コンテンツモデルを作成できる
- モデルごとにコンテンツを登録・編集できる
- メディアを登録・一覧表示できる
- 外部システムから取得しやすいAPI前提の設計にする
- まずはモックデータで画面と操作フローを成立させる

「そのまま再現」ではなく、まずは必要最小限のCMS機能に絞った `ContentfulライクなMVP` として定義する。

## 2. スコープ

### 対象

- 管理画面
- コンテンツモデル管理
- コンテンツエントリー管理
- メディア管理
- 外部公開を見据えたAPI設計

### 初期MVPで含めるもの

- ダッシュボード
- Content Model 一覧 / 作成 / 編集 / 詳細
- Entry 一覧 / 作成 / 編集 / 詳細
- Media 一覧 / 登録 / 詳細
- API設定ページの土台
- モックデータによるCRUD風UI

### 初期MVPで含めないもの

- 権限管理の細分化
- 多言語対応
- ワークフロー承認
- バージョン履歴の完全再現
- Webhook実送信
- 本番用ストレージや本番DB接続
- 高機能リッチテキストエディタ

## 3. 想定ユーザー

- 社内運用担当者
- コンテンツ編集担当者
- 外部システム連携を行う開発者

## 4. 画面要件

カードUIはできる限り使わず、一覧・区切り線・テーブル・左右分割レイアウトを基本とする。
色は白黒基調で設計し、強調は濃淡・罫線・タイポグラフィ・アイコンで表現する。

### 4.1 TOPページ

目的:
- 全体状況を最短で把握する
- モデル / エントリー / メディア / APIの導線を提供する

表示項目:
- Content Model件数
- Entry件数
- Media件数
- 最近更新されたContent Model
- 最近更新されたEntry
- 最近追加されたMedia
- 主要メニューへのクイックリンク

UI方針:
- 上部にページタイトルと簡易サマリー
- 中央は「最近更新」中心の縦リスト
- 下部または側面に各管理画面への導線

### 4.2 Content Model一覧ページ

目的:
- 作成済みモデルを一覧で把握する
- 新規作成と既存編集へすぐ遷移できる

表示項目:
- モデル名
- API ID
- フィールド数
- ステータス
- 更新日時

操作:
- 新規作成
- モデル検索
- 行クリックで詳細へ遷移
- モデル削除

UI方針:
- テーブルまたはリスト形式
- 左にモデル名、右に補足情報
- 行区切りベースで構成し、カード化しない

### 4.3 Content Model詳細ページ

目的:
- モデル定義を編集する
- 詳細ページ項目を設定する

表示項目:
- モデル基本情報
- フィールド一覧
- フィールド種別
- 必須設定
- 一意制約
- 表示順
- APIレスポンスへの含め方

操作:
- モデル名編集
- API ID編集
- フィールド追加
- フィールド編集
- フィールド削除
- フィールド並び替え

設定可能なフィールド型:
- `text`
- `textarea`
- `richText`
- `number`
- `boolean`
- `date`
- `json`
- `media`
- `reference`

詳細ページ項目の設定:
- 一覧に表示する主項目
- 詳細で上部に表示するタイトル項目
- slug候補項目
- 公開APIでのキー名
- 必須 / 任意
- バリデーションルール

### 4.4 Entry一覧ページ

目的:
- モデルごとのコンテンツを一覧表示する

表示項目:
- タイトル
- 対象モデル
- ステータス
- 公開状態
- 更新日時

操作:
- モデル切替
- 新規Entry作成
- 検索
- 詳細表示
- 編集
- 削除

UI方針:
- モデル切替はタブまたはセレクト
- 一覧は行ベース
- 公開状態は小さなラベルで表現

### 4.5 Entry登録 / 編集ページ

目的:
- モデル定義に応じて動的フォームを表示し、Entryを登録する

表示項目:
- タイトル
- 各フィールド入力欄
- ステータス
- スラッグ
- 更新情報

操作:
- 下書き保存
- 公開
- 非公開
- 削除

要件:
- Content Model定義に応じてフォームを自動生成する
- `media` 型はメディア選択UIと連携する
- `reference` 型は別Entryを選択できる

### 4.6 Media一覧ページ

目的:
- 登録済みメディアを一覧管理する

表示項目:
- サムネイル
- ファイル名
- MIME type
- サイズ
- 更新日時

操作:
- 登録画面へ遷移
- 検索
- フィルタ
- 詳細表示
- 削除

UI方針:
- グリッドではなく縦リストまたは表形式を優先
- サムネイルは小さく、情報を横並びで整理

### 4.7 Media登録ページ

目的:
- メディアを新規登録する

表示項目:
- ファイル選択
- ファイル名
- 代替テキスト
- 説明
- タグ

操作:
- アップロード
- 保存
- キャンセル

初期実装:
- 実ファイルアップロードはモックで代替
- 仮URL、仮サイズ、仮MIME typeを返す

### 4.8 Media詳細ページ

目的:
- メディアの属性を確認・編集する

表示項目:
- プレビュー
- ファイル情報
- メタ情報
- 参照中Entry数

操作:
- 更新
- 削除

### 4.9 API設定ページ

目的:
- 外部連携前提の設定画面を置く

表示項目:
- APIベースURL
- 公開APIトークン一覧
- 管理APIトークン一覧
- 利用可能エンドポイント例

操作:
- トークン発行UIのモック
- トークン無効化UIのモック
- レスポンスサンプル表示

## 5. 機能要件

### 5.1 Content Model管理

- Content Modelを作成できる
- 各Modelに複数Fieldを定義できる
- Fieldの順序を変更できる
- Fieldごとにバリデーションを持てる
- モデル単位でAPI IDを持つ

### 5.2 Entry管理

- Modelを選んでEntryを作成できる
- Model定義からフォームを自動生成する
- 下書き / 公開の状態を持つ
- 一覧 / 詳細 / 編集 / 削除ができる

### 5.3 Media管理

- メディア一覧を確認できる
- メディアを登録できる
- メディア詳細を確認できる
- Entryからメディア参照できる

### 5.4 API連携前提

- 管理画面とAPI層を分離しやすい構成にする
- モデル / Entry / Media をRESTで取得できる前提にする
- 将来の認証導入を想定してトークン概念を置く
- エンドポイントは `/api/v1/` 配下でバージョニングする

## 6. データ要件

型定義は1ファイルに集約し、各画面・composable・mock・server routes から共通利用する。

推奨:
- `types/index.ts`

追加方針:
- TypeScriptを必須とする
- 画面、composables、repository、server routes ですべて共通型を利用する

### 6.1 主な型

- `ContentModel`
- `ContentField`
- `ContentEntry`
- `MediaItem`
- `ApiToken`
- `SelectOption`
- `ApiListResponse<T>`

### 6.2 ContentModel

必要プロパティ例:
- `id`
- `name`
- `apiId`
- `description`
- `fields`
- `createdAt`
- `updatedAt`

### 6.3 ContentField

必要プロパティ例:
- `id`
- `name`
- `key`
- `type`
- `required`
- `unique`
- `isTitle`
- `showInList`
- `validation`
- `order`

### 6.4 ContentEntry

必要プロパティ例:
- `id`
- `modelId`
- `title`
- `slug`
- `status`
- `fields`
- `publishedAt`
- `createdAt`
- `updatedAt`

### 6.5 MediaItem

必要プロパティ例:
- `id`
- `fileName`
- `url`
- `mimeType`
- `size`
- `alt`
- `description`
- `tags`
- `createdAt`
- `updatedAt`

## 7. API要件

MVP段階ではNuxtの `server/api` を使い、モックデータを返す。
将来的に外部公開APIへ置き換えやすいように、画面から直接モック配列を読むのではなく repository / service 経由で参照する。

### 7.1 APIの責務分離

- Admin API: 管理画面用の作成・更新・削除
- Delivery API: 外部公開用の取得専用

### 7.2 想定エンドポイント

Admin API:
- `GET /api/v1/admin/models`
- `POST /api/v1/admin/models`
- `GET /api/v1/admin/models/:id`
- `PATCH /api/v1/admin/models/:id`
- `DELETE /api/v1/admin/models/:id`
- `GET /api/v1/admin/entries`
- `POST /api/v1/admin/entries`
- `GET /api/v1/admin/entries/:id`
- `PATCH /api/v1/admin/entries/:id`
- `DELETE /api/v1/admin/entries/:id`
- `GET /api/v1/admin/media`
- `POST /api/v1/admin/media`
- `GET /api/v1/admin/media/:id`
- `PATCH /api/v1/admin/media/:id`
- `DELETE /api/v1/admin/media/:id`

Delivery API:
- `GET /api/v1/content/:modelApiId`
- `GET /api/v1/content/:modelApiId/:entryId`
- `GET /api/v1/media`
- `GET /api/v1/media/:id`

### 7.3 API設計方針

- レスポンス形式はできるだけ統一する
- `id` は文字列で扱う
- `status`, `createdAt`, `updatedAt` を基本で返す
- 将来の認証追加を見据えてHeaderベースのトークン方式を想定する

## 8. UI / デザイン要件

### 8.1 デザイン方針

- 白黒ベース
- 余白と罫線で情報を整理
- 角丸の強いカードは使わない
- ヘッダー、サイドバー、一覧、フォームをフラットに見せる

### 8.2 レイアウト方針

- 左サイドバー + 右メインを基本構成とする
- 一覧画面はテーブルまたは縦リスト中心
- 詳細・編集は左右2カラムまたは縦分割

### 8.3 タイポグラフィ

- Google Fonts を `nuxt.config.ts` で読み込む
- 英数字が見やすく、管理画面に合うフォントを採用する
- アイコンも `nuxt.config.ts` 経由で導入する

候補:
- `IBM Plex Sans`
- `Noto Sans JP`

### 8.4 アイコン

- 行動導線の補助に限定して使用する
- 過度に装飾しない
- CRUD操作、ナビゲーション、状態表示に絞る

## 9. フロントエンド実装方針

### 9.1 技術スタック

- Nuxt 4
- Vue 3
- Node.js 22
- Tailwind CSS
- TypeScript

### 9.2 実装方針

- pagesベースで画面構成する
- composablesで取得・更新処理を抽象化する
- 型は `types/index.ts` に集約する
- mockデータは1ファイルに集約する
- 推奨ファイルは `src/mocks/mock-data.ts` とする
- server routes も composables も直接配列を持たず、共通mock定義を参照する
- 画面はAPIを直接叩かず、repository相当の窓口を通す
- `.vue` 内のscriptは `lang="ts"` を前提とする
- composables / utils / server API はすべて `.ts` で実装する

### 9.3 推奨ディレクトリ案

```text
src/
  app.vue
  nuxt.config.ts
  pages/
  components/
  composables/
  layouts/
  repositories/
  mocks/
    mock-data.ts
  server/
    api/
  types/
    index.ts
  utils/
```

## 10. モック要件

- 一覧表示に必要な初期データを用意する
- 作成・更新・削除は疑似的に成功する挙動を返す
- APIレスポンス形式を本番想定に寄せる
- 将来、DBや外部ストレージに差し替えやすいようにする
- モックデータは1ファイルのみで管理する
- 推奨ファイルは `src/mocks/mock-data.ts` とする
- `ContentModel[]`, `ContentEntry[]`, `MediaItem[]`, `ApiToken[]` を同一ファイルでexportする
- mockの参照は repository 経由に寄せ、実データ移行時の差分を最小にする
- 将来の削除対象を明確にするため、画面コンポーネント内に仮データを直書きしない

## 11. 非機能要件

- PC表示を優先しつつ、タブレット幅まで崩れないこと
- 主要画面で初回表示が速いこと
- モーダル依存を減らし、URLベースで画面遷移できること
- アクセシビリティとしてフォームラベルとキーボード操作を考慮すること

## 12. MVP開発タスク分解

以下は実装順を意識したMVP開発タスクである。

### 12.1 プロジェクト初期構築

- Nuxt 4 プロジェクトを作成する
- Node.js 22 前提で動作確認する
- TypeScript を有効化する
- Tailwind CSS を導入する
- `nuxt.config.ts` を作成する
- Google Fonts を `nuxt.config.ts` で読み込む
- icons を `nuxt.config.ts` で読み込む
- 基本レイアウトの土台を用意する
- ESLint / Prettier 導入有無を決める

### 12.2 ディレクトリ構成整備

- `pages/` を作成する
- `components/` を作成する
- `layouts/` を作成する
- `composables/` を作成する
- `repositories/` を作成する
- `server/api/` を作成する
- `types/index.ts` を作成する
- `src/mocks/mock-data.ts` を作成する

### 12.3 型定義整備

- `types/index.ts` に共通型を集約する
- `ContentFieldType` を union type で定義する
- `EntryStatus` を型で定義する
- `ContentModel` 型を定義する
- `ContentField` 型を定義する
- `ContentEntry` 型を定義する
- `MediaItem` 型を定義する
- `ApiToken` 型を定義する
- API共通レスポンス型を定義する
- フォーム入力用の補助型を定義する

### 12.4 モックデータ整備

- `src/mocks/mock-data.ts` にモックデータを集約する
- Content Modelの初期データを用意する
- Entryの初期データを用意する
- Mediaの初期データを用意する
- API Tokenの初期データを用意する
- 一覧表示に必要な件数・更新日時を揃える
- モデルとEntryの参照関係を揃える
- MediaとEntryの参照関係を揃える
- 後で削除しやすいよう、mock helperも同一ファイルに寄せる

### 12.5 repository / service 層の作成

- Model用repositoryを作成する
- Entry用repositoryを作成する
- Media用repositoryを作成する
- Token用repositoryを作成する
- 初期実装では repository が `mock-data.ts` を読む構成にする
- 将来は repository の差し替えのみで本番APIへ移行できるようにする

### 12.6 Admin APIモック実装

- `GET /api/v1/admin/models` を実装する
- `GET /api/v1/admin/models/:id` を実装する
- `POST /api/v1/admin/models` を実装する
- `PATCH /api/v1/admin/models/:id` を実装する
- `DELETE /api/v1/admin/models/:id` を実装する
- `GET /api/v1/admin/entries` を実装する
- `GET /api/v1/admin/entries/:id` を実装する
- `POST /api/v1/admin/entries` を実装する
- `PATCH /api/v1/admin/entries/:id` を実装する
- `DELETE /api/v1/admin/entries/:id` を実装する
- `GET /api/v1/admin/media` を実装する
- `GET /api/v1/admin/media/:id` を実装する
- `POST /api/v1/admin/media` を実装する
- `PATCH /api/v1/admin/media/:id` を実装する
- `DELETE /api/v1/admin/media/:id` を実装する

### 12.7 Delivery APIモック実装

- `GET /api/v1/content/:modelApiId` を実装する
- `GET /api/v1/content/:modelApiId/:entryId` を実装する
- `GET /api/v1/media` を実装する
- `GET /api/v1/media/:id` を実装する
- Delivery APIは公開用に取得専用とする

### 12.8 共通UI部品の実装

- サイドバーを実装する
- ヘッダーを実装する
- ページタイトル行を実装する
- 区切り線ベースの一覧UIを実装する
- テーブルUIを実装する
- フォーム入力UIを実装する
- ステータスラベルUIを実装する
- 空状態UIを実装する
- 削除確認UIを実装する

### 12.9 レイアウト実装

- デフォルトレイアウトを実装する
- 左サイドバー + 右メイン構成を実装する
- 主要導線をサイドバーに配置する
- モバイル / タブレット時の折りたたみ挙動を決める
- 白黒テーマのCSS変数を定義する

### 12.10 TOPページ実装

- 件数サマリーを表示する
- 最近更新Model一覧を表示する
- 最近更新Entry一覧を表示する
- 最近追加Media一覧を表示する
- 各管理画面への導線を配置する

### 12.11 Content Model一覧ページ実装

- モデル一覧取得を実装する
- モデル名検索を実装する
- 一覧行クリックで詳細遷移させる
- 新規作成導線を配置する
- 削除操作を実装する

### 12.12 Content Model詳細ページ実装

- モデル基本情報表示を実装する
- モデル基本情報編集を実装する
- フィールド一覧表示を実装する
- フィールド追加を実装する
- フィールド編集を実装する
- フィールド削除を実装する
- フィールド並び替えUIを実装する
- `isTitle` 設定を実装する
- `showInList` 設定を実装する
- validation設定UIを実装する

### 12.13 Entry一覧ページ実装

- モデル切替UIを実装する
- モデル別Entry一覧取得を実装する
- Entry検索を実装する
- ステータス表示を実装する
- 新規Entry作成導線を実装する
- 詳細 / 編集遷移を実装する
- 削除操作を実装する

### 12.14 Entry登録 / 編集ページ実装

- Model定義から動的フォーム生成を実装する
- `text` 入力を実装する
- `textarea` 入力を実装する
- `number` 入力を実装する
- `boolean` 入力を実装する
- `date` 入力を実装する
- `json` 入力を実装する
- `richText` の簡易入力を実装する
- `media` 選択UIを実装する
- `reference` 選択UIを実装する
- slug入力を実装する
- 下書き保存を実装する
- 公開操作を実装する
- 非公開操作を実装する
- 更新日時表示を実装する

### 12.15 Media一覧ページ実装

- Media一覧取得を実装する
- Media検索を実装する
- ファイル種別フィルタを実装する
- 行ベース一覧UIを実装する
- 詳細遷移を実装する
- 削除操作を実装する

### 12.16 Media登録ページ実装

- ファイル選択UIを実装する
- アップロード擬似処理を実装する
- ファイル名編集を実装する
- alt入力を実装する
- 説明入力を実装する
- タグ入力を実装する
- 保存処理を実装する

### 12.17 Media詳細ページ実装

- プレビュー表示を実装する
- ファイル属性表示を実装する
- メタ情報編集を実装する
- 参照中Entry数表示を実装する
- 削除操作を実装する

### 12.18 API設定ページ実装

- APIベースURL表示を実装する
- 公開APIトークン一覧表示を実装する
- 管理APIトークン一覧表示を実装する
- トークン発行モックを実装する
- トークン無効化モックを実装する
- エンドポイント例表示を実装する
- サンプルレスポンス表示を実装する

### 12.19 composables実装

- Model取得用composableを実装する
- Entry取得用composableを実装する
- Media取得用composableを実装する
- Token取得用composableを実装する
- 作成 / 更新 / 削除用composableを実装する
- APIエラー状態管理を実装する
- loading状態管理を実装する

### 12.20 動作確認タスク

- 主要画面の遷移確認を行う
- モデル作成からEntry作成までの流れを確認する
- Media登録からEntry参照までの流れを確認する
- Admin APIのレスポンス形式を確認する
- Delivery APIの取得結果を確認する
- mock-data.ts 依存箇所が repository に閉じているか確認する
- 画面内に仮データ直書きが残っていないか確認する
- TypeScriptエラーがないことを確認する

## 13. 初期優先順位

### Phase 1

- プロジェクト初期構築
- 型定義整備
- モックデータ整備
- repository / service 層の作成
- レイアウト実装
- TOPページ
- Content Model一覧
- Content Model詳細
- Entry一覧
- Entry登録 / 編集
- Media一覧
- Media登録

### Phase 2

- Media詳細
- API設定ページ
- Delivery APIのモック整備
- UI調整
- リファクタリング

## 14. 未確定事項

以下は実装前に確定すると手戻りが減る。

- 認証をMVPに含めるか
- Entryの公開状態を `draft/published` の2値で十分か
- slugを全Modelで必須にするか
- Media保存先を将来どこに置くか
- APIトークンの権限粒度をどこまで持たせるか

## 15. 受け入れ条件

- TOP / Content Model / Entry / Media / API設定の主要画面要件が定義されている
- 白黒基調、非カード中心のUI方針が明文化されている
- モック前提の実装条件が整理されている
- 外部APIを見据えた責務分離が定義されている
- 型定義集約方針が明記されている
- TypeScript必須であることが明記されている
- モックデータ1ファイル集中管理方針が明記されている
