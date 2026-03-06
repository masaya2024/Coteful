# Conteful Diagram Index

このディレクトリには、Conteful MVP の初期設計図を配置する。

対象図:
- `er-diagram.md`: 概念ER図
- `system-relationship.md`: システム関係図
- `db-schema.md`: DB設計図

前提:
- MVP の実装データソースは `src/mocks/mock-data.ts`
- 永続化フェーズでは `PostgreSQL` を主DB候補とする
- メディア実体は将来的に `Object Storage` へ配置する
- APIは `Admin API` と `Delivery API` を分離する
- 可変フィールド構造に対応するため、DB設計は `entry_field_values` を中心とした柔軟な構造にする

draw.io 利用方針:
- Mermaidブロックをそのまま draw.io へ貼り付けて再編集できるようにしている
- 色はレビューしやすさを優先して淡いグレー / ブルー / グリーン系で整理している
