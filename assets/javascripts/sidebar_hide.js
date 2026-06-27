function setCookie(c_name, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value = escape(value) + ((exdays == null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value + ";path=/";
}

function getCookie(c_name) {
    var i;
    var x;
    var y;
    var ARRcookies = document.cookie.split(";");
    for (i = 0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == c_name)
            return unescape(y);
    }
}

function hideSideBar()
{
    if ($('#sidebar').is(':visible')) {
        $('#sidebar').addClass('sidebar_hidden');
        $('#content').addClass('sidebar_hidden');
        $('#hideSidebarButton').addClass('sidebar_hidden');
        setCookie('sidebar_hide', 'hide', 100);
    } else {
        $('#sidebar').removeClass('sidebar_hidden');
        $('#content').removeClass('sidebar_hidden');
        $('#hideSidebarButton').removeClass('sidebar_hidden');
        setCookie('sidebar_hide', 'show', 100);
    }
}

$(function() {
    if ($('#main').hasClass('collapsiblesidebar')) {
        // Redmine 6+: a built-in collapsible sidebar is present
        // (#sidebar-switch-button / collapsibleSidebar jQuery plugin).
        // Our own toggle button is not rendered (_hideButton_partial.html.erb).
        // Mirror clicks on the native button back into the cookie so the server-side
        // partial can read the preference on the next page load.
        $('#sidebar-switch-button').on('click.sidebar_hide', function() {
            // The collapsibleSidebar handler toggles 'collapsedsidebar' synchronously;
            // use setTimeout(0) to read the class after all synchronous handlers fire.
            setTimeout(function() {
                setCookie('sidebar_hide', $('#main').hasClass('collapsedsidebar') ? 'hide' : 'show', 100);
            }, 0);
        });
    } else {
        // classic behaviour for Redmine 5
        // No native collapsible sidebar: move context-menu into #main
        $('#context-menu').appendTo('#main');
    }
});
