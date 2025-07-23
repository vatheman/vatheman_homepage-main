// DOM이 로드되면 실행
document.addEventListener('DOMContentLoaded', function() {
  
  // =========================
  // 로그인 버튼 기능
  // =========================
  const loginBtn = document.querySelector('.login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      alert('로그인 기능은 준비 중입니다!');
    });
  }

  // =========================
  // 히어로 캐러셀 슬라이드 기능
  // =========================
  const slides = document.querySelectorAll('.slide');
  const leftArrow = document.querySelector('.arrow.left');
  const rightArrow = document.querySelector('.arrow.right');
  let currentSlide = 0;
  let slideInterval;

  // 슬라이드 표시 함수
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
    currentSlide = index;
  }

  // 다음 슬라이드로 이동
  function nextSlide() {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }

  // 이전 슬라이드로 이동
  function prevSlide() {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prev);
  }

  // 자동 슬라이드 시작
  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000); // 4초로 변경
  }

  // 자동 슬라이드 정지
  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // 화살표 버튼 이벤트
  if (leftArrow && rightArrow) {
    leftArrow.addEventListener('click', () => {
      prevSlide();
      stopAutoSlide();
      startAutoSlide();
    });

    rightArrow.addEventListener('click', () => {
      nextSlide();
      stopAutoSlide();
      startAutoSlide();
    });
  }

  // 마우스 오버 시 자동 슬라이드 정지
  const carousel = document.querySelector('.hero-carousel');
  if (carousel) {
    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);
  }

  // 초기화
  if (slides.length > 0) {
    showSlide(0);
    startAutoSlide();
  }

  // =========================
  // 제품 더보기 버튼 기능
  // =========================
  const moreBtns = document.querySelectorAll('.more-btn');
  
  moreBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const desc = btn.parentElement;
      const shortDesc = desc.querySelector('.desc-short');
      const fullDesc = desc.querySelector('.desc-full');
      
      if (fullDesc && shortDesc) {
        const isExpanded = fullDesc.style.display === 'block';
        
        if (isExpanded) {
          // 닫기
          fullDesc.style.display = 'none';
          shortDesc.style.display = 'block';
          btn.textContent = '더보기';
        } else {
          // 열기
          fullDesc.style.display = 'block';
          shortDesc.style.display = 'none';
          btn.textContent = '닫기';
        }
      }
    });
  });

  // =========================
  // 인사말 더보기 버튼 기능
  // =========================
  const greetingMoreBtn = document.querySelector('.greeting-more-btn');
  const greetingMore = document.querySelector('.greeting-more');
  const greetingLines = document.querySelectorAll('.greeting-line');

  if (greetingMoreBtn && greetingMore && greetingLines.length > 0) {
    // 초기 상태: 4줄까지만 표시
    greetingLines.forEach((line, index) => {
      if (index < 4) {
        line.style.display = 'block';
      } else {
        line.style.display = 'none';
      }
    });

    greetingMoreBtn.addEventListener('click', function() {
      const isExpanded = greetingMore.style.display === 'inline';
      
      if (isExpanded) {
        // 닫기
        greetingMore.style.display = 'none';
        greetingMoreBtn.textContent = '더보기';
        // 4줄까지만 표시
        greetingLines.forEach((line, index) => {
          line.style.display = index < 4 ? 'block' : 'none';
        });
      } else {
        // 열기
        greetingMore.style.display = 'inline';
        greetingMoreBtn.textContent = '닫기';
        // 모든 줄 표시
        greetingLines.forEach(line => {
          line.style.display = 'inline';
        });
      }
    });
  }

  // =========================
  // Q&A 폼 제출 기능
  // =========================
  const qaForm = document.querySelector('.qa-form');
  const qaList = document.querySelector('.qa-list');

  if (qaForm && qaList) {
    qaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const titleInput = document.getElementById('qa-question-title');
      const contentInput = document.getElementById('qa-question-content');
      
      if (titleInput && contentInput) {
        const title = titleInput.value.trim();
        const content = contentInput.value.trim();
        
        if (title && content) {
          // 새 질문 요소 생성
          const questionElement = document.createElement('div');
          questionElement.className = 'qa-item';
          questionElement.innerHTML = `
            <div class="qa-question">
              <h3>Q: ${title}</h3>
              <p>${content}</p>
              <small>작성일: ${new Date().toLocaleDateString()}</small>
            </div>
            <div class="qa-answer-pending">
              <p>답변 대기 중입니다...</p>
            </div>
          `;
          
          // 목록에 추가
          qaList.appendChild(questionElement);
          
          // 폼 초기화
          titleInput.value = '';
          contentInput.value = '';
          
          alert('질문이 등록되었습니다. 빠른 시일 내에 답변드리겠습니다.');
        }
      }
    });
  }

  // =========================
  // 부드러운 스크롤 (네비게이션 링크)
  // =========================
  const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const headerHeight = document.querySelector('.main-header').offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  var chatbotFab = document.getElementById('vatheman-chatbot-fab');
  if (chatbotFab) {
    chatbotFab.addEventListener('click', function() {
      window.open('https://chatgpt.com/g/g-688074bfa1908191ac75e4b5f493da8a-badeoman', '_blank');
    });
  }

});

// =========================
// CSS 추가 스타일 (동적으로 추가)
// =========================
const additionalStyles = `
.qa-item {
  background: #f5f5f7;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border-left: 4px solid #0071e3;
}

.qa-question h3 {
  color: #1d1d1f;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
}

.qa-question p {
  color: #86868b;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
}

.qa-question small {
  color: #86868b;
  font-size: 12px;
}

.qa-answer-pending p {
  color: #ff9500;
  font-size: 14px;
  font-style: italic;
}
`;

// 스타일 시트에 추가
const style = document.createElement('style');
style.textContent = additionalStyles;
document.head.appendChild(style); 