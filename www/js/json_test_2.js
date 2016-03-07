// This is a JavaScript file

    //ng-controller属性で指定した文字列
    module.controller('PageController2', function ($scope, Data)
    {
        ons.ready(function ()
        {
            Data.items[0].title2 = 'PageController2';
            alert(Data.items[0].title2);
        });
    });