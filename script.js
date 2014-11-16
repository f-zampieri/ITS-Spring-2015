d3.json("file.json", function(error, json){


/*
  TO DO LIST
  1. CLEAN UP CODE: modularize code as much you can 
    check reduntent code and raw scripts then mododularize them into functions
  2. FINISH STAT TABLE(this table should update in real time)
    this table should have the following:
    (1) total socre and the score within a branch level.
    (2) # of attemped and corrected questions for each tiers
*/

// things to be kept track of
var currentBranch = 0;
var currentQuestion = 0;
var currentAnswer = "";
var currentScore = 0;
var sumScore = 0;

// constants
var T1 = 6.25;
var T2 = 3.125;
var T3 = 1.5625;
var T4 = .78125;
var wrong = -1;
var records = [];
var MAX_SCORE = 6.25;
var   w = 250,
      h = 250;
var circleWidth = 12;

function isAutoMode(){
  return !document.getElementById("manual").checked;
}
var modes = d3.selectAll("input[name = mode]");
modes.on('change', function(){
  if(isAutoMode()){
     d3.select('#ProgressBars').attr('style', "display: block;");
   } else{
    d3.select('#ProgressBars').attr('style', "display: none;");
   }
})

function updateProgress(){
    d3.select('#totalProgress').attr('value', currentBranch+1);
    d3.select('#subProgress').attr('value', currentScore);
}

function getBasesName(){
  var names = [];
  var index;
  var cName;
  var qid;
  for (var i = 0; i < 16; i++){
    index = i;
    qid = json.branch[i][0]
    cName = json.question[qid].concept_name
    names.push(index + "_" + cName);
  }
  return names;
}
var menuSelect = d3.select("#menuSelect");
  menuSelect.selectAll('option')
  .data(getBasesName()).enter()
  .append("option")
  .attr('value', function(d){
    return d.split("_")[0];
  })
  .text(function(d) { 
    return d.split("_")[1];
  });

menuSelect.on('change', function(){
  currentBranch = this.options[this.selectedIndex].value;
  updateBranch();
})




var tooltip = d3.select('#tooltip').append('div')
        .style('position', 'absolute')
        .style('padding', '0 15px')
        .style('background', 'pink')    
        .style('font-weight', 'bold');

var score = d3.select('#score').append('div')
        .style('position', 'absolute')
        .style('padding', '0 15px')
        .style('background', 'pink')    
        .style('font-weight', 'bold');
var totalScore = d3.select('#totalScore').append('div')
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
nodes = setNodeData(currentBranch);

function setNodeData(branchID){
var branch = json.branch[branchID];
var nodes = [
      { name: "1st Parent ", ndx: 0, score: T1, color: palette.gray, questionID: branch[0]},
      { name: "2nd Tier", ndx: 1, score: T2, color: palette.gray, target: [0], questionID: branch[1]},
      { name: "2nd Tier", ndx: 2, score: T2, color: palette.gray, target: [0], questionID: branch[2]},
      { name: "3rd Tier", ndx: 3, score: T3, color: palette.gray, target: [1], questionID: branch[3]},
      { name: "3rd Tier", ndx: 4, score: T3, color: palette.gray, target: [1], questionID: branch[4]},
      { name: "3rd Tier", ndx: 5, score: T3, color: palette.gray, target: [2], questionID: branch[5]},
      { name: "3rd Tier", ndx: 6, score: T3, color: palette.gray, target: [2], questionID: branch[6]},
      { name: "4th Tier", ndx: 7, score: T4, color: palette.gray, target: [3], questionID: branch[7]},
      { name: "4th Tier", ndx: 8, score: T4, color: palette.gray, target: [3], questionID: branch[8]},
      { name: "4th Tier", ndx: 9, score:T4, color: palette.gray, target: [4], questionID: branch[9]},
      { name: "4th Tier", ndx: 10, score:T4, color: palette.gray, target: [4], questionID: branch[10]},
      { name: "4th Tier", ndx: 11, score:T4, color: palette.gray, target: [5], questionID: branch[11]},
      { name: "4th Tier", ndx: 12, score:T4, color: palette.gray, target: [5], questionID: branch[12]},
      { name: "4th Tier", ndx: 13, score:T4, color: palette.gray, target: [6], questionID: branch[13]},
      { name: "4th Tier", ndx: 14, score:T4, color: palette.gray, target: [6], questionID: branch[14]}
];
  return nodes;
}
var nextB = d3.select('#next-branch');

nextB.on('click', function() {
  currentBranch++;
  updateBranch();
});

function updateBranch(){
  currentQuestion = 0;
  document.getElementById("menuSelect").selectedIndex = currentBranch;
  nodes = setNodeData(currentBranch);
    node.data(nodes);
    node.select("circle")
      .attr('fill', function(d) {
        return palette.gray;
      });
    updateQ();
    updatePosition();
}

var links = [];

for (var i = 0; i < nodes.length; i++) {
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
  .attr('fill', function(d) {
      return d.color;
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
        // if (i == 16) d.x = 375;
        // if (i == 15) d.x = 125;

        if (i == 1)  d.x = 150;
        if (i == 2)  d.x = 350;
        
        if (i == 3)  d.x = 100;
        if (i == 4)  d.x = 200;
        if (i == 5)  d.x = 300;
        if (i == 6)  d.x = 400;
        
        if (i == 7)  d.x = 75;
        if (i == 8)  d.x = 125;
        if (i == 9)  d.x = 175;
        if (i == 10)  d.x = 225;
        if (i == 11)  d.x = 275;
        if (i == 12)  d.x = 325;
        if (i == 13)  d.x = 375;
        if (i == 14)  d.x = 425;
        
        if (i == 0)  d.y = 100;
        // if (i == 16) d.x = 100;
        // if (i == 15) d.x = 100;
        
        if (i == 1)  d.y = 200;
        if (i == 2)  d.y = 200;
        
        if (i == 3)  d.y = 300;
        if (i == 4)  d.y = 300;
        if (i == 5)  d.y = 300;
        if (i == 6)  d.y = 300;
        
        if (i == 7)  d.y = 400;
        if (i == 8)  d.y = 400;
        if (i == 9)  d.y = 400;
        if (i == 10)  d.y = 400;
        if (i == 11)  d.y = 400;
        if (i == 12)  d.y = 400;
        if (i == 13)  d.y = 400;
        if (i == 14)  d.y = 400;

    d.y = d.y/2;
    d.x = d.x/2;
    return 'translate('+ d.x +', '+ d.y +')';
  })
  .on('mouseover', function(d){
    tooltip.transition()
            .style('opacity', 0.9)
    //tempColor = this.style.fill;
    if (!isAutoMode()) {
      tooltip.html(json.question[d.questionID].concept_name);
      question.html(json.question[d.questionID].question);
      answer.html(json.question[d.questionID].answers);

      currentQuestion = d.ndx;
      updatePosition();
      currentAnswer = json.question[nodes[currentQuestion].questionID].answers;
      console.log(currentAnswer);
      //I don't understand this if statement, sen
      if (currentQuestion == 0) {
        tooltip.html(json.question[nodes[0].questionID].concept_name);
        question.html(json.question[nodes[0].questionID].question);
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

//initilize the first question when start, and positions
var nextQ = d3.select("#next-question");
var qID;
if (currentQuestion == 0) {
  updateQ();
}

function updateQ(){
  qID = nodes[currentQuestion].questionID;
  currentAnswer = json.question[qID].answers;
  answer.html(json.question[qID].answers);
  question.html(json.question[qID].question);
  tooltip.html(json.question[qID].concept_name);
  score.html(currentScore);
  totalScore.html(sumScore);
  updateProgress();
}

function nextQFunc() {
  currentQuestion++;
  if (currentQuestion > 14) {
    currentBranch++;
    updateBranch();
  }
  updateQ();
  console.log("current question is in next Q " + currentQuestion);
  updatePosition();
}

nextQ.on('click', function() {
  if (!isAutoMode()) {
    nextQFunc();
  }
});

var prevQ = d3.select("#pre-question");
function prevQFunc() {
  currentQuestion--;
  //on start
  if (currentBranch == 0 && currentQuestion == -1){
    currentQuestion++;
  }
  //from previous branch
  if (currentQuestion < 0 && currentBranch > 0) {
    currentQuestion = 14;
    currentBranch--;
    updateBranch();
  } 
  updateQ();
  updatePosition();
}

prevQ.on('click', function() {
  if (!isAutoMode()) {
    prevQFunc();
  }
});

var submitB = d3.select("#submit");
submitB.on('click', function() {
     //console.log("current question is from submit" + currentQuestion);
    currentAnswer = json.question[nodes[currentQuestion].questionID].answers;    
  var random = Math.random();
  console.log(currentAnswer);
  if (random >= .5) {
    //records.append("right");
    records += " right";
    currentScore += nodes[currentQuestion].score;
    sumScore += nodes[currentQuestion].score;
    changeColor(true);
  } else {
    //records.append("wrong");
    records += " wrong";
    changeColor(false);
  }
  if (currentScore >= MAX_SCORE && isAutoMode()) {
    currentBranch++;
    updateBranch();
    currentScore = 0;
  } else {
    nextQFunc();
    console.log("current question is from after" + currentQuestion);
  }
  wrong = wrong * -1;
  console.log(records);
  console.log(currentScore + " current score " + currentQuestion + " current question");
});

function changeColor(isRight) {
  if (isRight) {
    nodes[currentQuestion].color = palette.green;
  } else {
    nodes[currentQuestion].color = palette.red;
  }
  node.data(nodes);
  node.select("circle")
  .attr('fill', function(d){
    return d.color;
  });
}

force.start();
})

