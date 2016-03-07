// This is a JavaScript file

    app.factory('Data', function()
    {
        var data = {};

        data.items = [
            {
                title       : '1「＃常夏女子希望!!!」新曲発売記念予約インストアイベント'
            }
        ];

        return data;
    });

    //ng-controller属性で指定した文字列
    module.controller('PageController1_1', function ($scope, $timeout, Data)
    {
        $scope.isLoading = false;
        $scope.isPage    = 1;
        $scope.maxPage   = 0;
        $scope.headmenu  = [{text:"おすすめ作品"}, {text:"新着"}, {text:"話題作"}, {text:"ジャンル別"}, {text:"作者別"}, {text:"年代別"}, {text:"無料作品"}];

        ons.ready(function ()
        {
/*
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

            $.getJSON(
                'https://idolscheduler.sakura.ne.jp/app/Checkin_GetData.php?page=1',
                function(json)
                {
                    var len = json.length;
                    for(var i=0; i < len; i++)
                    {
                        $('#checkin_body').html(json[i].contents);
                        $('#checkin_body').css({
                            'text-align': 'left'
                        });
                        $(".lazy1").show().lazyload({ effect : "fadeIn", event: "scrollstop", effectspeed : 500, threshold : 20, placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" });
                    }
                    $scope.maxPage = json[0].max_page;
                }
            );
*/
            $scope.isPage = 2;

//            alert(Data.items[0].title2);
        });

        $scope.pushb_1_1 = {
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

        $scope.populateList = function()
        {
            if($scope.isLoading) return;

            $timeout(function()
            {
                if($scope.isPage > 1 && $scope.maxPage >= $scope.isPage)
                {
                    $.getJSON('https://idolscheduler.sakura.ne.jp/app/Checkin_GetData.php?page='+$scope.isPage,
                        function(json)
                        {
                            var len         = json.length;
                            var json_enable = false;

                            for(var i=0; i < len; i++)
                            {
                                if(json[i].contents !== null)
                                {
                                    $('#checkin_body').append(json[i].contents);
                                    $(".lazy"+$scope.isPage).show().lazyload({ effect : "fadeIn", event: "scrollstop", effectspeed : 1500, threshold : 400, placeholder : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC" });
                                    json_enable = true;
                                }
                            }

                            if(json_enable)
                            {
                                console.log('isPage :' + $scope.isPage);
                                $scope.isPage++;

                                if($scope.maxPage == $scope.isPage-1) $scope.isLoading = false;
                            }
                        }
                    );
                }

//                console.log('isLoading :false');
//                $scope.isLoading = false;

            }, 1000);

            $timeout(function()
            {
                if($scope.maxPage != $scope.isPage-1) $scope.isLoading = true;
            });
        }
        
        $scope.canWeLoadMoreContent = function()
        {
            return true;
        }
    });
    
    //ng-controller属性で指定した文字列
    module.controller('Search_Controller', function ($scope)
    {
        ons.ready(function ()
        {
//            if(monaca.isIOS === true)
            {
                 $('#label_date').text("日付を指定して検索");
                 $('#date').get(0).type = 'date';
            }
//            else
            {
//                $.datepicker.setDefaults({ showButtonPanel: 'true' });
//                $.datepicker.setDefaults($.datepicker.regional["ja"]);
//                $("#date").datepicker({ dateFormat: "yy/mm/dd" });
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
        switch (e.target.id)
        {
//            case "page_1"       : alert("page1 loading"); break;
//            case "search-page"  : alert("search-page loading"); break;
        }
    }, false);

    $(document).on('ons-navigator:init', '#my-navigator1_1', function(event)
    {
//       var navigator = event.component;
//       navigator.pushPage('login.html');
    });

    $(document).on('ons-navigator:postpop', '#my-navigator1_1', function(event)
    {
//        alert('myNavigator postpop');
    });

    function pusha(value)
    {
        message = value;
        myNavigator_1_1.pushPage('search.html', {animation: 'lift'});
    }