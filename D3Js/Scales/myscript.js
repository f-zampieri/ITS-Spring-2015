
// http://stackoverflow.com/questions/962802#962890
function shuffle(array) {
  var tmp, current, top = array.length;
  if(top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}



var main = function(){
	plot_graph('#first');	
	plot_graph('#second');
	plot_graph('#third');	
	plot_graph('#forth');
	plot_graph('#fifth');	
	plot_graph('#sixth');
	plot_graph('#seventh');	
	plot_graph('#eighth');
}

var plot_graph = function(input_div){
	//dealing with the strange values that might be in the data. so if we have 600, the thing will not scale well. This is where scaling helps

		var height = 500
		var width = 500


		for (var a=[],i=0;i<7;++i) a[i]=i;

		data_points = shuffle(a);


		var widthScale = d3.scale.linear()
						.domain([0, Math.max.apply(null, data_points) ])
						.range([0, width]);
//what is super cool about scaling is that you can scale with colors as well
		var colorScale = d3.scale.linear()
							.domain([0, Math.max.apply(null, data_points)])
							.range(['blue', 'red']);

//adding the axis 
	
			
		var axis = d3.svg.axis()
					.scale(widthScale);
		
		if (input_div === '.second'){
			axis.ticks(5)
		}

		var canvas = d3.select(input_div)
								.append('svg')
								.attr('width', width)
								.attr('height', height)
								.append('g')
								.attr('transform', 'translate(20, 0)');


// the enter method contains place holders for each and every place holder element

		var bars = canvas.selectAll('rect')
					.data(data_points)
					.enter()
						.append('rect')
						.attr('width', function(d){
							return widthScale(d);
						})
						.attr('height', 50)
						.attr('y', function(d, i){
							return i * 100;
						})
						.attr('fill', function(d){
							return colorScale(d);
						});


		canvas.append('g')
				.attr("transform", "translate(0, 450)")
				.call(axis)

}
$(document).ready(main);