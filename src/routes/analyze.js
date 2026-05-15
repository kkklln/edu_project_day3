const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
const { createClient } = require('@supabase/supabase-js');
const { encrypt } = require('../utils/crypto');

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Supabase 클라이언트 초기화
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

router.post('/analyze', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === '') {
      return res.status(400).json({ success: false, message: '분석할 텍스트를 입력해주세요.' });
    }

    // 1. OpenAI API 호출 (감성 분석)
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 또는 gpt-4
      messages: [
        {
          role: "system",
          content: "사용자 텍스트의 감정을 분석해줘. JSON 형식으로만 반환해. 구조: { \"sentiment\": \"긍정 | 부정 | 중립\", \"confidence\": 0~100, \"reason\": \"2~3문장 설명\" }"
        },
        {
          role: "user",
          content: text
        }
      ],
      temperature: 0.3,
      max_tokens: 300,
      response_format: { type: "json_object" }
    });

    const analysisResult = JSON.parse(completion.choices[0].message.content);

    // 2. 보안을 위해 데이터 암호화 (사용자 규칙 반영)
    const encryptedInput = encrypt(text);
    const encryptedReason = encrypt(analysisResult.reason);

    // 3. Supabase에 분석 결과 저장

    // - Supabase에 text, reasoning 암호화후 저장
    // const { data, error } = await supabase
    //   .from('sentiment_logs')
    //   .insert([
    //     {
    //       input_text: encryptedInput,
    //       sentiment: analysisResult.sentiment,
    //       confidence: analysisResult.confidence,
    //       reason: encryptedReason
    //     }
    //   ]);

    // Supabase에 text, reasoning 평문 저장
    const { data, error } = await supabase
      .from('sentiment_logs')
      .insert([
        {
          input_text: text,
          sentiment: analysisResult.sentiment,
          confidence: analysisResult.confidence,
          reason: analysisResult.reason
        }
      ]);

    if (error) {
      console.error('Supabase Save Error:', error);
      // 저장 실패해도 분석 결과는 보여주기 위해 에러를 던지지는 않음 (상황에 따라 다름)
    }

    // 4. 클라이언트에 결과 반환
    res.json({
      success: true,
      result: {
        sentiment: analysisResult.sentiment,
        confidence: analysisResult.confidence,
        reason: analysisResult.reason // 클라이언트에는 평문으로 전달
      }
    });

  } catch (error) {
    console.error('Analysis Error:', error);
    res.status(500).json({ success: false, message: '분석 중 오류가 발생했습니다.' });
  }
});

module.exports = router;
