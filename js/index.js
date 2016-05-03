$(function(){
	var $bj=$(".banner-bigimg")//获取最大的容易，移入停止
	var $imgW=$(".banner-bigimg li").width()//每次移动的距离

	var $btn=$(".bannerBtn div")//轮播下面的小圆点
	var $leftBtn=$(".banner-leftjt")
	var $rightBtn=$(".banner-rightjt")
	var $imgs=$(".banner-bigimg li")
	console.log($imgs)
	var num=0;

	$imgs.css({display:'none'}).eq(0).css({marginLeft:0,display:'block'})
	var now=0;
	var next=0;
	var flag=true;
	var t=setInterval(move,3500)
	function move(){
		if(!flag){
			return
		}
		flag=false;
		next++;
		if(next==$btn.length){
			next=0;
		}
		if(next>now){
			$imgs.eq(now).animate({marginLeft:-$imgW},function(){//当前显示的页面向左移动一个图片的距离
				flag=true;
				$(this).css({display:"none"})
			});
			$imgs.eq(next).css({marginLeft:0,display:"block"})
			//下一个要显示的先放到最右边，然后慢慢移动到可以显示的
			$btn.removeClass().eq(next).addClass("hot")//下面的按钮样式变
		}else{
			$imgs.eq(now).animate({marginLeft:0},function(){//当前显示的页面向左移动一个图片的距离
				flag=true;
				$(this).css({display:"none"})
			});
			$imgs.eq(next).css({marginLeft:-$imgW,display:"block"}).animate({marginLeft:0})
			//下一个要显示的先放到最右边，然后慢慢移动到可以显示的
			$btn.removeClass().eq(next).addClass("hot")//下面的按钮样式变
		}
		now=next;
	}
	$bj.hover(function(){//当鼠标放上去的时候，停止，移出去的时候继续
		clearInterval(t)
	},function(){
		 t=setInterval(move,3500)
	})
	$btn.click(function(){//小圆点点击的时候 图片变化
		var index=$(this).index()
		if(!flag||now==index){
				return
			}
			flag=false;
		if(index>now){//从右往左进
			$imgs.eq(now).animate({marginLeft:-$imgW},function(){
				$(this).css({display:"none"})
			});
			$imgs.eq(index).css({marginLeft:0,display:'block'}).animate({marginLeft:0},function(){
				flag=true;
			})
		}
		if(index<now){//从左往右进
			$imgs.eq(now).animate({marginLeft:0},function(){
				$(this).css({display:"none"})
			});
			$imgs.eq(index).css({marginLeft:-$imgW,display:'block'}).animate({marginLeft:0},function(){
				flag=true;
			})	
		}
		$btn.removeClass().eq(index).addClass("hot");
		now=next=index;
	})
	$rightBtn.click(function(){
		move()
	})
	$leftBtn.click(function(){
		if(!flag){
			return
		}
		flag=false
		$imgs.stop(false,true)
		next--;    //一定要想要顺序，在next这里出现过错误，顺序问题导致出现一个空脚标
		if(next==-1){
			next=$btn.length-1;
		}
		if(next<now){
			$imgs.eq(now).animate({marginLeft:0},function(){
				flag=true;
				$(this).css({display:"none"})
			});
			$imgs.eq(next).css({marginLeft:-$imgW,display:'block'}).animate({marginLeft:0})
			$btn.removeClass().eq(next).addClass("hot")
		}else{
			$imgs.eq(now).animate({marginLeft:-$imgW},function(){
				flag=true;
				$(this).css({display:"none"})
			});
			$imgs.eq(next).css({marginLeft:0,display:'block'})
			$btn.removeClass().eq(next).addClass("hot")
		}
		now=next;
	})
	
})