jQuery(document).ready(function() {
    // TimerCircles!
	// $("#timers-area").TimeCircles({
 //        time:{
 //            Seconds: { color: '#0FF' },
 //            Minutes: { color: '#0FF' },
 //            Hours: { "show": false },
 //            Days: { "show": false }
 //        },
 //        refresh_interval: 0.0001,
 //        total_duration: 5 * 60
 //    }).addListener(
 //        function(unit, value, total) {
 //            if (value == 5 * 60) {
 //                alert("You have spent more than 5 minutes on this problem.\nIt is recommended you continue.");
 //            }
 //    }, "visible");
    jQuery('.tabs-area .tab-links a').on('click', function(e)  {
        var currentAttrValue = jQuery(this).attr('href');

        // Show/Hide Tabs
        jQuery('.tabs-area ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active-tab').siblings().removeClass('active-tab');


        e.preventDefault();
    });
});