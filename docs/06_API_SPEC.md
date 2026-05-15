# API Specification

# POST /api/analyze

## Request

```json
{
  "text": "오늘 정말 행복했어"
}
```

## Response

```json
{
  "success": true,
  "result": {
    "sentiment": "긍정",
    "confidence": 92,
    "reason": "긍정적인 표현이 포함되어 있습니다."
  }
}
```

## Error

```json
{
  "success": false,
  "message": "API Error"
}
```

## DONE 조건
- 정상 응답
- 에러 처리
