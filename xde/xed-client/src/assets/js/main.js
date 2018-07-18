// Slidebars

var slidebars = function () {
  var t = $("[canvas]"), e = {}, i = !1, n = !1, s = ["top", "right", "bottom", "left"],
    r = ["reveal", "push", "overlay", "shift"], o = function (i) {
      var n = $(), s = "0px, 0px", r = 1e3 * parseFloat(e[i].element.css("transitionDuration"), 10);
      return ("reveal" === e[i].style || "push" === e[i].style || "shift" === e[i].style) && (n = n.add(t)), ("push" === e[i].style || "overlay" === e[i].style || "shift" === e[i].style) && (n = n.add(e[i].element)), e[i].active && ("top" === e[i].side ? s = "0px, " + e[i].element.css("height") : "right" === e[i].side ? s = "-" + e[i].element.css("width") + ", 0px" : "bottom" === e[i].side ? s = "0px, -" + e[i].element.css("height") : "left" === e[i].side && (s = e[i].element.css("width") + ", 0px")), {
        elements: n,
        amount: s,
        duration: r
      }
    }, c = function (t, i, n, s) {
      return a(t) ? !1 : void(e[t] = {id: t, side: i, style: n, element: s, active: !1})
    }, a = function (t) {
      return e.hasOwnProperty(t) ? !0 : !1
    };
  this.init = function (t) {
    return i ? !1 : (n || ($("[off-canvas]").each(function () {
      var t = $(this).attr("off-canvas").split(" ", 3);
      return t && t[0] && -1 !== s.indexOf(t[1]) && -1 !== r.indexOf(t[2]) ? void c(t[0], t[1], t[2], $(this)) : !1
    }), n = !0), i = !0, this.css(), $(f).trigger("init"), void("function" == typeof t && t()))
  }, this.exit = function (t) {
    if (!i) return !1;
    var e = function () {
      i = !1, $(f).trigger("exit"), "function" == typeof t && t()
    };
    this.getActiveSlidebar() ? this.close(e) : e()
  }, this.css = function (t) {
    if (!i) return !1;
    for (var n in e) if (a(n)) {
      var s;
      s = "top" === e[n].side || "bottom" === e[n].side ? e[n].element.css("height") : e[n].element.css("width"), ("push" === e[n].style || "overlay" === e[n].style || "shift" === e[n].style) && e[n].element.css("margin-" + e[n].side, "-" + s)
    }
    this.getActiveSlidebar() && this.open(this.getActiveSlidebar()), $(f).trigger("css"), "function" == typeof t && t()
  }, this.open = function (t, n) {
    if (!i) return !1;
    if (!t || !a(t)) return !1;
    var s = function () {
      e[t].active = !0, e[t].element.css("display", "block"), $(f).trigger("opening", [e[t].id]);
      var i = o(t);
      i.elements.css({
        "transition-duration": i.duration + "ms",
        transform: "translate(" + i.amount + ")"
      }), setTimeout(function () {
        $(f).trigger("opened", [e[t].id]), "function" == typeof n && n()
      }, i.duration)
    };
    this.getActiveSlidebar() && this.getActiveSlidebar() !== t ? this.close(s) : s()
  }, this.close = function (t, n) {
    if ("function" == typeof t && (n = t, t = null), !i) return !1;
    if (t && !a(t)) return !1;
    if (t || (t = this.getActiveSlidebar()), t && e[t].active) {
      e[t].active = !1, $(f).trigger("closing", [e[t].id]);
      var s = o(t);
      s.elements.css("transform", ""), setTimeout(function () {
        s.elements.css("transition-duration", ""), e[t].element.css("display", ""), $(f).trigger("closed", [e[t].id]), "function" == typeof n && n()
      }, s.duration)
    }
  }, this.toggle = function (t, n) {
    return i && t && a(t) ? void(e[t].active ? this.close(t, function () {
      "function" == typeof n && n()
    }) : this.open(t, function () {
      "function" == typeof n && n()
    })) : !1
  }, this.isActive = function () {
    return i
  }, this.isActiveSlidebar = function (t) {
    return i && t && a(t) ? e[t].active : !1
  }, this.getActiveSlidebar = function () {
    if (!i) return !1;
    var t = !1;
    for (var n in e) if (a(n) && e[n].active) {
      t = e[n].id;
      break
    }
    return t
  }, this.getSlidebars = function () {
    if (!i) return !1;
    var t = [];
    for (var n in e) a(n) && t.push(e[n].id);
    return t
  }, this.getSlidebar = function (t) {
    return i && t && t && a(t) ? e[t] : !1
  }, this.events = {};
  var f = this.events;
  $(window).on("resize", this.css.bind(this))
};

