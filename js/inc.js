// JavaScript Document
var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
$(function(){
	isPop = $("body").hasClass("pop");
});

//GO SCROLL
function goTop() {
	if(isPop){
		$("#mCSB_1_container").animate({ top: 0 }, 400);
	}else{
		$('body, html').animate({ scrollTop: 0 }, 400);
	}
}
function goDown() {
	$('body, html').animate({ scrollTop: $("#footer").offset().top }, 400);
}
function linkScroll(no){
	var Y = $(".linkScroll[data-no='"+no+"']").offset().top;
	var headerH = $("#header").outerHeight();
	$('body, html').animate({ scrollTop: Y-headerH }, 400);
}

function goLink(no){
	var Y = $(".linkScroll[data-no='"+no+"']").offset().top;
	//var headerH = $("#header").outerHeight();
	var headerH = 0;
	$('body, html').animate({ scrollTop: Y+1 }, 500);
}

$(function(){
	$(".tabIdx").on("click",".idx",function(){
		var wrap = $(this).data("wrap");
		var idx = $(this).data("idx");
		$(this).addClass("on");
		$(".tabIdx .idx[data-wrap="+wrap+"]").not("[data-idx="+idx+"]").removeClass("on");
		$(".conIdx[data-wrap="+wrap+"]").not("[data-idx="+idx+"]").removeClass("on");
		$(".conIdx[data-wrap="+wrap+"][data-idx="+idx+"]").addClass("on");
	})
})

scrollLoad();
function scrollLoad(evt){
	window.addEventListener('load', function() {
		$("body").addClass("load");
		$(".scrollAni.start").addClass("on");
	});
	document.addEventListener('scroll', function() {
		onScroll(evt);
	});
	var latestKnownScrollY = 0,
	ticking = false;
	function onScroll(evt) {
		latestKnownScrollY = document.documentElement.scrollTop;
		requestTick();
		if(latestKnownScrollY > 0){
			$("body").addClass("scroll");
		}else{
			$("body").removeClass("scroll");
		}
		if(evt){
			evtStart(evt);
		}
	}
	function requestTick() {
		if(!ticking) {
			requestAnimationFrame(update);
		}
		ticking = true;
	}
	function update() {
		ticking = false;
	}
	function evtStart(evt){
		var evtArr = evt.split(" ")
		var fcObj = {}
		fcObj.pageScrollAni = function(){
			var aniObj = $(".scrollAni");
			var winH = $(window).height();
			aniObj.each(function(){
				var TO = $(this);
				var T = TO.offset().top;
				var TH = TO.outerHeight();
				var scrollP = T - (winH*.7);
				var scrollM = T + TH;
				if(latestKnownScrollY > scrollP && latestKnownScrollY < scrollM){
					TO.addClass("on");
				}
				if(latestKnownScrollY == 0){
					TO.not(".start").removeClass("on");
				}
			});
		}
		fcObj.pageScrollLink = function(){
			var obj = $(".linkScroll");
			var winH = $(window).height();
			obj.each(function(){
				var idx = $(this).data("no");
				var objT = $(this).offset().top;
				var objH = $(this).outerHeight();
				if(latestKnownScrollY > objT && latestKnownScrollY < (objT+objH)){
					$(".linkNav[data-no='"+idx+"']").addClass("on")
				}else{
					$(".linkNav[data-no='"+idx+"']").removeClass("on")
				}
			})
		}
		fcObj.footerCheck = function(){
			var ft = $("#footer").offset().top;
			var VA = latestKnownScrollY + $(window).height();
			if(VA > ft){
				$("body").addClass("footerCheck");
			}else{
				$("body").removeClass("footerCheck");
			}
		}
		for(var i=0; i < evtArr.length; i++){
			fcObj[evtArr[i]]();
		}
	}
}

//SCROLLBAR
$(window).load(function(){
	var scrollst = $(".scrollst")
	var scrollstX = $(".scrollstX")
	if(isMobile){
		scrollst.css("overflow-y","auto");
		scrollstX.css("overflow-x","auto");
	}else{
		scrollst.mCustomScrollbar({
			theme:"minimal-dark"
		});
		scrollstX.mCustomScrollbar({
			theme:"dark-thin",
			axis:"x",
			scrollbarPosition:"outside"
		});
	}
})

