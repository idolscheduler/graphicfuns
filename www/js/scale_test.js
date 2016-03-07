// This is a JavaScript file

    app.factory('cls_page', function()
    {
        var data = 
            {
                now_page    : 1,
                max_page    : 100,
                img_width   : 0,
                img_height  : 0,
                scale_value : 5,
                pinch       : 0,
                init_show   : false,
                menu_show   : false
            };
        
        return data;
    });

    //ng-controller属性で指定した文字列
    module.controller('PageController_scale_test', function ($scope, $interval, cls_page)
    {
//        $scope.time = "00:00.000";
        var promise;

        $scope.confirm = function(material)
        {
            var mod = material ? 'material' : undefined;
            ons.notification.confirm (
            {
                title   : "続きを読むには15ポイントが必要です。",
                message: "Please enter your age",
                modifier: mod,
                callback: function(idx)
                {
                    switch (idx)
                    {
                        case 0:
                            ons.notification.alert(
                            {
                                message: 'You pressed "Cancel".',
                                modifier: mod
                            });
                            break;
                        case 1:
                            ons.notification.alert(
                            {
                                message: 'You pressed "OK".',
                                modifier: mod
                            });
                            $("#img").attr("src", "https://idolscheduler.jp/img/gf_sample_thumb_comic.jpg");
//                            alert("SwipeRight OK");
                            $scope.spinner = false;
                            break;
                    }
                }
            });
        }

        $scope.start = function() {
//            var s_time = new Date();
            promise =  $interval(function() {
                $("#toolbar").css({
                    left: $(window).scrollLeft(),
                    top : $(window).scrollTop()
                });
//                $scope.time = new Date() - s_time;

                $("#img").width( $("#img").width() -0.01);
                $("#img").height($("#img").height()-0.01);
                $("#img").width( $("#img").width() +0.01);
                $("#img").height($("#img").height()+0.01);
            }, 1);
        };
        
        $scope.stop = function(){
            $interval.cancel(promise);
        }

        $scope.onSwipeLeft= function() {
            if($("#img").width() === window.innerWidth)
            {
                $scope.spinner = true;
                $("#img").attr("src", "https://idolscheduler.jp/img/gf_sample_thumb_comic_3.jpg");
                alert("SwipeLeft OK");
                $scope.spinner = false;
            }
        };
        $scope.onSwipeRight= function(){
            if($("#img").width() === window.innerWidth)
            {
                $scope.spinner = true;
                $scope.confirm(true);
//                $("#img").attr("src", "https://idolscheduler.jp/img/gf_sample_thumb_comic.jpg");
//                alert("SwipeRight OK");
//                $scope.spinner = false;
            }
        };
        $scope.onPinchIn= function() {
            if($("#img").width() > window.innerWidth)
            {
                cls_page.pinch -= cls_page.scale_value;
                cls_page.pinch < 0 ? $("#img").height($("#img").height() + cls_page.pinch) : $("#img").height($("#img").height() - cls_page.pinch);                
                $("#img").width("auto");
            }
            else
            {
                $("#img").width(window.innerWidth);
                $("#img").height("auto");
            }
//            console.log(cls_page.pinch);
        };
        $scope.onPinchOut= function() {
            if($("#img").width() < cls_page.img_width)
            {
                cls_page.pinch += cls_page.scale_value;
                cls_page.pinch < 0 ? $("#img").height($("#img").height() - cls_page.pinch) : $("#img").height($("#img").height() + cls_page.pinch);
                $("#img").width("auto");
            }
            else
            {
                $("#img").width(cls_page.img_width);
                $("#img").height("auto");
            }
//            console.log(cls_page.pinch);
        };
        $scope.onDoubleTap= function() {
            if($("#img").width() < cls_page.img_width)
            {
                $('#img').animate({paddingRight:1},{
                    //0.2秒かけてアニメーション
                	duration:200,
                	//stepは、アニメーションが進むたびに呼ばれる
                	step:function(now){
                		//nowに現在のpadding-rightの値が渡してもらえる
                		//0から1に向かって変化していくnowを利用してscaleさせてみる
                		$(this).css({
//                            transform:'scale(' + (now+1) +')'
                                "height"    : (cls_page.img_height*(1+now)),
                                "width"     : "auto"
                        });
                        console.log(now);
                	},
                	//終わったら
                	complete:function(){
                		//次のために、元に戻しておく
                		$('#img').css('paddingRight', 0);
                	}
                });
            }
            else
            {
                $("#img").height((window.innerHeight - 60)+"px");
                $("#img").width("auto");
//                alert("onDoubleTap");
            }
        };
        $scope.onTap= function() {
            cls_page.menu_show ^= 1;
            $('#toolbar').css({
                "display"   : cls_page.menu_show === 1 ? 'block' : 'none',
                "opacity"   : cls_page.menu_show,
                "left"      : $('detect-area').position.left,
                "top"       : $('detect-area').position.top
            });
        };
        
        $scope.onPopPage= function()
        {
            cls_page.init_show = false;
//            app.slidingMenu.setMainPage('itemdetail.html', {closeMenu: true});
            myNavigator_1_1.popPage();
        };

        document.addEventListener("pageinit", function(e)
        {
            switch (e.target.id)
            {
                case "scale_test"   :
                    if(cls_page.init_show === true) break;

var page = myNavigator_1_1.getCurrentPage();
alert(page.options.param1);

                    cls_page.now_page    = 1;
                    cls_page.max_page    = 100;
                    cls_page.scale_value = 5;
                    cls_page.pinch       = 0;
                    cls_page.menu_show   = false;
                    $scope.spinner       = true;

//                    $('#detect-area').html('<img id="img" src="" width="auto">');

                    if(page.options.param1 === "value1")
                        $("#img").attr("src", "https://idolscheduler.jp/img/gf_sample_thumb_comic_3.jpg");
                    else
                        $("#img").attr("src", "https://idolscheduler.jp/img/gf_sample_thumb_comic.jpg");

                    cls_page.img_height = $("#img").height();
                    cls_page.img_width  = $("#img").width();
                    $('#img').css({
                        "width"         :   "auto",
                        "height"        :   (window.innerHeight - 60)+"px"
                    });

                    $('#img').bind("load", function(){
                        cls_page.img_height = this.naturalHeight;
                        cls_page.img_width  = this.naturalWidth;

                        $('#img').css({
                            "width"         :   "auto",
                            "height"        :   (window.innerHeight - 60)+"px"
                        });
                    });

                    cls_page.init_show  = true;
                    $scope.spinner      = false;

                    if(monaca.isIOS === true) $scope.start();
                    break;
            }
        }, false);
    });