var main = function(){

	element_number = 0
	plot_graph('#first');	
	plot_graph('#second');
	plot_graph('#third');	
	plot_graph('#forth');
	plot_graph('#fifth');	
	plot_graph('#sixth');
	plot_graph('#seventh');	
	plot_graph('#eighth');

	$(document).scroll(function() {
		var toCallOn = "added" + element_number.toString();
		console.log(toCallOn);
		$('<div />', { class: 'graph', id: toCallOn}).appendTo('body');
		toCallOn = "#" + "added" + element_number.toString();
		plot_graph(toCallOn);
		element_number += 1;

	});

}

function plot_graph(element_id){
	console.log("to be plotted on ", element_id);
	var width = 300;
		var height = 300;
		var canvas = d3.select(element_id)
						.append('svg')
						.attr('width', width)
						.attr('height', height);


		var group = canvas.append('g')
					.attr('transform','translate(100, 100)');

		//this is a path generator and this will translate the data to the path data string
		
		var r = 50;
		var arc = d3.svg.arc()
						.innerRadius(Math.random() * 50)
						.outerRadius(Math.random() * 100)
						.startAngle(Math.random() * Math.PI + 0.01)
						.endAngle(Math.random() * Math.PI * 2 + Math.PI);
						
		group.append('path')
			.attr('d', arc)
			.attr('fill', function() {
    return "hsl(" + Math.random() * 360 + ",100%,50%)";
    });

}



$(document).ready(main);