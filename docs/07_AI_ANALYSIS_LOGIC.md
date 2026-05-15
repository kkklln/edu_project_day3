# AI Analysis Logic

## 목적
OpenAI API 기반 감성 분석

## Prompt

```txt
사용자 텍스트의 감정을 분석해줘.

JSON 형식으로 반환해.

{
  "sentiment": "긍정 | 부정 | 중립",
  "confidence": 0~100,
  "reason": "2~3문장 설명"
}
```

## 설정
- temperature: 0.3
- max_tokens: 300

## 예외 처리
- JSON Parsing 실패
- API Timeout
- Empty Response

## DONE 조건
- JSON 응답 성공
- 감성 분석 정확도 확보
