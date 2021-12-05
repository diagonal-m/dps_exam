# dps_exam
四択問題選択肢択一一問一答問題集アプリ

## テーブル定義

### 問題(questions)

| カラム名    | 項目名   | 項目概要                 | データ型 |
| ----------- | -------- | ------------------------ | -------- |
| id          | ID       | ID                       | bigint   |
| question    | 問題     | 問題文文字列             | text     |
| consecutive | 連続     | 何回連続で正解しているか | int      |
| created_at  | 作成日時 | 作成日時                 | datetime |
| updated_at  | 更新日時 | 更新日時                 | datetime |



### 選択肢(alternatives)

| カラム名    | 項目名       | 項目概要                      | データ型 |
| ----------- | ------------ | ----------------------------- | -------- |
| id          | ID           | ID                            | bigint   |
| alternative | 選択肢       | 問題の選択肢                  | text     |
| Is_correct  | 正解・不正解 | 正解の選択肢かどうかのboolean | boolean  |
| created_at  | 作成日時     | 作成日時                      | datetime |
| updated_at  | 更新日時     | 更新日時                      | Datetime |
| question_id | 問題のid     | 問題のid                      | bigint   |



### 解説(descriptions)

| カラム名       | 項目名   | 項目概要     | データ型 |
| -------------- | -------- | ------------ | -------- |
| id             | ID       | ID           | bigint   |
| description    | 解説     | 選択肢の解説 | text     |
| created_at     | 作成日時 | 更新日時     | datetime |
| alternative_id | 選択肢ID | 選択肢ID     | bigint   |

## テーブル定義

### 問題(questions)

| カラム名    | 項目名   | 項目概要                 | データ型 |
| ----------- | -------- | ------------------------ | -------- |
| id          | ID       | ID                       | bigint   |
| question    | 問題     | 問題文文字列             | text     |
| consecutive | 連続     | 何回連続で正解しているか | int      |
| created_at  | 作成日時 | 作成日時                 | datetime |
| updated_at  | 更新日時 | 更新日時                 | datetime |



### 選択肢(alternatives)

| カラム名    | 項目名       | 項目概要                      | データ型 |
| ----------- | ------------ | ----------------------------- | -------- |
| id          | ID           | ID                            | bigint   |
| alternative | 選択肢       | 問題の選択肢                  | text     |
| Is_correct  | 正解・不正解 | 正解の選択肢かどうかのboolean | boolean  |
| created_at  | 作成日時     | 作成日時                      | datetime |
| updated_at  | 更新日時     | 更新日時                      | Datetime |
| question_id | 問題のid     | 問題のid                      | bigint   |



### 解説(descriptions)

| カラム名       | 項目名   | 項目概要     | データ型 |
| -------------- | -------- | ------------ | -------- |
| id             | ID       | ID           | bigint   |
| description    | 解説     | 選択肢の解説 | text     |
| created_at     | 作成日時 | 更新日時     | datetime |
| alternative_id | 選択肢ID | 選択肢ID     | bigint   |

