document.addEventListener('DOMContentLoaded', () => {
    const analyzeBtn = document.getElementById('analyze-btn');
    const sentimentInput = document.getElementById('sentiment-input');
    const loadingOverlay = document.getElementById('loading-overlay');
    const resultModal = document.getElementById('result-modal');

    // Result elements
    const resSentiment = document.getElementById('res-sentiment');
    const resConfidenceText = document.getElementById('res-confidence-text');
    const resConfidenceBar = document.getElementById('res-confidence-bar');
    const resReason = document.getElementById('res-reason');

    // Close buttons
    const closeBtns = document.querySelectorAll('.close-btn, .close-modal-btn');

    const API_URL = 'http://localhost:3000/api/analyze';

    /**
     * 감성 분석 API 호출
     */
    async function analyzeSentiment() {
        const text = sentimentInput.value.trim();

        if (!text) {
            alert('분석할 내용을 입력해주세요.');
            return;
        }

        // 로딩 표시
        loadingOverlay.style.display = 'flex';

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            });

            const data = await response.json();

            if (data.success) {
                showResult(data.result);
            } else {
                alert(data.message || '분석 중 오류가 발생했습니다.');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            alert('서버와 통신 중 오류가 발생했습니다. 백엔드 서버가 켜져 있는지 확인하세요.');
        } finally {
            loadingOverlay.style.display = 'none';
        }
    }

    /**
     * 결과 모달 표시
     */
    function showResult(result) {
        resSentiment.textContent = result.sentiment;
        resConfidenceText.textContent = `${result.confidence}%`;
        resConfidenceBar.style.width = `${result.confidence}%`;
        resReason.textContent = result.reason;

        // 감성에 따른 색상 변화 (선택 사항)
        if (result.sentiment === '긍정') {
            resSentiment.style.color = '#0066B1'; // M Blue
            resConfidenceBar.style.backgroundColor = '#0066B1';
        } else if (result.sentiment === '부정') {
            resSentiment.style.color = '#E22718'; // M Red
            resConfidenceBar.style.backgroundColor = '#E22718';
        } else {
            resSentiment.style.color = '#FFFFFF';
            resConfidenceBar.style.backgroundColor = '#3C3C3C';
        }

        resultModal.style.display = 'block';
    }

    /**
     * 모달 닫기
     */
    function closeModal() {
        resultModal.style.display = 'none';
    }

    // Event Listeners
    analyzeBtn.addEventListener('click', analyzeSentiment);

    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });

    // 창 밖 클릭시 모달 닫기
    window.addEventListener('click', (event) => {
        if (event.target === resultModal) {
            closeModal();
        }
    });

    // Ctrl + Enter로 분석 실행
    sentimentInput.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            analyzeSentiment();
        }
    });
});
