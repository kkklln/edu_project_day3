# Backend Specification

## 기술
- Node.js
- Express.js

## 구조

```txt
backend/
├── routes/
├── controllers/
├── services/
├── middleware/
└── utils/
```

## 주요 기능
- POST /api/analyze
- OpenAI API 호출
- 에러 처리
- Validation

## 환경변수
- OPENAI_API_KEY
- SUPABASE_URL
- SUPABASE_KEY

## DONE 조건
- 서버 실행 성공
- API 응답 성공
