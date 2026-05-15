# Frontend Specification

## 주요 기능
- textarea 입력
- 분석 버튼
- fetch API 호출
- 결과 모달 출력

## 페이지 구조

```html
<section class="hero">
  <textarea></textarea>
  <button>ANALYZE SENTIMENT</button>
</section>
```

## 상태 관리
- loading
- success
- error

## 이벤트 흐름
1. 입력
2. 버튼 클릭
3. API 요청
4. 결과 표시

## 파일 구조

```txt
frontend/
├── index.html
├── style.css
└── app.js
```

## DONE 조건
- 입력 가능
- API 요청 성공
- 모달 출력
