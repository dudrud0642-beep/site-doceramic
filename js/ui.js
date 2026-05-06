;(function($, window, undefined){
	'use strict';
	
	if('undefined' === typeof window.UI){
		var UI = window.UI = {};
	}
	$(function(){
				
	});
	
	$(document).ready(function(){		
		
	});			
	var Layout = UI.Layout = {
		bodyEvent : function(){
			function inLoad(){
				$("html").addClass("load");
			}
			function inReady(){
				$("html").addClass("ready");
			}
			function inScroll(){
				var scrollTop = $(window).scrollTop();				
				if(scrollTop > 0){
					$("body").addClass("scroll");
				}else{
					$("body").removeClass("scroll");
				}				
			}
			function inRes(){
				var winW = $(window).width();
				if(isMobile || winW <= 1024){
					$("body").addClass("isMobile").removeClass("isPc");			
				}else{
					$("body").removeClass("isMobile").addClass("isPc");	
				}
			}
			$(window).load(function(){
				inLoad();
			})
			$(document).ready(function(){
				inReady();
				inScroll();
				inRes();
			});
			$(window).scroll(function(){
				inScroll();				
			});						
			$(window).resize(function(){
				inRes();
			});
		},
		headGnb : function(){
			var gnb = $("#header .menu_wrap .gnb_menu .gnb");
			var obj = $("#header .menu_wrap .gnb_menu .gnb > li");
			var header = $("#header");
			var Y = $("#header .menu_wrap").offset().top;
			function inScroll2(){
				var scrollT = $(window).scrollTop();
				if(scrollT >= Y){	
					header.addClass("headScroll");
				}else{
					header.removeClass("headScroll");
				}
			}
				
			function inScroll(){
				if($("body").hasClass("headScroll")){
					header.addClass("active");
				}else{
					header.removeClass("active");
					if(header.hasClass("gnbOpen")){
						header.addClass("active");
					};
				}
			}
			function inReady(){
				gnb.mouseenter(function(){
					header.addClass("active").addClass('gnbOpen');					
				}).mouseleave(function(){
					header.removeClass('active').removeClass('gnbOpen');				
					if($("body").hasClass("headScroll")){
						header.addClass("active");
					}
				});	
			}
			$(window).scroll(function(){
				inScroll2();
				inScroll();
			});	
			$(document).ready(function(){
				inScroll2();
				inScroll();
				inReady();
			});			
		},
		gnbPlus : function(){
			var obj = $(".gnb li");
			obj.each(function(){
				var leng = $(this).children("ul").children("li").length;
				if(leng > 0){
					$(this).addClass("plus");
				}else{
					$(this).removeClass("plus");
				}
				if(leng == 0){
					$(this).children("ul").remove();
				}
			});
		},
		m_gnbNav : function(){	
			var obj = $("#nav .gnb .dp1");
			function inEvent(){
				var winW = $(window).width();
				obj.each(function(){
					var leng = $(this).next(".dp2").find("li").length;					
					if(isMobile || winW <= 1024){
						if( leng > 0){		
							$(this).attr("href","javascript:void(0)").addClass("arrow");
							if($(this).attr("target")){
								$(this).removeAttr("target")
							}
						}						
					}else{	
						obj.removeClass("arrow");
						obj.parent("li").removeClass("active");
					}
				})
			};			
			obj.each(function(){
				$(this).click(function(){
					if($(this).hasClass("arrow")){				
						$(this).parent("li").toggleClass("active");
						$(this).parent("li").siblings("").removeClass("active");
					}
				})					
			})
			$(document).ready(function(){
				inEvent();				
			});			
			$(window).resize(function(){
				inEvent();
			});
		}
	}
	
	var Motion = UI.Motion = {
		aosInit : function(){
			AOS.init({
				// Global settings:
				disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
				startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on
				initClassName: 'aos-init', // class applied after initialization
				animatedClassName: 'aos-animate', // class applied on animation
				useClassNames: false, // if true, will add content of `data-aos` as classes on scroll
				disableMutationObserver: false, // disables automatic mutations' detections (advanced)
				debounceDelay: 50, // the delay on debounce used while resizing window (advanced)
				throttleDelay: 99, // the delay on throttle used while scrolling the page (advanced)  
				
				// Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
				offset: 150, // offset (in px) from the original trigger point
				delay: 0, // values from 0 to 3000, with step 50ms
				duration: 1000, // values from 0 to 3000, with step 50ms
				easing: 'ease', // default easing for AOS animations
				once: false, // whether animation should happen only once - while scrolling down
				mirror: false, // whether elements should animate out while scrolling past them
				anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
			});
		},
		ieFixed : function(){
			var fix = function(){
				if(navigator.userAgent.match(/Trident\/7\./)) {
					document.body.addEventListener("mousewheel", function() {
						event.preventDefault();			
						var wd = event.wheelDelta;	
						var csp = window.pageYOffset;
						window.scrollTo(0, csp - wd);		
					});
				}
			};			
			
			$.fn.extend({
				mouse_wheel: function() {
					$(this).on('mousewheel', function(e) {						
						if (e.originalEvent.wheelDelta >= 120) {
							this.scrollTop -= 50;
						} else if (e.originalEvent.wheelDelta <= -120) {
							this.scrollTop += 50;
						}
						return false;
					});
				}
			});			 
			
			var winW = $(window).width();
			if(!(isMobile) && !($('body').hasClass('pop')) && !(winW <= 1024)){				
				fix();
				$('.js_mouse_wheel').mouse_wheel();		
				$('textarea').mouse_wheel();
			}
		}			
	}
	var Slider = UI.Slider = {
		mainVisual : function(){
			var mainSlider = new Swiper('.mainSlider', {
				slidesPerView: 'auto',
				effect: 'slide',
				speed: 1000,
				spaceBetween: 0,
				freeMode: false,
				loop: true,
				loopFillGroupWithBlank: false,
				centeredSlides: false,
				autoplay: {
				 delay: 4000,
				 disableOnInteraction: false,
				},
				pagination: {
				 el: '.mainSlider-pagination',
				 clickable: true
				},
				navigation: {
				nextEl: '.mainSlider-next',
				prevEl: '.mainSlider-prev',
				}
			});
			$(".mainSlider-pause").click(function(){
				$(".mainPauseWrap").addClass("pause");
				mainSlider.autoplay.stop();
			});
			$(".mainSlider-play").click(function(){
				$(".mainPauseWrap").removeClass("pause");
				mainSlider.autoplay.start();
			});
		},
		pageSlider : function(obj,num,wide){
			if(!wide){
				var time = 600;
				var delay = 4000;
				var mg = 30;
			}else{
				var time = 800;
				var delay = 5000;
				var mg = 0;
			}
			var pageSlider = new Swiper(obj, {
				slidesPerView: num,					
				speed: time,
				spaceBetween: mg,				
				loop: true,				
				centeredSlides: false,
				autoplay: {
				 delay: delay,
				 disableOnInteraction: false,
				},
				pagination: {
				 el: obj+'-pagination',
				 clickable: true
				},
				navigation: {
				nextEl: obj+'-next',
				prevEl: obj+'-prev',
				}
			});
			if(!wide){
				$(obj).find('.swiper-slide').on('mouseover', function() {
					pageSlider.autoplay.stop();
				});			
				$(obj).find('.swiper-slide').on('mouseout', function() {
					pageSlider.autoplay.start();
				});	
			}
		}
	}	
})(jQuery, window);