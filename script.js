d3.json("file.json", function(error, json){

var currentBranch = 0;
var currentQuestion = 0;
var currentAnswer = "";
var wrong = -1;
var records = [];

var   w = 250,
      h = 250;
var circleWidth = 12;
var tooltip = d3.select('#tree').append('div')
        .style('position', 'absolute')
        .style('padding', '0 15px')
        .style('background', 'pink')    
    .style('font-weight', 'bold');

var question = d3.select("#question-content").append('tspan');
var answer = d3.select("#answer-content").append('tspan');

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
var nodes = [];
nodes = setNodeData(json.branch[currentBranch]);
function setNodeData(branch){
  //console.log(branch);
var nodes = [
      { name: "1st Parent ", ndx: 0, questionID: branch[0]},
      { name: "2nd Parent ", target: [0], questionID: "Next Branch"},
      { name: "2nd Tier", ndx: 2, target: [0], questionID: branch[1]},
      { name: "2nd Tier", ndx: 3, target: [0], questionID: branch[2]},
      { name: "3rd Tier", ndx: 4, target: [2], questionID: branch[3]},
      { name: "3rd Tier", ndx: 5, target: [2], questionID: branch[4]},
      { name: "3rd Tier", ndx: 6, target: [3], questionID: branch[5]},
      { name: "3rd Tier", ndx: 7, target: [3], questionID: branch[6]},
      { name: "4th Tier", ndx: 8, target: [4], questionID: branch[7]},
      { name: "4th Tier", ndx: 9, target: [4], questionID: branch[8]},
      { name: "4th Tier", ndx: 10, target: [5], questionID: branch[9]},
      { name: "4th Tier", ndx: 11, target: [5], questionID: branch[10]},
      { name: "4th Tier", ndx: 12, target: [6], questionID: branch[11]},
      { name: "4th Tier", ndx: 13, target: [6], questionID: branch[12]},
      { name: "4th Tier", ndx: 14, target: [7], questionID: branch[13]},
      { name: "4th Tier", ndx: 15, target: [7], questionID: branch[14]}
];
  return nodes;
}

var nextB = d3.select('#next-branch');

nextB.on('click', function(){
  if (document.getElementById("manual").checked == true) {
    currentQuestion = 0;
    currentBranch++;
    nodes = setNodeData(json.branch[currentBranch]);
    //debugger;
    node.data(nodes);
    qID = nodes[0].questionID;
    question.property("value", json.question[qID].question);
    tooltip.html(json.question[qID].concept_name);
    question.html(json.question[qID].question);
    updatePosition();
  }
});

var links = [];

for (var i = 0; i< nodes.length; i++) {
      if (nodes[i].target !== undefined) {
            for (var x = 0; x< nodes[i].target.length; x++ ) {
                  links.push({
                        source: nodes[i],
                        target: nodes[nodes[i].target[x]]
                  })
            }
      }
}

var myTree = d3.select('#tree')
    .append('svg')
    .attr('width', w)
    .attr('height', h)

var force = d3.layout.force()
  .size([w, h])
  .nodes(nodes)
  .links([])

var link = myTree.selectAll('line')
  .data(links).enter().append('line')
  .attr('stroke', palette.gray)

var node = myTree.selectAll('circle')
  .data(nodes).enter()
  .append('g');

node.append('circle')
  .attr('cx', function(d, i) { 
        return d.x;
        })
  .attr('cy', function(d, i) {
        return d.y;
        })
  .attr('r', function(d) {
    if (currentQuestion == d.ndx) return circleWidth*2;
    return circleWidth;
    })
  .attr('fill', function(d, i) {
        if (i <= 1) { return palette.blue}
        else if (i == 2 || i == 3) {return palette.green}
        else if (i >= 4 && i < 8) { return palette.red}
        else { return palette.yellow}
  })
  .style('opacity', function(d){
    if (d.ndx == currentQuestion) return .5;
    return 1;
  })

function updatePosition(){
  node.select("circle")
  .attr('r', function(d){
    if (d.ndx == currentQuestion) return circleWidth*2;
    return circleWidth;
  })
  .style('opacity', function(d){
    if (d.ndx == currentQuestion) return .5;
    return 1;
  })

}

var tempColor;
//console.log(nodes);
force.on('tick', function(e) {

  node
  .attr('transform', function(d, i) {
        d.fixed = true;
        if (i == 0) d.x = 250;
        if (i == 1) d.x = 375;

        if (i == 2)  d.x = 150;
        if (i == 3)  d.x = 350;
        
        if (i == 4)  d.x = 100;
        if (i == 5)  d.x = 200;
        if (i == 6)  d.x = 300;
        if (i == 7)  d.x = 400;
        
        if (i == 8)  d.x = 75;
        if (i == 9)  d.x = 125;
        if (i == 10)  d.x = 175;
        if (i == 11)  d.x = 225;
        if (i == 12)  d.x = 275;
        if (i == 13)  d.x = 325;
        if (i == 14)  d.x = 375;
        if (i == 15)  d.x = 425;
        
        if (i == 0)  d.y = 100;
        if (i == 1)  d.y = 100;
        
        if (i == 2)  d.y = 200;
        if (i == 3)  d.y = 200;
        
        if (i == 4)  d.y = 300;
        if (i == 5)  d.y = 300;
        if (i == 6)  d.y = 300;
        if (i == 7)  d.y = 300;
        
        if (i == 8)  d.y = 400;
        if (i == 9)  d.y = 400;
        if (i == 10)  d.y = 400;
        if (i == 11)  d.y = 400;
        if (i == 12)  d.y = 400;
        if (i == 13)  d.y = 400;
        if (i == 14)  d.y = 400;
        if (i == 15)  d.y = 400;
    d.y = d.y/2;
    d.x = d.x/2;
    return 'translate('+ d.x +', '+ d.y +')';
  })
  .on('mouseover', function(d){
    //debugger;
    //d.circle.r = circleWidth * 2
    tooltip.transition()
            .style('opacity', 0.9)
    tempColor = this.style.fill;
        //console.log(d.questionID);
    if (document.getElementById("manual").checked == true) {
      tooltip.html(json.question[d.questionID].concept_name);
      question.html(function(){return json.question[d.questionID].question});
      question.property("value", json.question[d.questionID].question);
      answer.html(function(){return json.question[d.questionID].answers});
      question.property("value", json.question[d.questionID].answers);
      // start Francisco's code
      currentQuestion = d.ndx;
      updatePosition();
      currentAnswer = json.question[nodes[currentQuestion].questionID].answers;
      console.log(currentAnswer);
      if (currentQuestion == 0) {
        tooltip.html(json.question[nodes[0].questionID].concept_name);
        question.html(json.question[nodes[0].questionID].question);
        question.property("value", json.question[nodes[0].questionID].question);
      }
    }
  })
  link
    .attr('x1', function(d) { return d.source.x })
    .attr('y1', function(d) { return d.source.y })
    .attr('x2', function(d) { return d.target.x })
    .attr('y2', function(d) { return d.target.y })
})

/*
The way my code works is as follows: if no node has been
moused over yet and the user clicks next question, it selects
the first question in the tree. Clicking next question will
cycle through the nodes of the tree in a level-order fashion.
If it reaches the last node in the tree and the user
continues clicking next question, then it will remain on the
last node of the tree.
*/
var nextQ = d3.select("#next-question");
var qID = nodes[0].questionID;

function nextQFunc() {
  currentQuestion++;
  if (currentQuestion == 1) currentQuestion++;
  if (currentQuestion > 15) {
    currentQuestion = 0;
    currentBranch++;
    nodes = setNodeData(json.branch[currentBranch]); 
    node.data(nodes);
  }
  currentAnswer = json.question[nodes[currentQuestion].questionID].answers;
 // console.log("next question " + currentAnswer);
  qID = nodes[currentQuestion].questionID;
  answer.html(json.question[qID].answers);
  question.html(json.question[qID].question);
  tooltip.html(json.question[qID].concept_name);
}

nextQ.on('click', function() {
  if (document.getElementById("manual").checked == true) {
    nextQFunc();
    updatePosition();
  }
});

var prevQ = d3.select("#pre-question");
function prevQFunc() {
  currentQuestion--;
  //on start
  if (currentBranch == 0 && currentQuestion == -1){
    currentQuestion++;
  }
  //avoid the dump question 
  if (currentQuestion == 1) {
    currentQuestion = 0;
  }
  //from previous branch
  if (currentQuestion < 0 && currentBranch > 0) {
    currentQuestion = 15;
    currentBranch--;
    nodes = setNodeData(json.branch[currentBranch]); 
    node.data(nodes);
  } 
   currentAnswer = json.question[nodes[currentQuestion].questionID].answers;
   qID = nodes[currentQuestion].questionID;
   answer.html(json.question[qID].answers);
   question.html(json.question[qID].question);
   tooltip.html(json.question[qID].concept_name);
}

prevQ.on('click', function() {
  if (document.getElementById("manual").checked == true) {
    prevQFunc();
    updatePosition();
  }
});

var submitB = d3.select("#submit");
submitB.on('click', function() {
     //console.log("current question is from submit" + currentQuestion);
    currentAnswer = json.question[nodes[currentQuestion].questionID].answers;    

  console.log(currentAnswer);
  if (currentAnswer == currentAnswer*wrong){
    //records.append("right");
    records += " right";
  } else {
    //records.append("wrong");
    records += " wrong";
  }
  wrong = wrong * -1;
  nextQFunc();
  updatePosition();
   //console.log("current question is from after" + currentQuestion);
  console.log(records);
});



force.start();
})

