/*
*   music of systerm zepto
      wirter : xuyinghao
        2017 - 9 - 9
*
*/

// 用面向对象的思想来进行写音乐播放器
// 抽象一个音乐播放器对象
function MusicObj (name,musicdata) {
    this.name = name;
    this.musicdata = musicdata;
    this.musicNow = musicdata.arrPlay[0];
    this._init();
};
MusicObj.prototype = {
    constructor:MusicObj,
    // 音乐播放器的初始化
    _init : function () {
      var myaudio = document.createElement('audio');
      document.body.appendChild(myaudio);
      this.changData();
      this.dragFn('progress_img');
      this.dragFn('vulum_secod');
      this.progessFn();
      this.playtimeFn();


    },
    changData : function () {
      $('audio')[0].src = this.musicNow.srcPlay;
      $('audio')[0].autoplay = 'autoplay';
      $('audio')[0].volume = 1;
      $('.music_title span').text(this.musicNow.name);
      $('.music_text_name').text(this.musicNow.singer);

    },
    // 获取当前播放的音乐的下标的功能
    getIndex : function () {
      var nowPlay = $('audio')[0].src;
      console.log($('.music_title span').html());
      var arr = [];
      // console.log(this)
      this.musicdata.arrPlay.map(function(item){
         arr.push(item.name)
      })
      var index = arr.indexOf($('.music_title span').html());
      return index;
    },
    // 开始播放的功能
    playMusic : function () {
        $('audio')[0].play();
        $('.center_img')[0].src = '../images/music_img_10.png';
    },
    // 暂停播放的功能
    stopMusic : function () {
      $('audio')[0].pause();
      $('.center_img')[0].src = '../images/stop_img_03.png';
    },
    // 切换上一首歌曲的功能
    toggleTop : function () {
      console.log(this.getIndex())
      console.log(this.musicdata.arrPlay);
      var togIndex = this.getIndex()
       if ( togIndex == 0) {
          togIndex = this.musicdata.arrPlay.length - 1;
       }else {
          togIndex--;
       };
       this.musicNow = this.musicdata.arrPlay[togIndex];
       this.changData();
    },
    // 切换下一首歌曲的功能
    toggleBottom : function () {
     var toggleIndex = this.getIndex();
     if (toggleIndex == this.musicdata.arrPlay.length - 1) {
        toggleIndex  = 0;
     }else {
        toggleIndex ++;
     };
     this.musicNow = this.musicdata.arrPlay[toggleIndex];
     this.changData();
    },
    // 单曲循环的功能
    onlyPlay : function () {
      $('audio')[0].loop = true;
    },
    // 拖拽事件
    dragFn : function (elId) {
      var that = this;
      // 设置开关实现是否拖拽。
      var that = this;
     	var tag = false,
     		lastX,lastY;
     	$('#' + elId)[0].addEventListener('touchstart',function (e) {
     		e.preventDefault();
     		// 获取初始化坐标l
         var touch = e.touches[0];
     			lastX =  touch.clientX,
     			lastY =  touch.clientY;
     		  tag = true;
     	});
     	// 元素的mousemove事件。
     	$('body')[0].addEventListener('touchmove',function (e){
     	// 	e.preventDefault();
        var touch = e.touches[0];
     		if (tag) {
     			$('#' + elId)[0].style.left = (touch.clientX - lastX) + $('#' + elId)[0].offsetLeft + 'px';
    	 		// 更新坐标
    	 		lastX = touch.clientX;
    	 		lastY = touch.clientY;
          // 判断临界点，超出临界点要停止拖动
          if ($('#vulum_secod')[0].offsetLeft < 85) {
              console.log(2);
              tag = false;
              $('audio')[0].muted = true;
          }
          if ($('#vulum_secod')[0].offsetLeft > 83 ) {
              $('audio')[0].muted = false;
          }


          if ( $('#vulum_secod')[0].offsetLeft >= 309) {
              // console.log(1);
              $('audio')[0].volume = 1;
              tag = false;
          }
          //  调用不同是进度函数
          that.vumsFn();
          that.color_changeFn('change_tiao','progress_img');
          //  进度条百分比
          that.volumeFn('vulum_span','vulum_secod');
     		};
     	});
     	$('#' + elId)[0].addEventListener('touchup',function () {
     		tag = false;
     	});
    },
    // 进度条颜色变化函数
    color_changeFn : function (el1,el2) {
       $('#' + el1).css({
         'width': $('#' + el2)[0].offsetLeft + 'px'
       });
    },
    // 声音变化的功能
    volumeFn : function (el1,el2) {
      $('#' + el1).css({
        'width': ($('#' + el2)[0].offsetLeft - 42) + 'px'
      });
    },
    // 进度条的函数的功能
    progessFn :function () {
      var that = this;
      // 获取audio对应的事件，加载资源
      $('audio')[0].addEventListener('loadeddata',function () {
          var time_data =parseFloat($('audio')[0].duration / 60);
          $('audio')[0].addEventListener('timeupdate',function () {
      	 		// 取得相对应的百分比
      	 		var percent = $('audio')[0].currentTime / $('audio')[0].duration;
      	 		// console.log(percent);
      	 		// 赋值对应的百分比
      	 		$('#progress_img')[0].style.left = $('#progress_tiao')[0].offsetWidth * percent  + 'px';
            that.color_changeFn('change_tiao','progress_img');
       		})
      })
    },
    // 播放时间的功能
   playtimeFn : function () {
     // 获取视频资源长度
     $('audio')[0].addEventListener('loadeddata',function(){
       var time_data = parseFloat($('audio')[0].duration / 60);
       // console.log(time_data.toFixed(2));
       $('.progress_time_right').text(time_data.toFixed(2))

     });
     // 进度条的进度
       $('audio')[0].addEventListener("timeupdate", function(){
           var time_end = $('audio')[0].currentTime / 60;
           $('.progress_time_left').text(time_end.toFixed(2));
       });
    },
    // 封装声音调节功能
   vumsFn: function  () {
      	$('audio')[0].volume =  ($('#vulum_secod')[0].offsetLeft - 45) / ($('#vulomn_progress')[0].offsetWidth);
        // console.log($('#vulomn_progress')[0].offsetWidth);
         //console.log($('audio')[0].volume);
      	if ( $('audio')[0].volume > 1) {
      		$('#vulum_secod')[0].style.left = $('#vulomn_progress')[0].offsetWidth + 'px';
      	}
   }
   // 封装声音的颜色功能
  //  vumsDafuleFn : function () {
	// // 设置声音的百分比为1；
  //      $('audio')[0].volume = 1;
  //   	 this.volumeFn('vulum_span','vulum_secod');
  //   }

}
  // 初始化音乐播放器的实例;
  // 配置音乐数据。
  var musicData = {
      erro : 0,
      arrPlay : [
        {
          name : '上海滩',
          singer : '叶丽仪',

          srcPlay : '../yinyue/shanghaitan.mp3'
        },
        {
          name:'倩女幽魂',
          singer : '张国荣',
          srcPlay : '../yinyue/qingnvyouhui.mp3'
        },
        {
          name : '红日',
          singer : '杨子姗',
          srcPlay : '../yinyue/hongri.mp3'
        },
        {
          name:'喜欢你',
          singer : '邓紫棋',
          srcPlay : '../yinyue/xihuanni.mp3'
        }]
  };
  var myMusic = new MusicObj('xuyinghao',musicData);
  // 添加监听事件
  $('.center_img')[0].addEventListener('touchstart',function () {
      	$('audio')[0].paused ? myMusic.playMusic () : myMusic.stopMusic ();
  });
  // 切换音乐菜单上一首事件
  $('.left_img')[0].addEventListener('touchstart',function(){
      myMusic.toggleTop();
  })
  // 切换音乐菜单下一首事件
  $('.right_img')[0].addEventListener('touchstart',function(){
      myMusic.toggleBottom();
  });
  // 单曲循环
  $('.vulomn_box_right img')[0].addEventListener('touchstart',function(){
      myMusic.onlyPlay();
  })
