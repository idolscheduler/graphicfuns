// This is a JavaScript file

    var message = false;
    var plus = 0;

    app.factory('Data', function()
    {
        var data = {};

        data.items = [
            {
                title       : '1「＃常夏女子希望!!!」新曲発売記念予約インストアイベント',
                description : '東京・その他23区 @アキバ☆ソフマップ1号店',
                date        : '2015年12月31日 23:59～',
                thumb       : 'https://idolscheduler.sakura.ne.jp/img/prof_idolcallege_150409.jpg',
                usercount   : '99',
                usersthumb  : 'http://pbs.twimg.com/profile_images/507452233089159168/FkC_JM7L_normal.png,http://pbs.twimg.com/profile_images/378800000030078097/0965a38a96e7415640c516d6a7a37ece_normal.jpeg,http://pbs.twimg.com/profile_images/558253085848383488/lLP7eoPf_normal.jpeg,http://pbs.twimg.com/profile_images/521673462436208640/srUkwjAa_normal.jpeg,http://pbs.twimg.com/profile_images/558146089803448321/xLpx28ZY_400x400.png,https://idolscheduler.sakura.ne.jp/img/img_chara_hol_3.png'
            },
            {
                title       : '2「＃常夏女子希望!!!」新曲発売記念予約インストアイベント',
                description : '東京・その他23区 @アキバ☆ソフマップ1号店',
                date        : '2015年12月31日 23:59～',
                thumb       : 'https://idolscheduler.sakura.ne.jp/img/prof_idolcallege_150409.jpg',
                usercount   : '99',
                usersthumb  : 'http://pbs.twimg.com/profile_images/507452233089159168/FkC_JM7L_normal.png,http://pbs.twimg.com/profile_images/378800000030078097/0965a38a96e7415640c516d6a7a37ece_normal.jpeg,http://pbs.twimg.com/profile_images/558253085848383488/lLP7eoPf_normal.jpeg,http://pbs.twimg.com/profile_images/521673462436208640/srUkwjAa_normal.jpeg,http://pbs.twimg.com/profile_images/558146089803448321/xLpx28ZY_400x400.png,https://idolscheduler.sakura.ne.jp/img/img_chara_hol_3.png'
            }
        ]; 

        return data;
    });

    app.directive('lazy', function($timeout) {
        return {
            restrict: 'C',
            link: function (scope, elm) {
                $timeout(function() {
                    $(elm).lazyload({
                        effect: 'fadeIn',
                        effectspeed: 500,
                        'skip_invisible': false,
                        placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
                    });
                }, 0);
            }
        };
    });

    //ng-controller属性で指定した文字列
    module.controller('PageController', function ($scope, Data)
    {
        $scope.data2 = [];

        ons.ready(function ()
        {
//            alert(message);

            $.getJSON(
                'https://idolscheduler.sakura.ne.jp/app/Checkin_GetData.php?page=1',
                function(json)
                {
                    for(var i=0;i<json.length;i++)
                    {
                        $scope.data2.push(json[i]);

//                        var images = $scope.data2[i].userthumb.split(",");
//                        $scope.data2[i].userthumb = [];
//                        for(var j=0;j<images.length;j++)
                        {
//                            $scope.data2[i].userthumb.push({id: '0', img: json[i].userthumb});
                        }
                    }
                }
            );

            $.getJSON(
                'https://idolscheduler.sakura.ne.jp/app/Common_DaySlider_SetData.php',
                function(json)
                {
                    var len = json.length;
                    for(var i=0; i < len; i++)
                    {
                        $('#daynav_ul').html(json[i].contents);
                        $('#daynav_ul').css({
                            position: "",
                            top: ""
                        });
                    }

                    var obj = $("#daynav").contents();
                    $(obj).scrollLeft( $(".navtoday",obj).offset().left - ( $(window).width()/2 - 35 ) );

                    $scope.init_show = true;
                }
            );

//            message = "aaa";
        });
        
        $scope.pushb = {
            init_postpop: function()
            {
//                alert('myNavigator postpop');
//                app.slidingMenu.setMainPage('page1.html', {closeMenu: true});
            },
            init_prepop: function()
            {
//                alert('myNavigator prepop');
//                $scope.init_show = false;
            }
        };

        $scope.MyDelegate = {

            calculateItemHeight: function(index) {
                return 178;
            },
            countItems: function() {
                return 2000;
            },
            configureItemScope: function(index, itemScope)
            {
                var index_item = parseFloat(index);

                if(!itemScope.item && !$scope.data2[index] && Math.floor(index_item%10) == 0 && index > 9)
                {
                    $.getJSON(
                        'https://idolscheduler.sakura.ne.jp/app/Checkin_GetData.php?page='+Math.floor(index_item/10+1),
                        function(json)
                        {
                            for(var i=index_item;i<index_item+json.length;i++)
                            {
                                $scope.data2.push(json[i]);

//                                var images = $scope.data2[i].userthumb.split(",");
//                                $scope.data2[i].userthumb = [];
//                                for(var j=0;j<images.length;j++)
                                {
//                                    $scope.data2[i].userthumb.push({id: '0', img: json[i-index].userthumb});//images[j]});
                                }
                            }
                        }
                    );
//                    plus = -1;
                }

                if (!itemScope.item && $scope.data2[index])
                {
//                    itemScope.item = Data.items[index];
                    itemScope.item = $scope.data2[index];
console.log('Add item with index: ' + index);

//                    if( $("img.lazy"+itemScope.item.sid).attr('data-original') != $("img.lazy"+itemScope.item.sid).attr('src') )
                        $("img.lazy"+itemScope.item.sid).show().lazyload({ effect : "fadeIn", effectspeed: 500, 'skip_invisible': false, placeholder     : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" });
                }
            },

            destroyItemScope: function(index, itemScope)
            {
                // Optional method that is called when an item is unloaded.
                console.log('Destroyed item with index: ' + index);
            }
        };    
    });

    //ng-controller属性で指定した文字列
    module.controller('Search_Controller', function ($scope)
    {
        ons.ready(function ()
        {
            if(monaca.isIOS === true)
            {
                 $('#label_date').text("日付を指定して検索");
                 $('#date').get(0).type = 'date';
            }
            else
            {
                $.datepicker.setDefaults({ showButtonPanel: 'true' });
                $.datepicker.setDefaults($.datepicker.regional["ja"]);
                $("#date").datepicker({ dateFormat: "yy/mm/dd" });
            }

//            alert(message);
        });

        $scope.main = {
            doSearch: function()
            {
              alert("You searched for: " + $scope.main.toSearch);
//              message = $scope.main.toSearch;
            },
            toSearch: ''
        };
    });

    document.addEventListener("pageinit", function(e)
    {
        if (e.target.id == "page_1")
        {
//            alert("page1 loading");
        }
    }, false);

    $(document).on('ons-navigator:init', '#my-navigator', function(event)
    {
//       var navigator = event.component;
//       navigator.pushPage('login.html');
    });

    $(document).on('ons-navigator:postpop', '#my-navigator', function(event)
    {
//        alert('myNavigator postpop');
    });

    function pusha(value)
    {
        message = value;
        myNavigator.pushPage('search.html', {animation: 'lift'});
    }