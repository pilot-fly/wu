$(function(){
	var c=document.getElementById("c");
	var $audio=$("#audio");
	var audio=$("#audio").get(0);
  var audio1=$("#audio1").get(0);
	var ctx=c.getContext('2d');
	var sep=40;
	var sr=5;
	var br=40;
  var time=[10,9,8,7,6,5,4,3,2,1,0];
  var time1=[10,9,8,7,6,5,4,3,2,1,0];
  var qizi={};
  var info=$('.info');
  var AI=false;
  var gameState='pause';
  kongbai={};
 
	//画棋盘
	function huan(x){
      return (x+0.5)*sep+0.5;
	}
	function qipan(){
    ctx.clearRect(0,0,600,600);
    // ctx.save();
    // ctx.fillStyle='#BC7905';
    // ctx.fillRect(0,0,600,600);
    // ctx.restore();

    // ctx.save();
    // ctx.fillStyle='#FCC621';
    // ctx.fillRect(huan(0),huan(0),560.5,560.5);
    // ctx.restore();

		ctx.save();
    ctx.beginPath();
    for(var i=0;i<15;i++){
    	ctx.moveTo(huan(0),huan(i));
      ctx.lineTo(huan(14),huan(i));
      ctx.moveTo(huan(i),huan(0));
      ctx.lineTo(huan(i),huan(14));
    }
    ctx.stroke();
    ctx.closePath();
		ctx.restore();

    for(var i=0;i<15;i++){
      for(var j=0;j<15;j++){
        kongbai[m(i,j)]=true;
      }
    }
	}
	qipan();

  	//画小圆
  	function scil(x,y){
  		ctx.save();
      ctx.beginPath();
      ctx.arc(huan(x),huan(y),sr,0,Math.PI*2);
      ctx.fill();
      ctx.closePath();
  		ctx.restore();
  	}
  	scil(7,7);
  	scil(3,3);
  	scil(3,11);
  	scil(11,3);
  	scil(11,11);

   //画表盘
    function biaopan(cp){
      cp.save();
        cp.beginPath();
        cp.translate(100,100);
        for(var i=0;i<60;i++){
          if(i%5==0){
            cp.moveTo(0,-50);
          }else{
            cp.moveTo(0,-70);
          }
          cp.lineTo(0,-80);
          cp.rotate(Math.PI/180*6);
        }
      cp.closePath();
      cp.stroke();
      cp.restore();

      cp.save();
      cp.font = "80px serif";
      cp.fillStyle="#fff";
      cp.textAlign="center";
      cp.textBaseline = "middle";
      cp.fillText("10",100,100);
      cp.restore();
    }
	 //黑白落子的时间
    var blackT=document.getElementById("blackT");
    var ctx1=blackT.getContext('2d');
    var whiteT=document.getElementById("whiteT");
    var ctx2=whiteT.getContext('2d');
    biaopan(ctx1);
    biaopan(ctx2);
    function pan(ctx1,qiming){
    	ctx1.clearRect(0,0,200,200);    	

		  ctx1.save();
      ctx1.beginPath();
      ctx1.translate(100,100);
      ctx1.arc(0,0,80,0,Math.PI*2);
	    ctx1.closePath();
	    ctx1.stroke();
	    ctx1.restore();
    }
    var de=0;//黑棋时间小点
    var deg=0;//白棋时间小点
    //黑棋时间
    function render(cp,ming,t){
    	cp.clearRect(0,0,200,200);
	    pan(cp,ming);

	    cp.save();
      cp.beginPath();
      cp.translate(100,100);
      cp.rotate(Math.PI/180*de);
      cp.arc(0,-80,10,0,Math.PI*2);
      cp.fill();
      cp.closePath();
	    cp.restore();
	    

	    de+=1;
       if(de===360){
        alert("时间到，白棋胜，结束游戏");
        clearInterval(t);
       }

      cp.save();
      cp.font = "80px serif";
      cp.fillStyle="#fff";
      cp.textAlign="center";
      cp.textBaseline = "middle";
      cp.fillText(time1[Math.floor(de/33)],100,100);
      cp.restore();

      audio1.play();
	    
    }

    //白棋时间
    function render1(cp,ming,t){
    	cp.clearRect(0,0,200,200);
	    pan(cp,ming);

	    cp.save();
      cp.beginPath();
      cp.translate(100,100);
      cp.rotate(Math.PI/180*deg);
      cp.arc(0,-80,10,0,Math.PI*2);
      cp.fill();
      cp.closePath();
	    cp.restore();

	    cp.save();
      cp.font = "80px serif";
      cp.fillStyle="#fff";
      cp.textAlign="center";
      cp.textBaseline = "middle";
      cp.fillText(time[Math.floor(deg/33)],100,100);
      cp.restore();
	    deg+=1;
	     if(deg===360){
	     	alert("时间到，黑棋胜，结束游戏");
	     	clearInterval(t);
	     }

       audio1.play();

      
    }
    var bt=setInterval(function(){
    	render(ctx1,"黑棋",bt);
     
    },100);
    var wt=setInterval(function(){
    	render1(ctx2,"白棋",wt);
      
    },100);


    clearInterval(bt);
    clearInterval(wt);
    
    // var qizi=[];
    //画棋子
    function luozi(x,y,r,color){
       ctx.save();
       ctx.translate(huan(x),huan(y));
       ctx.beginPath();
       ctx.arc(0,0,r,0,Math.PI*2);
       var g=ctx.createRadialGradient(-4,-4,0,0,0,20);
       if(color==='black'){
       	g.addColorStop(0.1,"#eee");
       	g.addColorStop(0.2,"#eee");
       	g.addColorStop(1,"black");
       	ctx.fillStyle=g;
       }else{
       	g.addColorStop(0.1,"#fff");
       	g.addColorStop(0.2,"#fff");
       	g.addColorStop(1,"#eee");
       	ctx.fillStyle=g;
       }
       qizi[x+"_"+y]=color;
       ctx.fill();
       ctx.closePath();
       ctx.restore();
       audio.play();
       gameState='play';
       delete kongbai[m(x,y)];
       // qizi.push({x:x,y:y,color:color});
       // console.table(qizi);
    }
    
    //判断是否已有某个棋子
    function you(x,y){
       var kai=false;
       $.each(qizi,function(i,v){
           if(qizi[i].x==x&&qizi[i].y==y){
           	kai=true;
           }
       });
       return kai;
           // console.log(qizi[i].x)
    }


    
    //生成棋谱
    chessManual=function(){
      clearInterval(bt);
      clearInterval(wt);
      ctx.save();
      ctx.font = "20px serif";
      ctx.textAlign="center";
      ctx.textBaseline = "middle";
      var i=1;

      for(var k in qizi){
        var arr=k.split('_');
        if(qizi[k]==="white"){
          ctx.fillStyle="#333";
        }else{
          ctx.fillStyle="#F92672";
        }
        ctx.fillText(i++,huan(parseInt(arr[0])),huan(parseInt(arr[1])));
      }
      ctx.restore();
      $('.box').addClass('box-xian');
      if($('.box').find('img').length){
        $('.box').find('img').attr('src',c.toDataURL());
      }else{
        $('<img>').attr('src',c.toDataURL()).appendTo('.box');
      }
      if($('.box').find('a').length){
        $('.box').find('a').attr('href',c.toDataURL());
      }else{
        $('<a>').attr('href',c.toDataURL()).attr('download','qipu.png').appendTo('.box');
      }
      
    }
    //查看棋谱
    $('#qipu').on('click',chessManual);
    $('#close').on('click',function(){
      $('.box').removeClass('box-xian');
      qipan();
      for(var k in qizi){
        var x=parseInt(k.split('_')[0]);
        var y=parseInt(k.split('_')[1]);
        luozi(x,y,20,qizi[k]);
      }
    });
    //人机截堵
    function intel(){
      //棋盘上所有的空白位置
      var max=-Infinity;
      var pos={};
      for(var k in kongbai){
        var x=parseInt(k.split('_')[0]);
        var y=parseInt(k.split('_')[1]);
        var m=panduan(x,y,'black');
        if(m>max){
          max=m;
          pos={x:x,y:y};
        }
      }

      var max2=-Infinity;
      var pos2={};
      for(var k in kongbai){
        var x=parseInt(k.split('_')[0]);
        var y=parseInt(k.split('_')[1]);
        var m=panduan(x,y,'white');
        if(m>max2){
          max2=m;
          pos2={x:x,y:y};
        }
      }

      if(max>max2){
        return pos;
      }else{
        return pos2;
      }
      
    }
    //下棋
    var flag=true;
    function handleClick(e){
      var bian=0;
        var a=Math.floor(e.offsetX/sep);
        var b=Math.floor(e.offsetY/sep);
        // if(you(a,b)){
        //  return;
        // }
        if(qizi[a+"_"+b]){
          return;
        }
        //人机下棋及输赢
        if(AI){
          luozi(a,b,20,"black");
          clearInterval(bt);
          de=0;
          wt=setInterval(function(){
            render1(ctx2,"白棋",wt);
          },100);
          if(panduan(a,b,"black")>=5){
            $(c).off('click');
            info.find('.text').html('黑棋').end().addClass('active');
            clearInterval(wt);
          }
          var p=intel();
          luozi(p.x,p.y,20,'white');
          clearInterval(wt);
          deg=0;
          bt=setInterval(function(){
            render(ctx1,"黑棋",bt);
          },100);
          if(panduan(p.x,p.y,'white')>=5){
            $(c).off('click');
            info.find('.text').html('白棋').end().addClass('active');
            clearInterval(bt);
          }
          return false;
        }
        //双人下棋及输赢
        if(flag){
          luozi(a,b,20,"black");
          clearInterval(bt);
            de=0;
          wt=setInterval(function(){
            render1(ctx2,"白棋",wt);
          },100);
          if(panduan(a,b,"black")>=5){
            $(c).off("click");
            clearInterval(wt);
            $('.text').html('黑棋');
            info.addClass('active');
          }
        }else{
          luozi(a,b,20,"white");
          clearInterval(wt);
          deg=0;
          bt=setInterval(function(){
            render(ctx1,"黑棋",bt);
          },100);
          if(panduan(a,b,"white")>=5){
            clearInterval(bt);
            $(c).off("click");
            $('.text').html('白棋');
            info.addClass('active');
          }
        }
        flag=!flag;
    }
    $(c).on('click',handleClick);

    function m(c,d){
      return c+"_"+d;
    }

    //输赢判断
    function panduan(x,y,color){
      var row=1; var i;
      i=1;while(qizi[m(x+i,y)]===color){ row++; i++; }
      i=1;while(qizi[m(x-i,y)]===color){ row++; i++; }
      
      var lie=1;
      i=1;while(qizi[m(x,y+i)]===color){ lie++; i++; }
      i=1;while(qizi[m(x,y-i)]===color){ lie++; i++; }
        
      var zX=1;
      i=1;while(qizi[m(x+i,y+i)]===color){ zX++; i++; }
      i=1;while(qizi[m(x-i,y-i)]===color){ zX++; i++; } 
      
      var yX=1;
      i=1;while(qizi[m(x+i,y-i)]===color){ yX++; i++; }
      i=1;while(qizi[m(x-i,y+i)]===color){ yX++; i++; } 

      return Math.max(row,lie,zX,yX);
    }

    //重置棋盘
    function restart(){
      info.removeClass('active');
      qipan();
      clearInterval(bt);
      clearInterval(wt);
      $(c).on('click',handleClick);
      flag=true;
      qizi={};
      ctx1.clearRect(0,0,blackT.width,blackT.height);
      ctx2.clearRect(0,0,whiteT.width,whiteT.height);
      biaopan(ctx1);
      biaopan(ctx2);
      scil(7,7);
      scil(3,3);
      scil(3,11);
      scil(11,3);
      scil(11,11);
      gameState='pause';
      AI=false;
      $(".robot").removeClass('red');
      $(".double").addClass('red');
    }
    $('.again').on('click',restart);

    //暂停、继续、重新开局
    $("#zan").on('click',function(){
      if(flag){
        clearInterval(bt);
      }
      else{
        clearInterval(wt);
      }
    });
    $("#jixu").on('click',function(){
      if(flag){
        bt=setInterval(function(){
          render(ctx1,"黑棋",bt);
        },100);
      }
      else{
        wt=setInterval(function(){
          render1(ctx2,"白棋",wt);
        },100);
      }
    });
    $("#xin").on("click",restart);

    //游戏规则
    $("#gui").on("click",function(){
      $("#guize").css("display","block");
    });
    $("#fan").on("click",function(){
      $("#guize").css("display","none");
    });

    //人机和双人的切换
    $(".robot").on('click',function(){
      if(gameState==='play'){
        return;
      }
      $(".double").removeClass('red');
      $(this).addClass('red');
      AI=true;
    });
    $(".double").on('click',function(){
      if(gameState==='play'){
        return;
      }
      $(".robot").removeClass('red');
      $(this).addClass('red');
      AI=false;
    });
});