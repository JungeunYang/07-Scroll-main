$(function () {
  // 이 아래 동작들이 효과적으로 작동하려면 스크롤을 없애야함-> css에서 body에 overflow:hidden;을 주면 스크롤이 없어짐
  // 대상을 변수에 저장
  const $window = $(window);
  const $sideDot = $('.indicator > li');
  const $section = $('main > section');
  let secIdx = 0;

  // 초기 설정 (첫번째 지점에서 시작)
  moveSection(secIdx);

  // 마우스 휠을 동작시켰을 때
  $window.on('wheel', function (e) {
    if ($('html').is(':animated')) return;
    /* 동작중이라면 종료 */

    if (e.originalEvent.deltaY < 0) {
      // 휠을 올렸을 때 secIdx가 0보다 작아지면 마이너스가되면 return->종료
      if (secIdx === 0) return;
      secIdx--;
      // if else 문을 이렇게 짧게쓸 수 있음
    } else {
      // 휠을 내렸을 때
      if (secIdx === 3) return;
      secIdx++;
    }

    moveSection(secIdx);
  });

  $window.on('resize', function () {
    moveSection(secIdx);
  });

  // 영역을 이동시키는 기본 동작
  function moveSection(index) {
    const posTop = index * $window.outerHeight();
    $('html, body').stop().animate(
      {
        scrollTop: posTop,
      },
      350
    );
    updateDot();
  }

  // 인디케이터를 클릭했을 때
  $sideDot.on('click', function (e) {
    e.preventDefault();
    secIdx = $(this).index();
    moveSection(secIdx);
  });

  // 인디케이터를 업데이트 시키는 함수
  function updateDot() {
    $sideDot.removeClass('on');
    $sideDot.eq(secIdx).addClass('on');
  }
});