// Transition
+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition: 'webkitTransitionEnd',
      MozTransition: 'transitionend',
      OTransition: 'oTransitionEnd otransitionend',
      transition: 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return {end: transEndEventNames[name]}
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () {
      called = true
    })
    var callback = function () {
      if (!called) $($el).trigger($.support.transition.end)
    }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

// Collapse
+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element = $(element)
    this.options = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
      '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)
    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data = $target.data('bs.collapse')
    var option = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

// Dropdown
+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this = $(this)
      var $parent = getParent($this)
      var relatedTarget = {relatedTarget: this}

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = {relatedTarget: this}
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0) index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index) index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
      e.stopPropagation()
    })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

//Modal
+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options = options
    this.$body = $(document.body)
    this.$element = $(element)
    this.$dialog = this.$element.find('.modal-dialog')
    this.$backdrop = null
    this.isShown = null
    this.originalBodyPad = null
    this.scrollbarWidth = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e = $.Event('show.bs.modal', {relatedTarget: _relatedTarget})

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', {relatedTarget: _relatedTarget})

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      // this.$backdrop = $(document.createElement('div'))
      //   .appendTo(this.$body)
      //   .addClass('modal-backdrop ' + animate)

      this.$backdrop = $(document.createElement('div')).addClass('modal-backdrop ' + animate);
      $("#app").append(this.$backdrop);

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this = $(this)
      var data = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this = $(this)
    var href = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option = $target.data('bs.modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

// Modal Center
(function ($) {
  "use strict";

  function centerModal() {
    $(this).css('display', 'block');
    var $dialog = $(this).find(".modal-dialog"),
      offset = ($(window).height() - $dialog.height()) / 2,
      bottomMargin = parseInt($dialog.css('marginBottom'), 10);

    if (offset < bottomMargin) offset = bottomMargin;
    $dialog.css("margin-top", offset);
  }

  $(document).on('show.bs.modal', '.modal', centerModal);
  $(window).on("resize", function () {
    $('.modal:visible').each(centerModal);
  });
}(jQuery));

// Sidebar DOM
(function ($) {
  // Create a new instance of Slidebars
  var controller = new slidebars();

  // Initialize Slidebars
  controller.init();

  // Left Slidebar controls
  $('.js-toggle-left-slidebar').on('click', function (event) {
    $('.three-bars-icon').addClass('close');
    event.stopPropagation();
    controller.toggle('slidebar-1');
  });

  // Close any
  $(controller.events).on('opened', function () {
    $('[canvas="container"]').addClass('js-close-any-slidebar');
  });

  $(controller.events).on('closed', function () {
    $('.three-bars-icon').removeClass('close');
    $('[canvas="container"]').removeClass('js-close-any-slidebar');
  });

  $('body').on('click', '.js-close-any-slidebar', function (event) {
    event.stopPropagation();
    controller.close();
  });

})(jQuery);

+function (a) {
  "use strict";
  var b = function (a, b) {
    this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", a, b)
  };
  b.DEFAULTS = {
    animation: !0,
    placement: "top",
    selector: !1,
    template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: "hover focus",
    title: "",
    delay: 0,
    html: !1,
    container: !1
  }, b.prototype.init = function (b, c, d) {
    this.enabled = !0, this.type = b, this.$element = a(c), this.options = this.getOptions(d);
    var e = this.options.trigger.split(" ");
    for (var f = e.length; f--;) {
      var g = e[f];
      if (g == "click") this.$element.on("click." + this.type, this.options.selector, a.proxy(this.toggle, this));
      else if (g != "manual") {
        var h = g == "hover" ? "mouseenter" : "focusin",
          i = g == "hover" ? "mouseleave" : "focusout";
        this.$element.on(h + "." + this.type, this.options.selector, a.proxy(this.enter, this)), this.$element.on(i + "." + this.type, this.options.selector, a.proxy(this.leave, this))
      }
    }
    this.options.selector ? this._options = a.extend({}, this.options, {
      trigger: "manual",
      selector: ""
    }) : this.fixTitle()
  }, b.prototype.getDefaults = function () {
    return b.DEFAULTS
  }, b.prototype.getOptions = function (b) {
    return b = a.extend({}, this.getDefaults(), this.$element.data(), b), b.delay && typeof b.delay == "number" && (b.delay = {
      show: b.delay,
      hide: b.delay
    }), b
  }, b.prototype.getDelegateOptions = function () {
    var b = {},
      c = this.getDefaults();
    return this._options && a.each(this._options, function (a, d) {
      c[a] != d && (b[a] = d)
    }), b
  }, b.prototype.enter = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    clearTimeout(c.timeout), c.hoverState = "in";
    if (!c.options.delay || !c.options.delay.show) return c.show();
    c.timeout = setTimeout(function () {
      c.hoverState == "in" && c.show()
    }, c.options.delay.show)
  }, b.prototype.leave = function (b) {
    var c = b instanceof this.constructor ? b : a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
    clearTimeout(c.timeout), c.hoverState = "out";
    if (!c.options.delay || !c.options.delay.hide) return c.hide();
    c.timeout = setTimeout(function () {
      c.hoverState == "out" && c.hide()
    }, c.options.delay.hide)
  }, b.prototype.show = function () {
    var b = a.Event("show.bs." + this.type);
    if (this.hasContent() && this.enabled) {
      this.$element.trigger(b);
      if (b.isDefaultPrevented()) return;
      var c = this,
        d = this.tip();
      this.setContent(), this.options.animation && d.addClass("fade");
      var e = typeof this.options.placement == "function" ? this.options.placement.call(this, d[0], this.$element[0]) : this.options.placement,
        f = /\s?auto?\s?/i,
        g = f.test(e);
      g && (e = e.replace(f, "") || "top"), d.detach().css({
        top: 0,
        left: 0,
        display: "block"
      }).addClass(e), this.options.container ? d.appendTo(this.options.container) : d.insertAfter(this.$element);
      var h = this.getPosition(),
        i = d[0].offsetWidth,
        j = d[0].offsetHeight;
      if (g) {
        var k = this.$element.parent(),
          l = e,
          m = document.documentElement.scrollTop || document.body.scrollTop,
          n = this.options.container == "body" ? window.innerWidth : k.outerWidth(),
          o = this.options.container == "body" ? window.innerHeight : k.outerHeight(),
          p = this.options.container == "body" ? 0 : k.offset().left;
        e = e == "bottom" && h.top + h.height + j - m > o ? "top" : e == "top" && h.top - m - j < 0 ? "bottom" : e == "right" && h.right + i > n ? "left" : e == "left" && h.left - i < p ? "right" : e, d.removeClass(l).addClass(e)
      }
      var q = this.getCalculatedOffset(e, h, i, j);
      this.applyPlacement(q, e), this.hoverState = null;
      var r = function () {
        c.$element.trigger("shown.bs." + c.type)
      };
      a.support.transition && this.$tip.hasClass("fade") ? d.one(a.support.transition.end, r).emulateTransitionEnd(150) : r()
    }
  }, b.prototype.applyPlacement = function (b, c) {
    var d, e = this.tip(),
      f = e[0].offsetWidth,
      g = e[0].offsetHeight,
      h = parseInt(e.css("margin-top"), 10),
      i = parseInt(e.css("margin-left"), 10);
    isNaN(h) && (h = 0), isNaN(i) && (i = 0), b.top = b.top + h, b.left = b.left + i, a.offset.setOffset(e[0], a.extend({
      using: function (a) {
        e.css({
          top: Math.round(a.top),
          left: Math.round(a.left)
        })
      }
    }, b), 0), e.addClass("in");
    var j = e[0].offsetWidth,
      k = e[0].offsetHeight;
    c == "top" && k != g && (d = !0, b.top = b.top + g - k);
    if (/bottom|top/.test(c)) {
      var l = 0;
      b.left < 0 && (l = b.left * -2, b.left = 0, e.offset(b), j = e[0].offsetWidth, k = e[0].offsetHeight), this.replaceArrow(l - f + j, j, "left")
    } else this.replaceArrow(k - g, k, "top");
    d && e.offset(b)
  }, b.prototype.replaceArrow = function (a, b, c) {
    this.arrow().css(c, a ? 50 * (1 - a / b) + "%" : "")
  }, b.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle();
    a.find(".tooltip-inner")[this.options.html ? "html" : "text"](b), a.removeClass("fade in top bottom left right")
  }, b.prototype.hide = function () {
    function e() {
      b.hoverState != "in" && c.detach(), b.$element.trigger("hidden.bs." + b.type)
    }

    var b = this,
      c = this.tip(),
      d = a.Event("hide.bs." + this.type);
    this.$element.trigger(d);
    if (d.isDefaultPrevented()) return;
    return c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? c.one(a.support.transition.end, e).emulateTransitionEnd(150) : e(), this.hoverState = null, this
  }, b.prototype.fixTitle = function () {
    var a = this.$element;
    (a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").attr("title", "")
  }, b.prototype.hasContent = function () {
    return this.getTitle()
  }, b.prototype.getPosition = function () {
    var b = this.$element[0];
    return a.extend({}, typeof b.getBoundingClientRect == "function" ? b.getBoundingClientRect() : {
      width: b.offsetWidth,
      height: b.offsetHeight
    }, this.$element.offset())
  }, b.prototype.getCalculatedOffset = function (a, b, c, d) {
    return a == "bottom" ? {
      top: b.top + b.height,
      left: b.left + b.width / 2 - c / 2
    } : a == "top" ? {
      top: b.top - d,
      left: b.left + b.width / 2 - c / 2
    } : a == "left" ? {
      top: b.top + b.height / 2 - d / 2,
      left: b.left - c
    } : {
      top: b.top + b.height / 2 - d / 2,
      left: b.left + b.width
    }
  }, b.prototype.getTitle = function () {
    var a, b = this.$element,
      c = this.options;
    return a = b.attr("data-original-title") || (typeof c.title == "function" ? c.title.call(b[0]) : c.title), a
  }, b.prototype.tip = function () {
    return this.$tip = this.$tip || a(this.options.template)
  }, b.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
  }, b.prototype.validate = function () {
    this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
  }, b.prototype.enable = function () {
    this.enabled = !0
  }, b.prototype.disable = function () {
    this.enabled = !1
  }, b.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }, b.prototype.toggle = function (b) {
    var c = b ? a(b.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
    c.tip().hasClass("in") ? c.leave(c) : c.enter(c)
  }, b.prototype.destroy = function () {
    clearTimeout(this.timeout), this.hide().$element.off("." + this.type).removeData("bs." + this.type)
  };
  var c = a.fn.tooltip;
  a.fn.tooltip = function (c) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.tooltip"),
        f = typeof c == "object" && c;
      if (!e && c == "destroy") return;
      e || d.data("bs.tooltip", e = new b(this, f)), typeof c == "string" && e[c]()
    })
  }, a.fn.tooltip.Constructor = b, a.fn.tooltip.noConflict = function () {
    return a.fn.tooltip = c, this
  }
}(jQuery), +function (a) {
  "use strict";
  var b = function (a, b) {
    this.init("popover", a, b)
  };
  if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
  b.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, {
    placement: "right",
    trigger: "click",
    content: "",
    template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content" style="max-height: 100px; overflow: auto"></div></div>'
  }), b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype), b.prototype.constructor = b, b.prototype.getDefaults = function () {
    return b.DEFAULTS
  }, b.prototype.setContent = function () {
    var a = this.tip(),
      b = this.getTitle(),
      c = this.getContent();
    a.find(".popover-title")[this.options.html ? "html" : "text"](b), a.find(".popover-content")[this.options.html ? typeof c == "string" ? "html" : "append" : "text"](c), a.removeClass("fade top bottom left right in"), a.find(".popover-title").html() || a.find(".popover-title").hide()
  }, b.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }, b.prototype.getContent = function () {
    var a = this.$element,
      b = this.options;
    return a.attr("data-content") || (typeof b.content == "function" ? b.content.call(a[0]) : b.content)
  }, b.prototype.arrow = function () {
    return this.$arrow = this.$arrow || this.tip().find(".arrow")
  }, b.prototype.tip = function () {
    return this.$tip || (this.$tip = a(this.options.template)), this.$tip
  };
  var c = a.fn.popover;
  a.fn.popover = function (c) {
    return this.each(function () {
      var d = a(this),
        e = d.data("bs.popover"),
        f = typeof c == "object" && c;
      if (!e && c == "destroy") return;
      e || d.data("bs.popover", e = new b(this, f)), typeof c == "string" && e[c]()
    })
  }, a.fn.popover.Constructor = b, a.fn.popover.noConflict = function () {
    return a.fn.popover = c, this
  }
}(jQuery);
