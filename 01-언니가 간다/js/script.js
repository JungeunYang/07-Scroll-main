$(function () {
  // 대상을 변수에 저장
  const $window = $(window);
  const $document = $(document);
  const $girl = $('.girl');
  const $puppy = $('.puppy');

  // 전역 변수로 선언
  let windowHeight = 0;
  let documentHeight = 0;
  let scrollHeight = 0;

  // 스크롤 영역을 구하는 함수
  function getHeight() {
    windowHeight = $window.outerHeight();
    documentHeight = $document.outerHeight();
    scrollHeight = documentHeight - windowHeight;
  }

  // 시작하자마자, 스크롤 영역 구하기
  getHeight();

  // 시작하자마자, 안 보이게
  // $girl.hide();
  // $puppy.hide();
  $girl.add($puppy).hide();

  // 브라우저 창이 조절될 때
  $window.on('resize', function () {
    getHeight();
    console.log(scrollHeight);

    // 스크롤 이벤트를 강제로 발생시킴 --> 최종 언니 위치 수정
    $window.trigger('scroll');
  });

  // 스크롤이 발생하면
  $window.on('scroll', function () {
    // 사용자의 (세로)스크롤 값을 구해서
    let scrollTop = $(this).scrollTop();

    // 비율을 구하자. 공식은, (대상 / 기준) * 100
    let percent = (scrollTop / scrollHeight) * 100 + '%';

    // $girl의 left로 적용(%)
    $girl.css('left', percent);
    $puppy.css('left', percent);

    // if (scrollTop === 0) {
    //   // 스크롤 값이 0이라면 --> 스크롤이 가장 위에 있을 때
    //   $girl.add($puppy).fadeOut();
    // } else {
    //   $girl.add($puppy).fadeIn();
    // }

    // 문제 : 위 if문을 삼항 조건 연산자로 바꿔서 표현해 주세요.
    // 조건 ? 참-코드 : 거짓-코드
    scrollTop === 0 ? $girl.add($puppy).fadeOut() : $girl.add($puppy).fadeIn();
  });

  // 마우스 휠 조작했을 때
  $window.on('wheel keydown', function (e) {
    // console.log(e);

    if (e.originalEvent.deltaY < 0 || e.keyCode === 38) {
      // 휠을 올렸을 때
      $girl.css('transform', 'rotateY(180deg)');
    } else if (e.originalEvent.deltaY > 0 || e.keyCode === 40) {
      // 휠을 내렸을 때
      $girl.css('transform', 'rotateY(0)');
    }
  });
});