//tel
function telLink(no,obj){
	if(isMobile) {
		var tel = no.split('-');
		$(obj).attr("href","tel:"+tel[0]+tel[1]+tel[2]);
	}
};
function Comma(obj) {
	var x=$(obj).val();
	x = x.replace(/[^0-9]/g,'');   // 입력값이 숫자가 아니면 공백
	x = x.replace(/,/g,'');          // ,값 공백처리
	x = x.replace(/(^0+)/, "");
	$(obj).val(x.replace(/\B(?=(\d{3})+(?!\d))/g, ",")); // 정규식을 이용해서 3자리 마다 , 추가
}
function cn(x) {
	x = x.replace(/,/g,"");
	x = Number(x);
	return x;
}
function cy(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
//popup
function layerOpen(url){
	if($('.layer_frame').length>0) {
		return false;
	}
	var frame ='<iframe class="layer_frame" src="'+url+'" frameborder="0" scrolling="no" allowtransparency="true"></iframe>'
	var wrap = '<div class="layer_wrap">'+frame+'</div>'
	$("body").append(wrap);
	$("html").addClass("hidden").addClass("popOpen");
	$(".layer_frame").load(function(){
		$(".layer_wrap").addClass("on");
	});
};
$(document).ready(function(){
	layerLoad();
});
function layerLoad(){
	var obj = $('.pop .popWrap');
	var bg = "<div class='layer_bg' onclick='parent.layerClose()'></div>";
	obj.append(bg);
};
function layerClose(){
	$(".layer_wrap").remove()
	$("html").removeClass("hidden").removeClass("popOpen");
};
function popOpenC(u,n,w,h){
	var winW = window.screen.width;
	var winH = window.screen.height;
	var L = (winW-w)/2
	var T = (winH-h)/2
	window.open(u,n,'width='+w+',height='+h+',left='+L+',top='+T+', status=yes, toolbar=no, menubar=no, location=no, scrollbars=yes')
};
function layerOpenImg(obj){
	var src = $(obj).find("img").attr("src");
	var bg = '<div class="layer_bg" onclick="layerClose()"></div>'
	var frame ='<div class="layer_img">'+bg+'<div class="img"><img src="'+src+'" alt="" /><a href="javascript:layerClose();" class="popClose"><i class="xi"></i></a></div></div>'
	var wrap = '<div class="layer_wrap">'+frame+'</div>'

	$("body").append(wrap);
	$("html").css("overflow-y","hidden").addClass("popOpen");
	$(".layer_wrap").addClass("on");
};

function layerImg(obj){
	var src = $(obj).attr("src");
	var img ='<img src="'+src+'" class="va" />'
	var wrap = '<div class="layer_wrap_img va_wrap" onclick="layerImgClose(this)">'+img+'</div>'
	$("body").append(wrap);
};
function layerImgClose(obj){
	$(obj).remove();
};


//토글
function toggleClass(obj,wrap,Class,other){
	if(!wrap){
		var wrap = (".toggleWrap");
	};
	if(!Class){
		var Class = "on";
	};
	if(other){
		$(obj).parents(wrap).siblings("").removeClass(Class);
	};
	$(obj).parents(wrap).toggleClass(Class);
}

function toggleCate(){
	var obj = $(".page_shop_wrap .shop_lnb_wrap .gnb  > li");
	obj.each(function(){
		var leng = $(this).children(".dp2").children("li").length;
		if(leng > 0){
			$(this).addClass("plus");
			$(this).children(".dp1").attr("href","javascript:void(0)");
			$(this).children(".dp1").click(function() {
				toggleClass(this,'li','toggleOn',true);
			});
		}
	});

}

//검색창토글
function searChtoggleClass(obj,Class,wrap,remove,allRemove){
	if(obj == "body"){
		$("body,html").toggleClass("hidden");
	};
	if(!wrap){
		var wrap = (".searChtoggleWrap");
	};
	if(!Class){
		var Class = "on";
	};
	if(remove){
		$(obj).parents(wrap).removeClass(remove);
		$(obj).parents(wrap).siblings("").removeClass(remove);
	}
	if(allRemove){
		$(wrap).each(function(){
			var L = $(this).has(obj).length;
			if(L > 0){
				$(obj).parents(wrap).toggleClass(Class);
			}else{
				$(this).removeClass(Class);
			}
		})
	}else{
		$(obj).parents(wrap).toggleClass(Class);
		$(obj).parents(wrap).siblings("").removeClass(Class);
	}

};




//외부영역 클릭시 이벤트
function documentClick(obj,Class){
	$(document).mouseup(function (e){
		if(!Class){
			var Class = "on";
		};
		$(obj).each(function () {
			if($(this).has(e.target).length === 0){
				$(this).removeClass(Class);
			}
		});
	});
}

//숨김
function hide(wrap){
	$(wrap).hide();
};

//보임
function show(wrap){
	$(wrap).show();
};


//숨김,보임
function showHide(no,wrap){
	if(!wrap){
		var wrap = ".divShow";
	};
	$(wrap).hide();
	$(wrap+"[data-no='"+no+"']").show();
};

function labelShow(obj,no,wrap){
	if(!wrap){
		var wrap = ".labelShow";
	}
	if($(obj).prop("checked")==true){
		$(wrap).hide();
		$(wrap+"[data-no='"+no+"']").show();
	}else{
		$(wrap).hide();
	}
}

function labelCheck(obj,no,wrap){
	if(!wrap){
		var wrap = ".labelCheck";
	}
	if($(obj).prop("checked")==true){
		$(wrap).hide();
		$(wrap+"[data-no='"+no+"']").show();
	}else{
		$(wrap).hide();
	}
}



//추가
function addDiv(obj,wrap,html){
	var html = $(html).val();
	$(obj).parents().nextAll(wrap).append(html);

	$(".DATE_PICKER").removeClass('hasDatepicker').datepicker();
};
//삭제
function delDiv(obj,Class){
	if(!Class){
		var Class = ".delWrap";
	};
	$(obj).parents(Class).remove();

	$(".DATE_PICKER").removeClass('hasDatepicker').datepicker();
};
//리스트 번호
function addNum(obj,num,data){
	var leng = $(obj).length;
	for(var i=0; i<leng; i++){
		if(data){
			$(obj).find(num).eq(i).attr("data-num",i+1);
		}else{
			$(obj).find(num).eq(i).text(i+1);
		}
	}
}

//해당 영역만 인쇄
function printDiv(wrap){
	if(!wrap){
		var wrap = (".printDiv");
	};
	var ori = $('body').html();
    var pri = $(wrap).html();
	$('html').addClass("printPreview");
	$('body').html(pri);
	window.print();
	$('html').removeClass("printPreview");
	$('body').html(ori);
}

//체크시 숨김,보이기
function checkEvent(){
	var inp = $(".inpCk");
	var check = function(obj){
		var obj;
		if($(obj).is(":checked") == true){
			$(obj).parents().next(".checkShow").show();
		}else{
			$(obj).parents().next(".checkShow").hide();
		}
	};
	inp.on("propertychange change keyup paste input load", function(){
		var obj = $(this);
		check(obj)
	})
	inp.each(function(){
		var obj = $(this);
		check(obj)
	})
};

//input type file
var rvbtn = ' <button type="button" class="input_st c6 re removeF" onclick="fileDiv.delBtn(this)">파일제거</button>';
var fileDiv = {
	inputFile : function(target){
		var t = $(target);
		var p = t.parent();
		var n = t.val();
		if(n != ""){
			t.next().val(n);
			p.after(rvbtn);
		}else{
			t.next().val('');
		}
	},
	delBtn : function(target){
		var t = $(target);
		var p = t.parent();
		var n = t.val();
		t.prev().find("input").val('');
		t.remove();
	}
};

//toggle 클릭 스크립트
$.fn.clickToggle = function(a, b) {
	return this.each(function() {
		var clicked = false;
		$(this).click(function() {
			if (clicked) {
				clicked = false;
				return b.apply(this, arguments);
			}
			clicked = true;
			return a.apply(this, arguments);
		});
	});
};

//썸네일 이미지
function chgThumb(obj,wrap){
	if(!wrap){
		var wrap = (".thumbWrap");
	};
	var url = $(obj).find("img").attr("src");
	$("#viewImgBig").attr("src",url).hide().fadeIn(500);
	$(obj).parents(wrap).addClass("on").siblings().removeClass("on");
};
function chgThumb_load(thumb){
	$(thumb).eq(0).addClass("on");
};

//슬라이드 게시판
function boardFaq(BSbtn){
	var BStit = BSbtn.parents(".BStit");
	var BScon = BStit.next(".BScon");
	if(BScon.css("display")=="none"){
		BScon.slideDown(300).addClass("open").siblings(".BScon").hide().removeClass("open");
		BStit.addClass("on").siblings(".BStit").removeClass("on");
	}else{
		BScon.hide().removeClass("open");
		BStit.removeClass("on");
	}
};

function linkScroll(no){
	var Y = $(".linkScroll[data-no='"+no+"']").offset().top;
	var headerH = $("#header").outerHeight();
	$('body, html').animate({ scrollTop: Y-headerH }, 500);
}

function scrollAni(){
	var scrollY = $(window).scrollTop();
	var winH = $(window).height();
	var headerH = $("#header").outerHeight();
	var aniObj = $(".scrollAni");
	var obj = $(".linkScroll");
	aniObj.each(function(){
		var T = $(this).offset().top;
		var scrollC = scrollY + (winH*.9);
		if(scrollC > T){
			$(this).addClass("on");
		}
	});
	if(scrollY == 0){
		aniObj.removeClass("on");
	}

	var fixOffset = $(".fixOff_wrap");
	fixOffset.each(function(){
		if($(this).length > 0){
			var T = $(this).offset().top;
			if(scrollY < T){
				$(this).removeClass("fix");
			}else{
				$(this).addClass("fix");
			}
		}
	});

	var fixObj = $(".fixWrap");
	var dataEnd = $("*[data-no='end']");
	if(fixObj.length > 0 && dataEnd.length > 0){
		var fixObjP = fixObj.offset().top;
		var endObjP = dataEnd.offset().top * .98;
		if(scrollY < fixObjP){
			fixObj.removeClass("fix");
			$(".fixWrap .taBw .tab > li").removeClass("on")
		}else if(scrollY > endObjP){
			fixObj.removeClass("fix");
		}else{
			fixObj.addClass("fix");
		}
		obj.each(function(){
			var idx = $(this).data("no");
			var Offset = $(this).offset().top;
			var VA = scrollY+((winH-headerH)*.2);
			var H = $(this).outerHeight();
			if(VA > Offset){
				$(".fixWrap .taBw .tab > li").removeClass("on")
				$(".fixWrap .taBw .tab > li[data-no='"+idx+"']").addClass("on")
			}
		})
	}

}
$(document).ready(function(){
	scrollAni();
})
$(window).scroll(function(){
	scrollAni();
})

function imgZoom(){
	var zoomImg = $('.zoomImg');
	var zoomLv = zoomImg.data('zoom-level');
	var zoomSrc = zoomImg.attr('src');
	var magnifierWrap = $('.magnifierWrap');
	var magnifier = $('.magnifier');
	var pointer = $('.pointer');

	$(".zoomThumbWrap").on('click','.zoomThumbImg',function(e){
		magnifierWrap.fadeOut(0);
		pointer.fadeOut(0);
		var zoomThumbSrc= $(this).attr("src");
		zoomImg.attr("src",zoomThumbSrc);
		$(this).parents(".li").addClass("on");
		$(this).parents(".li").siblings("").removeClass("on");
		magnifier.css({"background-image": "url('" + zoomThumbSrc + "')","width": zoomImg.width() * zoomLv + "px ","height": zoomImg.height() * zoomLv + "px " });
	})

	$(".zoomWrap").on('mousemove touchmove', magnify);
	$('.magnifier').css({"background-image": "url('" + zoomSrc + "')","width": zoomImg.width() * zoomLv + "px ","height": zoomImg.height() * zoomLv + "px " });

	$('html').click(function(e){
		if($(e.target).parents('.zoomWrap').length < 1){
			magnifierWrap.fadeOut(0);
			pointer.fadeOut(0);
		}
	});
	$(".zoomWrap").mouseleave(function(){
		magnifierWrap.fadeOut(0);
		pointer.fadeOut(0);
	})

	function magnify(e) {
		var mouseX = e.pageX - $(this).offset().left;
		var mouseY = e.pageY - $(this).offset().top;

		if (mouseX < $(this).width() && mouseY < $(this).height() && mouseX > 0 && mouseY > 0) {
			magnifierWrap.fadeIn(200);
			pointer.fadeIn(200);
		} else {
			magnifierWrap.fadeOut(0);
			pointer.fadeOut(0);
		}

		if(magnifier.is(":visible")) {
			if( mouseX < pointer.width() / 2){
				var rx = pointer.width() / 2;
				var px = 0
			}else if( mouseX + pointer.width() / 2 > $(this).width()){
				var rx = $(this).width() - pointer.width() / 2;
				var px = -((zoomImg.width() * zoomLv - magnifierWrap.width()));
			}else{

				var rx = mouseX;
				var px = -((zoomImg.width() * zoomLv - magnifierWrap.width()) * mouseX / $(this).width());
			}
			if( mouseY < pointer.height() / 2){
				var ry = pointer.height() / 2;
				var py = 0
			}else if( mouseY + pointer.height() / 2 > $(this).height()){
				var ry = $(this).height() - pointer.height() / 2;
				var py = -((zoomImg.height() * zoomLv - magnifierWrap.height()));
			}else{

				var ry = mouseY;
				var py = -((zoomImg.height() * zoomLv - magnifierWrap.height()) * mouseY / $(this).height());
			}
			magnifier.css({
				left: px,
				top: py,
				//backgroundPosition: rx + "px " + ry + "px"
				//'transform-origin': (mouseX / $(this).width()) * 100 + '% ' + (mouseY / $(this).height()) * 100 + '%'
			});
			pointer.css({
				left: rx,
				top: ry,
				//backgroundPosition: rx + "px " + ry + "px"
				//'transform-origin': (mouseX / $(this).width()) * 100 + '% ' + (mouseY / $(this).height()) * 100 + '%'
			});
		}
	}
}

function p_like(p_idx) {

}

function ajax_del(tb, idx, fd,others){
	var c = confirm("해당 항목을 삭제하시겠습니까?");
	if(c){
		var url = "../act/doquery_ajax.php";
		var params = {"qmode": "t_del", "table": tb, "idx": idx, "folder": fd, "others": others};
		$.post(url, params, function(result){
			result=result.trim();
			if(result=="ok"){
				alert("삭제되었습니다.");
				location.reload(true);
			}else if(result=="session_out"){
				alert("세션이 종료되었습니다. 다시 로그인해주세요.");
				location.href = "../login/login.php";
			}else{
				alert(result);
			}
		});
	}
}

function login_plz(){
	var c = confirm("로그인 후 이용 가능한 서비스입니다.\n로그인 페이지로 이동하시겠습니까?");
	if(c) {
		location.href='../sub_member/login.php';
	}
}
function likes(p_idx){
		var url = "../act/doquery_ajax.php";
		var params = {"qmode": "likes", "p_idx": p_idx};
		$.post(url, params, function(result){
			result=result.trim();
			if(result=='add') {
				$('.lbtn_'+p_idx).removeClass('xi-heart-o')
				$('.lbtn_'+p_idx).addClass('xi-heart lbtn')
			} else if(result=='del') {
				$('.lbtn_'+p_idx).addClass('xi-heart-o')
				$('.lbtn_'+p_idx).removeClass('xi-heart lbtn')
			}
		});
}
function all_chk(obj,cle) {
	if($(obj).is(':checked')==true) {
		$('.'+cle).prop('checked',true);
	} else {
		$('.'+cle).prop('checked',false);
	}
}
