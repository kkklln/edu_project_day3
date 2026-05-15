const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const analyzeRouter = require('./src/routes/analyze');

const app = express();
const PORT = process.env.PORT || 3000;

// 미들웨어 설정
app.use(cors()); // 모든 도메인에서의 요청 허용 (실제 배포시 제한 필요)
app.use(express.json()); // JSON 본문 파싱
app.use(express.static(path.join(__dirname, 'public'))); // public 폴더의 프론트엔드 정적 파일 서빙

// 라우터 연결
app.use('/api', analyzeRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
