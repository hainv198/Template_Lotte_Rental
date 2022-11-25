$(function() {
	// Top Buuton
	$.fn.topBtn = function(){
		var $window = $(window),$target = $('.btn_goto_top');
			$target.hide();
			$window.scroll(function() {
				($window.scrollTop() > 100) ? $target.fadeIn() : $target.fadeOut();
			});
		$('.btn_goto_top').on('click', function() {
		  $('html, body').animate({scrollTop:0}, 300);
		  return false;
		});
	}
	$.fn.topBtn();
	// GNB
	$.fn.gnb = function(){
		$(document).on('click','.btn_allmenu, .gnb_close, a.gnb_overlay',function(e) {
			e.preventDefault();
			var overlay='<a class="gnb_overlay" href="#"></a>'
			$('body').toggleClass('noScroll');
			var added= $(".gnb_overlay");
			if (added.length) {
				$('a.gnb_overlay').fadeOut(300);
				setTimeout(function() { $('a.gnb_overlay').remove(); }, 400);
			} else {
				$('#wrap').append(overlay);
				$('a.gnb_overlay').fadeIn(300);
			}
		});
	}
	$.fn.gnb();
	// Sub Menu
	$.fn.subMenu = function(){
		$(document).on('click','.btn_pg_gnb',function(e) {
			e.preventDefault();
			$('.sub_gnb').slideToggle();
		});
	}
	$.fn.subMenu();
	// a11y Accordion
	$.fn.accordion = function(){
		$('.accordion .panel').hide();
		$('.accordion').attr({
			role: 'tablist',
			multiselectable: 'true'
		});
		$('.accordion .panel').attr('id', function(IDcount) { 
			return 'panel-' + IDcount; 
		});
		$('.accordion .panel').attr('aria-labelledby', function(IDcount) { 
			return 'control-panel-' + IDcount; 
		});
		$('.accordion .panel').each(function(i){
			if($(this).hasClass('open')){
				$(this).attr('aria-hidden','false').show();
			} else {
				$(this).attr('aria-hidden','true');
			}
		});
		$('.accordion .panel').attr('role','tabpanel');
		$('.accordion .title').each(function(i){
			$target = $(this).next('.panel')[0].id;
			if($(this).hasClass('open')){
				$link = $('<a>', {
				  'href':'#'+$target,
				  'aria-expanded':'true',
				  'aria-controls':$target,
				  'id':'control-'+ $target
				});
				$link.addClass('active');
			} else {
				$link = $('<a>', {
				  'href':'#'+$target,
				  'aria-expanded':'false',
				  'aria-controls':$target,
				  'id':'control-'+ $target
				});
			}
			$(this).wrapInner($link);
		});
		$('.accordion .title a').append('<span class="ico"></span>');
		$('.accordion .title a').click(function() {
			var $this = $(this);
			if ($this.attr('aria-expanded') == 'false'){
				if(!$this.closest('.accordion').hasClass('toggle')){
					$this.parents('.accordion').find('[aria-expanded=true]').attr('aria-expanded',false).removeClass('active').parent().next('.panel').removeClass('active').slideUp(200).attr('aria-hidden','true');
				}
			  	$this.attr('aria-expanded',true).addClass('active').parent().next('.panel').addClass('active').slideDown(200).attr('aria-hidden','false');
				setTimeout(function() {
					$('html,body').animate({'scrollTop':$this.offset().top});
				},210);
			} else {
			  	$this.attr('aria-expanded',false).removeClass('active').parent().next('.panel').removeClass('active').slideUp(200).attr('aria-hidden','true');
			}
			return false;
		});
	}
	$.fn.accordion();
	// a11y Combobox
	$.fn.combobox = function(){
		var $options,$combobox,$listbox,selectedIndex = -1;
		$(".combobox button").on('click', function() {
			$combobox = $(this);
			$listbox = $combobox.closest(".combobox").find("ul");
			$listbox.toggle();
		});
		$(".combobox ul li").on('click', function() { 
			$combobox = $(this).closest(".combobox").find("button");
			$listbox = $(this).closest(".combobox").find("ul");
			$options = $(this).closest(".combobox").find("li");
			selectedIndex = $options.index($(this));
			selectOption();
			$options.removeClass('selected');
			$(this).addClass('selected');
			var panelShow = $(this).attr('rel')
			$('.pdf_panel').hide();
			$('#'+panelShow).show();
			close();
		});
		function open() {
			$listbox.show();
		}
		function close() {
			$listbox.hide();
			$combobox.removeAttr('aria-activedescendant');
			selectedIndex = -1;
		}
		function highlightOption() {
			var $option = $($options[selectedIndex]);
			$options.removeClass('selected');
			$option.addClass('selected');
			$combobox.attr('aria-activedescendant', $option.attr('id'));
		}
		function selectOption() {
		  $combobox.html($($options[selectedIndex]).html());
		}
	};
	$.fn.combobox();
	// ui swiper visual
	$.fn.visual = function(){
		var $mVisual = $('.main_visual'),
			$body = $('body')
		if($mVisual.length > 0){
			$body.addClass('stopScroll');
		}
		function getHeight() {
			setTimeout(function() {
				var vHeight = $('.main_visual .visual>img').height();
				$mVisual.css('height', vHeight);
			},100);
		}
		$(window).bind('resize', function() {
			getHeight();
		}).trigger('resize');
		var touchFlag = 0;
		var myTime, myInterval;
		var itemAni = function() {
			$("#visualItem > div:gt(0)").hide();
			myTime = setTimeout(function() {
				myInterval = setInterval(function() {
				  $('#visualItem > div:first')
					.fadeOut(500)
					.next()
					.fadeIn(500)
					.end()
					.appendTo('#visualItem');
				}, 1000);
			}, 1000);
		};
		var destroy = function() {
			clearTimeout(myTime);
			clearInterval(myInterval);
		};	
		$mVisual.on('touchstart', function(e) {
			var swipe = e.originalEvent.touches,
			start = swipe[0].pageY;
			$(this).on('touchmove', function(e) {
				var contact = e.originalEvent.touches,
				end = contact[0].pageY,
				distance = end-start;
				if (touchFlag == 0 && distance < 0){
					touchFlag = 1;
					$mVisual.removeClass('down').addClass('up');
					itemAni();
					setTimeout(function() {
						$body.removeClass('stopScroll');
					},1000);
				} else if (distance > 0){
					destroy();
					$body.addClass('stopScroll');
					$mVisual.removeClass('up').addClass('down');
					touchFlag = 0;
				}
			})
			.one('touchend', function() {
				$(this).off('touchmove touchend');
			});
		});
	}
	$.fn.visual();
	// ui swiper our_biz
	$.fn.ourBiz = function(){
		if($('#ourBizSlide').length > 0){
			var ourBizSlide = new Swiper('#ourBizSlide', {
				pagination: {
					el: '.swiper-pagination',
			  	},
			});
		}
	}
	$.fn.ourBiz();

	/* 20190318 Mobile Main Visual ���� */
		// Main Swiper
     var mobmainImgSwiper = new Swiper('.swiper-container.mob', {
     	 loop: true,
     	 pagination: {
        el: '.swiper-pagination',
        type: 'fraction',
      },
       autoplay: {
		    delay: 3000,
		    
		  }
    });
     // Play Btn
    $(".swiper-container.mob .swiper-pagination").append("<a href='javascript:' class='play-btn'></a>");
		$(".play-btn").click(function(){
			if(!$(this).hasClass("on")){
				$(this).addClass("on");
				mobmainImgSwiper.autoplay.stop();
			}else {
				$(this).removeClass("on");
				mobmainImgSwiper.autoplay.start();
			}
		});
	
	/* // 20190318 Mobile Main Visual ���� */

	$(window).scroll(function() {
		var $el = $('.rental_history');
		if($(this).scrollTop() >= 600) {
			$el.addClass('active');
		}
	});
	// a11y Tab
	$.fn.tab = function(){
		var $tabWidget = $('.tab_section');
		$tabWidget.each(function () {
			var $this = $(this),
				$tab = $this.find('.tab_nav'),
				$tabList = $tab.find('li'),
				$tabListItems = $tab.find('li a'),
				$tabListItemActive = $tab.find('li.active a'),
				$tabListItemID = $tabListItemActive.attr("aria-controls");
				$tabPanels = $this.find('.panel');
				$tabPanelActive = $("#" + $tabListItemID);
			$tab.attr('role', 'tablist');
			$tabList.attr('role', 'presentation');
			$tabListItems.attr({
				'role':'tab',
				'aria-selected':'false'
			});
			$tabListItemActive.attr({
				'aria-selected':'true'
			});
			$tabPanels.attr({
				'role':'tabpanel',
				'aria-hidden':'true'
			});
			$tabPanelActive.attr('aria-hidden','false').addClass('active');
		});
		$("a[role='tab']").click(function() {
			$("a[role='tab']:not(this)").attr('aria-selected','false');
			$(this).attr('aria-selected','true');
			$(this).closest('.tab_nav').find('li').removeClass('active');
			$(this).closest('li').addClass('active');
			var tabpanid = $(this).attr("aria-controls");
			var tabpan = $("#" + tabpanid);
			$(this).closest('.tab_section').find("div[role='tabpanel']:not(tabpan)").attr('aria-hidden', 'true');
			$(this).closest('.tab_section').find("div[role='tabpanel']:not(tabpan)").removeClass('active');
			tabpan.addClass('active');
			tabpan.attr('aria-hidden','false');
			var target = $(this).attr('id');
			$('.history_img').hide();
			$('.history_img.'+target).show();
		});
		$("li[role='tab']").keydown(function(ev) {
			if (ev.which == 13) {
				$(this).click();
			}
		});
	};
	$.fn.tab();
	// ui swiper gnb
	$.fn.swiper = function(){
		if($('#locationTab').length > 0){
			gnbSwiper = new Swiper('#locationTab', {
				slidesPerView: 'auto',
				freeMode: true,
				initialSlide: 0
			});
			$('.pg_gnb .swiper-slide a').on('click', function(e){
				var gnbWidth = $('.pg_gnb').outerWidth();
				var offset = $(this).width()+$(this).offset().left;
				var $slideItems = $(this).parent('.swiper-slide');
				var myIndex = $(this).parent().index();
				if(gnbWidth < offset){
					gnbSwiper.slideTo(myIndex+1);
				} else {
					gnbSwiper.slideTo(myIndex-1);
				}
				$(this).closest('.pg_gnb').find('a').removeClass('active');
				$(this).addClass('active');
			});
		}
		$('ul.tab li').each(function(e){
			if($(this).find('a').hasClass('active')){
				var panelShow = $(this).attr('rel');
				$('#'+panelShow).show();
			}
		})
		$('ul.tab li').on('click', function(){
		  	var panelShow = $(this).attr('rel')
		  	
			$('.tab_panel').hide();
			$('#'+panelShow).show();
		});
	}
	setTimeout($.fn.swiper, 100);
	// a11y popup
	$.fn.modalDialog = function(){
		var $modals = this,
			$focus ='a[href], area[href], input:not([disabled]), input:not([readonly]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]',
			$body = $('body'),
			$dialog = $('.dialog'),
			$gnb = $('#gnb');
		$dialog.attr('aria-hidden','true');
		$gnb.attr('aria-hidden','true');
		$modals.on('click', function(e){
			var $this = $(this);
			var $select_id = $($(this).attr('href'));
			var $sel_id_focus = $select_id.find($focus);
			var $focus_num = $select_id.find($focus).length;
			var $closBtn = $select_id.find('.dialog_close, .dialog_ok');
			var clickAnchor = $this.attr('href');
			var hrefFocus = this;
			e.preventDefault();
			$body.addClass('no_scroll');
			$("body").bind('touchmove', function(e){e.preventDefault()});
			$body.append('<div class="dimmed" tabindex="-1"></div>');
			$(clickAnchor).siblings().find($focus).attr('tabindex','-1');
			$select_id.attr('tabindex', '0').attr({'aria-hidden':'false','aria-live':'polit'}).fadeIn(100).addClass('show').focus();
			$select_id.on('blur', function(){ $(this).removeAttr('tabindex'); });
			$($select_id).find($focus).last().on("keydown", function(e){
				if (e.which == 9) {
					if(e.shiftKey) {
						$($select_id).find($focus).eq($focus_num - 1).focus();
						e.stopPropagation();
					} else {
						$($select_id).find($focus).eq(0).focus();
						e.preventDefault();
					};
				};
			});
			$($select_id).find($focus).first().on("keydown", function(e){
				if(e.keyCode == 9) {
					if(e.shiftKey) {
						$($select_id).find($focus).eq($focus_num - 1).focus();
						e.preventDefault();
					};
				};
			});
			$($select_id).on("keydown", {msg:clickAnchor,msg2:hrefFocus}, function(e){
				if ( e.which == 27 ) {
					e.preventDefault();
					$.fn.hide_modal (e.data.msg,e.data.msg2 );
				};
				if( $(this).is(":focus") ){
					if(e.keyCode == 9) {
						if(e.shiftKey) {
							$($select_id).find($focus).eq($focus_num - 1).focus();
							e.preventDefault();
						};
					};
				};
			});
			$closBtn.on("click", {msg:clickAnchor,msg2:hrefFocus},function(e){
				e.preventDefault();
				$.fn.hide_modal (e.data.msg,e.data.msg2 );
			});		
		});
		$.fn.hide_modal = function (info, hrefFocus){
			$body.removeClass('no_scroll');
			$("body").unbind('touchmove');
			$(info).attr('aria-hidden','true').removeClass('show').fadeOut(300);
			$(info).siblings().find($focus).removeAttr('tabindex');
			$('.dimmed').remove();
			setTimeout(function() { $(hrefFocus).focus(); }, 100);
		};
	};
	$('.dialog_open').modalDialog();
	// History Back
	$('.btn_pg_prev').on('click', function(){
		history.go(-1);
                return false;
	});
	// Naver Map
	$.fn.naverMap = function(mapNum, lat, lng){
		setTimeout(function() {
			// 2019-03-13 ���� API ���� ���̹� ���� -> �÷���
			var position = new olleh.maps.LatLng(lat, lng);
			
			var mapOpts = {
				center: position
				, panControl: false
				, zoomControl: true
				, zoomControlOptions: {
					style: olleh.maps.control.ZoomControl.SMALL
					, position: olleh.maps.control.Control.TOP_RIGHT
				}
				, zoom: 10
				, mapTypeId: 'ROADMAP'
			};
			
			var map = new olleh.maps.Map(document.getElementById(mapNum), mapOpts);
			
			var marker = new olleh.maps.overlay.Marker({
				position: position
				//, animation: olleh.maps.overlay.Marker.BOUNCE
				, map: map
			});

			$("#map1").css("touch-action", "manipulation");
			$("#map2").css("touch-action", "manipulation");
			$("#map3").css("touch-action", "manipulation");
			$("#map4").css("touch-action", "manipulation");
			$("#map5").css("touch-action", "manipulation");
			$("#popMap1").css("touch-action", "manipulation");
			$("#popMap2").css("touch-action", "manipulation");
	
			map.onEvent("dragstart", function(e){
				$("html").css("overflow", "hidden");
			});
			
			map.onEvent("dragend", function(e){
				$("html").css("overflow", "visible");
			});
		},200);
	}
	$(document).ready(function() {
		if($('#map1').length > 0){
			$.fn.naverMap('map1', 37.5053210134, 127.0528618384);
			$.fn.naverMap('map2', 37.3893871988, 126.9425581996);
		}
		if($('#map3').length > 0){
			$.fn.naverMap('map3', 37.5053210134, 127.0528618384);
		}
		if($('#map4').length > 0){
			$.fn.naverMap('map4', 37.5053210134, 127.0528618384);
		}
		if($('#map5').length > 0){
			$.fn.naverMap('map5', 37.5053210134, 127.0528618384);
		}
		if($('#map6').length > 0){
			$.fn.naverMap('map6', 37.5053210134, 127.0528618384);
			$.fn.naverMap('map7', 37.5053210134, 127.0528618384);
			$.fn.naverMap('map8', 37.5053210134, 127.0528618384);
		}
		if($('#map9').length > 0){
			$.fn.naverMap('map9', 37.5053210134, 127.0528618384);
		}
		if($('#popMap1').length > 0){
			$.fn.naverMap('popMap1', 37.5053210134, 127.0528618384);
		}
		if($('#popMap2').length > 0){
			$.fn.naverMap('popMap2', 37.5053210134, 127.0528618384);
		}



		$('.our_rentalution li').on('click',function(){
			var idx = $('.our_rentalution li').index(this);
			$('.our_rentalution li').removeClass('on');
			$(this).addClass('on');
			console.log(idx)
			$('.our_rentalution .group_box .tab_cont').removeClass('on');
			$('.our_rentalution .group_box .tab_cont').eq(idx).addClass('on');

		})

	});
});
// get Url Parameter
var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;
	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
	
		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}

	}
};

    
/*20190517 pr_center*/
//thum bxslider
    $(document).ready(function(){
        $('.pr_slider').bxSlider({
          maxSlides:2,
          minSlides:2,
          moveSlides:2,
          slidesWidth:100,
          slideWidth:380,
          slideMargin:10, 
          pager: true,
					touchEnabled: true,
					infiniteLoop: false,
        });
        const rentaControlSize = $(".pr_moive_list.rt .bx-pager-item").size();
        const groupControlSize = $(".pr_moive_list.gr .bx-pager-item").size();
        $(".pr_moive_list.rt .bx-controls").css("width", rentaControlSize * 22 + 120)
        $(".pr_moive_list.gr .bx-controls").css("width", groupControlSize * 22 + 120)
      });


