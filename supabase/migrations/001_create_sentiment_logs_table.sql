-- 001_create_sentiment_logs_table.sql
-- 감성 분석 결과를 저장하기 위한 테이블 생성

CREATE TABLE IF NOT EXISTS sentiment_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(), -- 고유 아이디
  input_text TEXT NOT NULL,                      -- 사용자가 입력한 텍스트 (암호화되어 저장됨)
  sentiment VARCHAR(20) NOT NULL,                -- 분석된 감성 (긍정, 부정, 중립)
  confidence INTEGER NOT NULL,                   -- 분석 신뢰도 (0~100)
  reason TEXT,                                   -- 분석 이유 (암호화되어 저장됨)
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() -- 생성 일시
);

-- 보안을 위해 RLS(Row Level Security) 설정 (선택 사항이지만 권장됨)
-- 여기서는 기본적인 테이블 생성을 우선으로 합니다.