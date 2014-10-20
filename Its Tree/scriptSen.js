// defines the chart's height and width
var   w = 1000,
      h = 1000;

// defines the diameter of each tree node
var circleWidth = 5;


// defines the palette
var palette = {
      "lightgray": "#819090",
      "gray": "#708284",
      "mediumgray": "#536870",
      
      "darkgray": "#475B62",

      "darkblue": "#0A2933",
      "darkerblue": "#042029",

      "paleryellow": "#FCF4DC",
      "paleyellow": "#EAE3CB",
      "yellow": "#A57706",
      "orange": "#BD3613",
      "red": "#D11C24",
      "pink": "#C61C6F",
      "purple": "#595AB7",
      "blue": "#2176C7",
      "green": "#259286",
      "yellowgreen": "#738A05"
  }

/* nodes is an array of key-value pairs, 
   where name specifies the name of the node
   as given by its tier in the tree. Target
   specifies the index of the parent of the
   given node, as if the tree were printed
   into a level-order representation. The
   parent node is index 0, 2nd tier node on
   the left is index 1, etc. 
*/
var nodes = [
      { name: "Parent Concept"},
      { name: "2nd Parent Concept", target: [0]},
      { name: "2nd Tier", target: [0]},
      { name: "2nd Tier", target: [0]},
      { name: "3rd Tier", target: [2]},
      { name: "3rd Tier", target: [2]},
      { name: "3rd Tier", target: [3]},
      { name: "3rd Tier", target: [3]},
      { name: "4th Tier", target: [4]},
      { name: "4th Tier", target: [4]},
      { name: "4th Tier", target: [5]},
      { name: "4th Tier", target: [5]},
      { name: "4th Tier", target: [6]},
      { name: "4th Tier", target: [6]},
      { name: "4th Tier", target: [7]},
      { name: "4th Tier", target: [7]}
];

var links = [];

/* links is an array of key-value pairs,
   where source specifies the node, and
   target specifies a node that is
   pointing to it. So, there are 3 parent
   concept entries, where Parent Concept
   is the key and their values are 2nd
   Parent Concept, 2nd Tier, and 2nd
   Tier.
*/
for (var i = 0; i< nodes.length; i++) {
      if (nodes[i].target !== undefined) {
            for (var x = 0; x< nodes[i].target.length; x++ ) {
		console.log(nodes[i]);
                  links.push({
                        source: nodes[i],
                        target: nodes[nodes[i].target[x]]
                  })
            }
      }
}

/* D3 syntax is akin to that of JQuery.
   Here it selects the ID "chart" and
   adds an svg element with width and
   height of 1000.
*/
var myChart = d3.select('#chart')
		.append('svg')
		.attr('width', w)
		.attr('height', h)

/* Constructs a new force-directed layout.
   Gives it a height and width of 1000.
   Passes in the nodes array with nodes
   having several attributes: x and y
   coordinates, the coordinates of the
   previous node position, and a fixed
   property.
   The links property sets the layout's
   associated links to the specified
   array (nodes).
   Gravity and charge are responsible
   for keeping the tree within the given
   height and width of 1000.
*/
var force = d3.layout.force()
	.size([w, h])
	.nodes(nodes)
	.links([])
	.gravity(0.1)
	.charge(-1000)

/* Adds lines between each node using the
   links array and colors them gray.
*/
var link = myChart.selectAll('line')
	.data(links).enter().append('line')
	.attr('stroke', palette.gray)

/* Selects every circle and performs some
   unknown function. Explain this pls
*/
var node = myChart.selectAll('circle')
	.data(nodes).enter()
	.append('g')
	.call(force.drag);

/* Draws the nodes, giving them position,
   radius, and color.
*/
node.append('circle')
	.attr('cx', function(d, i) { 
        return d.x;
        })
	.attr('cy', function(d, i) {
        return d.y;
        })
	.attr('r', circleWidth )
	.attr('fill', function(d, i) {
        if (i <= 1) { return palette.blue}
        else if (i == 2 && i == 3) {return palette.pink}
        else if (i >= 4 && i < 8) { return palette.red}
        else { return palette.yellow}
	})

/* Draws the text, giving it position
   and color.
*/
node.append('text')
	.text(function(d) { return d.name})
	.attr('font-family', 'Roboto Slab')
	.attr('fill', function(d, i) {
		if (i<=1) { return palette.blue}
		else if (i == 2 && i == 3) {return palette.pink}
        else if (i >= 4 && i < 8) { return palette.red}
        else { return palette.yellow}
	})
	.attr('x', function(d, i) {
		if (i>0) { return circleWidth + 4 }
		else { return circleWidth -15 }
	})
	.attr('y', function(d, i) {
		if (i>0) { return circleWidth }
		else { return 8 }
	})
	.attr('text-anchor', function(d, i) {
		if (i>0) { return 'beginning' }
		else { return 'end'}
	})
	/* .attr('font-size',  function(d, i) {
		if (i>0) { return '1em' }
		else { return '1.8em'}
	})
 */

/* Receives tick events from the force layout.
   Moves the nodes to their appropriate
   positions. 
*/
force.on('tick', function(e) {
	node.attr('transform', function(d, i) {
        d.fixed = true;
        if (i == 0) d.x = 500;
        if (i == 1) d.x = 750;

        if (i == 2)  d.x = 300;
        if (i == 3)  d.x = 700;
        
        if (i == 4)  d.x = 200;
        if (i == 5)  d.x = 400;
        if (i == 6)  d.x = 600;
        if (i == 7)  d.x = 800;
        
        if (i == 8)  d.x = 150;
        if (i == 9)  d.x = 250;
        if (i == 10)  d.x = 350;
        if (i == 11)  d.x = 450;
        if (i == 12)  d.x = 550;
        if (i == 13)  d.x = 650;
        if (i == 14)  d.x = 750;
        if (i == 15)  d.x = 850;
        
        if (i == 0)  d.y = 200;
        if (i == 1)  d.y = 200;
        
        if (i == 2)  d.y = 400;
        if (i == 3)  d.y = 400;
        
        if (i == 4)  d.y = 600;
        if (i == 5)  d.y = 600;
        if (i == 6)  d.y = 600;
        if (i == 7)  d.y = 600;
        
        if (i == 8)  d.y = 800;
        if (i == 9)  d.y = 800;
        if (i == 10)  d.y = 800;
        if (i == 11)  d.y = 800;
        if (i == 12)  d.y = 800;
        if (i == 13)  d.y = 800;
        if (i == 14)  d.y = 800;
        if (i == 15)  d.y = 800;
		return 'translate('+ d.x +', '+ d.y +')';
	})

	link
		.attr('x1', function(d) { return d.source.x })
		.attr('y1', function(d) { return d.source.y })
		.attr('x2', function(d) { return d.target.x })
		.attr('y2', function(d) { return d.target.y })
})

/* Initializes everything.
*/
force.start();

