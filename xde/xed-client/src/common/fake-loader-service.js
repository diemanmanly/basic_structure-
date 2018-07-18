let status = false;
let MAX_WAITTING_TIME = 1000;
let spinner07 = '<div class="fll spinner7"><div class="circ1"></div><div class="circ2"></div><div class="circ3"></div><div class="circ4"></div></div>';
export const load = (timeout) => {
  if (status === true) {
    return;
  }
  status = true;
  $("html, body").animate({scrollTop: 0}, "fast");
  $('.fakeloader').attr('style', 'position: fixed; width: 100%; height: 100%; top: 0px; left: 0px; z-index: 9999; background-color: rgba(255, 255, 255, 0.8);');
  var width = 100;
  var height = 40;
  var left = $(window).width() / 2 - width / 2;
  var top = $(window).height() / 2 - height / 2;
  $(".fakeloader").html(spinner07);
  $('.fakeloader .fll').css({
    position: 'relative',
    left: left,
    top: top,
    width: width,
    height: height
  });
  if (!!timeout) {
    $timeout(function () {
      end();
    }, MAX_WAITTING_TIME);
  }
};

export const end = () => {
  var opacity = 0.8;
  var a = 0.002;
  var t = 1;
  var v = 0.005;
  var tmp = setInterval(function () {
    if (opacity <= 0) {
      clearInterval(tmp);
      $('.fakeloader').attr('style', 'display: none;');
      status = false;
    } else {
      $('.fakeloader').css({opacity: opacity});
      opacity = opacity - (v * t + 1 / 2 * a * t * t);
    }
    t++;
  }, 10);
};
export const toTopPage = () => {
  $("html, body").animate({scrollTop: 0}, "fast");
};
