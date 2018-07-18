<template>
  <!--<div class="modal fade modal-confirm" id="rs-confirm-modala" tabindex="-1" role="dialog" aria-hidden="true">-->
    <!--<form class="form" name="confirm-form">-->
      <!--<div class="modal-dialog modal-full-dialog" style="width:400px!important;margin-top: 60px">-->
        <!--<div class="modal-content">-->
          <!--<a href="" data-dismiss="modal" aria-label="Close" class="func-close cancel">-->
            <!--<i></i>-->
          <!--</a>-->
          <!--<div class="modal-body">-->
            <!--<div class="la-popup-container"><h2 class="tit">Title</h2>-->
              <!--<div style="width: 100%;margin-bottom: 20px; font-size: 1.1em"><span class="msg">Message...</span></div>-->
              <!--<button type="submit" class="yes btn btn-default btn-text fr" data-dismiss="modal">Yes</button>-->
              <!--<a href="" class="no btn btn-cancel btn-text fr" data-dismiss="modal" aria-label="Close"-->
                 <!--style="margin-right: 10px">No</a>-->
              <!--<div class="clr"></div>-->
            <!--</div>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    <!--</form>-->
  <!--</div>-->

  <div class="modal fade" id="rs-confirm-modal">
    <form class="modal-dialog">
      <div class="modal-container modal--s">
        <div class="modal-body">
          <div class="modal-title"><span class="tit">Title</span><a class="func-close" title="Đóng lại"
                                                                    data-dismiss="modal"><i></i></a></div>
          <div class="modal-content form">
            <a href="" data-dismiss="modal" aria-label="Close" class="func-close cancel">
              <i></i>
            </a>
            <div class="modal-body">
              <div style="width: 100%;margin-bottom: 20px; font-size: 1.1em"><span class="msg">Message...</span></div>
              <div class="clr"></div>
            </div>
          </div>
          <div class="modal-bottom">
            <a class="no btn btn-link btn-cancel btn--m" data-dismiss="modal">No</a>
            <a class="yes btn btn-primary btn--m" data-dismiss="modal">Yes</a>
          </div>
        </div>
      </div>
    </form>
  </div>

</template>

<script>
  export default {
    name: 'rs-confirm-modal',
    data() {
      return {}
    }
  }
</script>
