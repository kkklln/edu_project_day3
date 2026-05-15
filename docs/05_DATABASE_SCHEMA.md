# Database Schema

## Table: sentiment_logs

| Column | Type |
|---|---|
| id | uuid |
| input_text | text |
| sentiment | varchar |
| confidence | integer |
| reason | text |
| created_at | timestamp |

## SQL

```sql
CREATE TABLE sentiment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  input_text TEXT NOT NULL,
  sentiment VARCHAR(20) NOT NULL,
  confidence INTEGER NOT NULL,
  reason TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## DONE 조건
- 테이블 생성 완료
- Insert 성공
