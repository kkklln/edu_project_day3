const express = require('express');
const cors = require('cors');
require('dotenv').config();

const analyzeRouter = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // 모든 도메인에서의 요청 허용 (실제 배포시 제한 필요)
app.use(express.json()); // JSON 본문 파싱

// 라우터 연결
app.use('/api', analyzeRouter);

// 기본 경로 확인용
app.get('/', (req, res) => {
  res.send('AI Sentiment Insight Server is running!');
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
