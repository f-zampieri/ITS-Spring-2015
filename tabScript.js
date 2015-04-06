jQuery(document).ready(function() {
    // TimerCircles!
	$("#stats-area").TimeCircles({
        time:{
            Seconds: { color: '#0FF' },
            Minutes: { color: '#0FF' },
            Hours: { "show": false },
            Days: { "show": false }
        },
        refresh_interval: 0.0001
    }); 
	console.log("READY FOR CLICKING");
    jQuery('.tabs-area .tab-links a').on('click', function(e)  {
    	console.log("CLICKED");
        var currentAttrValue = jQuery(this).attr('href');
 		console.log(currentAttrValue);
        // Show/Hide Tabs
        jQuery('.tabs-area ' + currentAttrValue).show().siblings().hide();
 
        // Change/remove current tab to active
        jQuery(this).parent('li').addClass('active-tab').siblings().removeClass('active-tab');


        e.preventDefault();
    });
});