$(document).ready(function(){
	/**********************************************/
	// Screen
	/**********************************************/
	$.belowthefold = function(element, settings) {
		var fold = $(window).height() + $(window).scrollTop();
		return fold <= $(element).offset().top - settings.threshold;
	};
	$.abovethetop = function(element, settings) {
		var top = $(window).scrollTop();
		return top >= $(element).offset().top + $(element).height() - settings.threshold;
	};
	$.rightofscreen = function(element, settings) {
		var fold = $(window).width() + $(window).scrollLeft();
		return fold <= $(element).offset().left - settings.threshold;
	};
	$.leftofscreen = function(element, settings) {
		var left = $(window).scrollLeft();
		return left >= $(element).offset().left + $(element).width() - settings.threshold;
	};
	$.inviewport = function(element, settings) {
		return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	};
	$.extend($.expr[':'], {
		"below-the-fold": function(a, i, m) {
			return $.belowthefold(a, {threshold : 0});
		},"above-the-top": function(a, i, m) {
			return $.abovethetop(a, {threshold : 0});
		},"left-of-screen": function(a, i, m) {
			return $.leftofscreen(a, {threshold : 0});
		},"right-of-screen": function(a, i, m) {
			return $.rightofscreen(a, {threshold : 0});
		},"in-viewport": function(a, i, m) {
			return $.inviewport(a, {threshold : -250});
		}
	});


	/**********************************************/
	// Common
	/**********************************************/
	var agt = navigator.userAgent,
		isMobile = (/(Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|windows phone)/.test(agt));

	function nl2br(str, is_xhtml){
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
		return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1'+ breakTag +'$2');
	}
	function pop_open(id){
		$("#"+id).addClass('show'),
		$("#mask").addClass('show').attr("data-open", id);
	}
	function pop_close(id){
		$("#"+id).removeClass('show'),
		$("#mask").removeClass('show').attr("data-open", "");
	}
	$("#mask").click(function(e){
		e.preventDefault();
		var id = $(this).attr('data-open');
		if(id == 'mMenu'){
			$("body").removeClass("o-hd"),
			$("#header").removeClass("mOpen");
			pop_close(id);
		}else if(id){
			pop_close(id);
		}
		return;
	});


	/**********************************************/
	// Scroll & Load
	/**********************************************/
	$(window).scroll(function(){
		var t = $(this).scrollTop();
		floating(t); // 플로팅 기능
		bottomTopAr(t); // 상단으로 버튼 기능
		setTimeout(function(){
			start_animate(); // 애니메이션 기능
		}, 100);
	});
	$(window).load(function(){
		var is_home = ($('body').hasClass('home')) ? true : false;
		setTimeout(function(){
			if(is_home){
				$("#loading").addClass("loader_hide");
			}
		}, 700);
		var t = $(this).scrollTop();
		floating(t);
		setTimeout(function(){
			start_animate();
		}, 130);
	});

	function bottomTopAr(t){
		(t > 550) ? $('#btn_top').addClass('show') : $('#btn_top').removeClass('show');
	}
	function floating(t){
		(t > 50) ? $("#header").addClass("floating") : $("#header").removeClass("floating");
		return;
	}
	function start_animate(){
		if(isMobile) return false;
		var j = 0;
		$(".animate-element:in-viewport").each(function(){
			var $this = $(this);
			if (!$this.hasClass("start-animate") && !$this.hasClass("animated")) {
				$this.addClass("start-animate");
				setTimeout(function(){
					$this.addClass("animated");
				}, 250 * j);
				j++;
			};
		});
	}

	$("#btn_top").click(function(event){
		event.preventDefault();
		$('html,body').animate({scrollTop : 0},800);
	});
	$("#btn_scroll").click(function(event){
		event.preventDefault();
		var pos = $('#main_company').offset();
		var header_h = $("#header").height();
		$('html,body').animate({ scrollTop : pos.top-header_h}, 600);
	});

	/**********************************************/
	// 메인 메뉴
	/**********************************************/
	$("#Main-nav > li").hover(function(){
		$(this).addClass('hover');
	},function(){
		$(this).removeClass('hover');
	});

	$("#main_navigation, #fullMenu").hover(function(){
		$("#fullMenu").addClass('show');
	},function(){
		$("#fullMenu").removeClass('show');
	});
	/**********************************************/
	// 모바일 메뉴
	/**********************************************/
	$("#m_nav").click(function(e){
		e.preventDefault();
		if($("#header").hasClass('mOpen')){
			m_menu_close();
		}else{
			m_menu_open();
		}
	}),
	/*$(window).resize(function(){
		if($("#header").hasClass('mOpen')){
			m_menu_close();
		}
	}),*/
	$("#mMenu_close").click(function(e){
		e.preventDefault(),
		m_menu_close();
	}),
	$("#mMenu .child_button").click(function(e){
		e.preventDefault();
		var $depth1 = $(this).parent(),
			$child = $(this).next('.sub-nav');
		if($child.is(":animated")){
			return;
		}
		if($depth1.hasClass('open')){
			$(this).removeClass('open'),
			$depth1.removeClass('open'),
			$child.slideUp(350);
		}else{
			var idx = $depth1.index();
			$("#mMenu .navi > li:not(:eq("+idx+"))").children('.sub-nav').slideUp(350);
			$("#mMenu .navi > li.open").removeClass('open'),
			$(this).addClass('open'),
			$depth1.addClass('open'),
			$child.slideDown(350);
		}
	});
	$("#Mobile-nav > li").each(function(){
		if($(this).hasClass('act') && $(this).hasClass('has_child')){
		 	$(this).addClass('open');
			$(this).children('.sub-nav').show();
		}
	});

	function m_menu_open(){
		$("body").addClass("o-hd"),
		$("#header").addClass("mOpen"),
		pop_open("mMenu");
	}
	function m_menu_close(){
		$("body").removeClass("o-hd"),
		$("#header").removeClass("mOpen"),
		pop_close("mMenu");
	}


	/**********************************************/
	// 랭귀지 스위쳐
	/**********************************************/
	$("#language_switcher > a").on("click", function(e){
		e.preventDefault();
		$(this).parent().toggleClass('open');
	});


	/**********************************************/
	// 약관 팝업
	/**********************************************/
	// pop open
	$("a.nxTerm_pop").click(function(e){
		e.preventDefault();
		var idx = $(this).data('idx');
		$.ajax({
			type : 'post',
			url  : base_url + 'common/term',
			data : {idx : idx},
			dataType : 'json',
			success : function(data){
				$("#nxTerm_txt").text(data.name);
				$("#nxTermCon").text("");
				$("#nxTermCon").append(nl2br(data.contents));
				pop_open("pop_term");
			}
		});
	}),
	// close
	$(".nxPopClose").click(function(e){
		e.preventDefault();
		var id = $(this).data('id');
		pop_close(id);
	})


	/**********************************************/
	// FAQ
	/**********************************************/
	$(".nxFaq.toggle_type > li > a").click(function(e){
		e.preventDefault();
		var faq = $(this).parents('.nxFaq').attr('id'),
			$li = $(this).parent(),
			thisIdx = $li.index();
		if($(".nxFaq .answer").is(":animated")){
			return false;
		}
		if($li.hasClass('open')){
			$li.removeClass('open');
			$li.children('.answer').slideUp(300);
		}else{
			var openIdx = $("#"+faq).children("li.open").index();
			if(openIdx >= 0){
				$("#"+faq).children("li.open").children('.answer').slideUp(300);
				$("#"+faq).children("li.open").removeClass('open');
			}
			$li.addClass('open');
			$li.children('.answer').slideDown(300);
		}
	});
	$(".nxFaqTab > li > a").click(function(e){
		e.preventDefault();
		var target = $(this).parent().parent().data('target'),
			idx = $(this).data('idx');
		if(idx == 'all'){
			$("#"+target+" > li").removeClass('hide');
		}else{
			$("#"+target+" > li").addClass('hide');
			$("#"+target+" > li.nxFaqCate_"+idx).removeClass('hide');
		}
		$(".nxFaqTab > li > a.act").removeClass('act');
		$(this).addClass('act');

		$("#"+target+" > li.open").removeClass('open').children('.answer').hide();
		return;
	});
	$(".nxFaq.open_type > li > a").click(function(e){
		e.preventDefault();
	});


	/**********************************************/
	// History
	/**********************************************/
	$(".nxHistoryTab > li > a").click(function(e){
		e.preventDefault();
		var target = $(this).parent().parent().data('target'),
			idx = $(this).data('idx');
		if(idx == 'all'){
			$("#"+target+" > li").removeClass('hide');
		}else{
			$("#"+target+" > li").addClass('hide');
			$("#"+target+" > li.nxHisCate_"+idx).removeClass('hide');
		}
		$(".nxHistoryTab > li > a.act").removeClass('act');
		$(this).addClass('act');

		$("#"+target+" > li.open").removeClass('open').children('.answer').hide();
		return;
	});

	/**********************************************/
	// 서브 - BreadCrumb Nav
	/**********************************************/
	$("#breadcrumb_nav > li > a").click(function(e){
		if($(this).parent().hasClass('firstHome')){
			return true;
		}else{
			e.preventDefault();
			$(this).parent().toggleClass('open');
		}
	});


	/**********************************************/
	// Scroll Link
	/**********************************************/
	$(window).load(function(){
		var str = $(location).attr('href'),
		n = str.indexOf("#!");
		scroll(str, n);
	});
	$(".scroll > a").click(function(){
		var str = $(this).attr('href');
		n = str.indexOf("#!");
		scroll(str, n);
	});
	function scroll(str, n){
		if(n > 0){ // 스크롤 이벤트
			var section = str.substring(n+2, str.length);
			if($("#"+section).length > 0){
				var header = $("#header").height();
					header = (header > 100) ? 85 : header;
				var scrollPosition = $("#"+section).offset().top - header;
				$("html, body").animate({scrollTop: scrollPosition}, 1200);
			}
		}
	}
	/**********************************************/
	// scroll_tab
	/**********************************************/
	$(".scroll_tab > li > a").click(function(e){
		if($(this).hasClass('direct_link')){
			return;
		}
		e.preventDefault();
		var target = $(this).attr('data-target'),
			header = $("#header").height();
		header = (header > 100) ? 85 : header;
		var scrollPosition = $("#"+target).offset().top - header + parseInt($("#"+target).css('padding-top'));
		$("html, body").animate({scrollTop: scrollPosition}, 1200);
	});

	/**********************************************/
	// Document Click
	/**********************************************/
	$(document).mouseup(function(e){
		if($(".language_switcher").has(e.target).length === 0){
			$(".language_switcher").removeClass('open');
		}
		if($("#breadcrumb_nav > li.depth1").has(e.target).length === 0){
			$("#breadcrumb_nav > li.depth1").removeClass('open');
		}
		if($("#breadcrumb_nav > li.depth2").has(e.target).length === 0){
			$("#breadcrumb_nav > li.depth2").removeClass('open');
		}
		if($("#breadcrumb_nav > li.depth3").has(e.target).length === 0){
			$("#breadcrumb_nav > li.depth3").removeClass('open');
		}
	});

	/**********************************************/
	// custom
	/**********************************************/
	var $slide_pro = $('#main_visual');
	$slide_pro.slick({
		dots: false,
		arrows: false,
		infinite: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 5000
	});
	$("#vis_arrowWrap").on('click', '.prev', function(){
		$slide_pro.slick('slickPrev');
	}),
	$("#vis_arrowWrap").on('click', '.next', function(){
		$slide_pro.slick('slickNext');
	});
	$(".family_wrap").hover(function(){
		$(this).children('.f_list').stop().fadeIn();
	},function(){
		$(this).children('.f_list').stop().fadeOut();
	});
	$(".family_wrap > a").click(function(event){
		event.preventDefault();
	});

	// zoom
	$(".zoom").on('click', function(){
		let src = $(this).attr('data-src');
		if($(".zoom_wrap").length == 0){
			let tag = '<div class="zoom_wrap"><div class="wrapper"><img src="'+src+'" alt=""/></div></div>';
			$("body").append(tag);
		}
	}),
	$("body").on('click','.zoom_wrap', function(){
		$(".zoom_wrap").remove();
	});
	$("#famSite").change(function(){
		var url = $(this).val();
		if(url){
			window.open(url);
		}
	});
	
	$("#btn-eportal").click(function(e){
		window.open("/e-portal.html", "eportal", "toolbar=no,top:100,left:500,width=700,height=530");
	});
});
