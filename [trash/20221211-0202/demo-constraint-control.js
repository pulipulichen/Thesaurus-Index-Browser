// define default stylesheet
let defaultStylesheet =  [
  {
    selector: 'node',
    style: {
      'background-color': '#bdd3d4',
      'label': 'data(id)',
      'text-valign': 'center',
      'background-opacity': 0.7
    }
  },         

  {
  selector: ':parent',
    style: {
//      'background-opacity': 0.333,
      'background-color': '#e8e8e8',
      'border-color': '#DADADA',
//      'border-width': 3,
      'text-valign': 'bottom'
    }
  },

  {
    selector: 'edge',
    style: {
      'curve-style': 'straight',
      'line-color': '#bdd3d4'
    }
  },

  {
    selector: 'node:selected',
    style: {
      'background-color': '#33ff00',
      'border-color': '#22ee00'
    }
  },
  
  {
    selector: 'node.fixed',
    style: {
      'shape': 'diamond',
      'background-color': '#9D9696',
    }
  }, 
  
  {
    selector: 'node.fixed:selected',
    style: {
      'background-color': '#33ff00',
    }
  },
  
  {
    selector: 'node.alignment',
    style: {
      'shape': 'round-heptagon',
      'background-color': '#fef2d1',
    }
  }, 
  
  {
    selector: 'node.alignment:selected',
    style: {
      'background-color': '#33ff00',
    }
  },  

  {
    selector: 'node.relative',
    style: {
      'shape': 'rectangle',
      'background-color': '#fed3d1',
    }
  }, 
  
  {
    selector: 'node.relative:selected',
    style: {
      'background-color': '#33ff00',
    }
  },

  {
    selector: 'edge:selected',
    style: {
      'line-color': '#33ff00'
    }
  }                 
];

let cy = window.cy = cytoscape({
  container: document.getElementById('cy'),
  ready: function(){              
    let layoutUtilities = this.layoutUtilities({
      desiredAspectRatio: this.width()/this.height()
    });

    this.nodes().forEach(function(node){
      let size = Math.random()*40+30;
      node.css("width", size);
      node.css("height", size);
    });

    let initialLayout = this.layout({name: 'fcose', step: 'all', animationEasing: 'ease-out'});
    initialLayout.pon('layoutstart').then(function( event ){
      constraints.fixedNodeConstraint = JSON.parse(JSON.stringify(sample1_constraints.fixedNodeConstraint));
    });
    initialLayout.run();     
  },
  layout: {name: 'preset'},
  style: defaultStylesheet,
  elements: {
        nodes: [
      {data: {id: 'n1'}},
      {data: {id: 'n2'}},
      {data: {id: 'n3', parent: 'n8'}},
      {data: {id: 'n5'}},
      {data: {id: 'n6', parent: 'n8'}},
      {data: {id: 'n7', parent: 'n8'}},
      {data: {id: 'n8'}},
      {data: {id: 'f1'}, classes: ['fixed']},
      {data: {id: 'f2'}, classes: ['fixed']},
      {data: {id: 'f3', parent: 'n8'}, classes: ['fixed']}, 
    ],
    edges: [
      {data: {source: 'n1', target: 'f1'}},
      {data: {source: 'n1', target: 'n3'}},
      {data: {source: 'f1', target: 'n2'}},
      {data: {source: 'f1', target: 'n3'}},
      {data: {source: 'n3', target: 'f2'}},
      {data: {source: 'f2', target: 'n5'}},
      {data: {source: 'n5', target: 'n8'}},
      {data: {source: 'n6', target: 'n3'}},
      {data: {source: 'n6', target: 'n7'}},
      {data: {source: 'n6', target: 'f3'}}
    ]
  },
  wheelSensitivity: 0.3
});

let constraints = {
  fixedNodeConstraint: undefined,
  alignmentConstraint: undefined,
  relativePlacementConstraint: undefined
};


// Sample File Changer
let sampleFileNames = {
    "sample5" : unix,
    "sample5_constraints" : unix_constraints,
    "sample6" : chalk,
    "sample6_constraints" : chalk_constraints,    
    "sample7" : uwsn,
    "sample7_constraints" : uwsn_constraints,
    "sample8" : call_graph,
    "sample8_constraints" : callGraph_constraints,
    "sample9" : wsn,
    "sample9_constraints" : wsn_constraints,
};

// Layout buttons

let options = {
  name: 'fcose',
  quality: "default",
  randomize: true,
  animate: true,
  animationDuration: 1000,
  animationEasing: undefined,
  fit: true,
  padding: 30,
  nestingFactor: 0.1,
  gravityRangeCompound: 1.5,
  gravityCompound: 1.0
};


// Handle Constraints ----------------------------


//// Samples
let elements1 = {
  nodes: [
    {data: {id: 'n1'}},    
    {data: {id: 'n2'}},
    {data: {id: 'n3', parent: 'n8'}},
    {data: {id: 'n5'}},
    {data: {id: 'n6', parent: 'n8'}},
    {data: {id: 'n7', parent: 'n8'}},
    {data: {id: 'n8'}},
    {data: {id: 'f1'}, classes: ['fixed']},
    {data: {id: 'f2'}, classes: ['fixed']},
    {data: {id: 'f3', parent: 'n8'}, classes: ['fixed']}, 
  ],
  edges: [
    {data: {source: 'n1', target: 'f1'}},
    {data: {source: 'n1', target: 'n3'}},
    {data: {source: 'f1', target: 'n2'}},
    {data: {source: 'f1', target: 'n3'}},
    {data: {source: 'n3', target: 'f2'}},
    {data: {source: 'f2', target: 'n5'}},
    {data: {source: 'n5', target: 'n8'}},
    {data: {source: 'n6', target: 'n3'}},
    {data: {source: 'n6', target: 'n7'}},
    {data: {source: 'n6', target: 'f3'}}
  ]
};

let elements2 = {
  nodes: [
    {data: {id: 'n1', parent: 'n6'}},    
    {data: {id: 'n2', parent: 'n6'}},    
    {data: {id: 'n3'}},    
    {data: {id: 'n4'}},
    {data: {id: 'n5', parent: 'n8'}},     
    {data: {id: 'n6'}},
    {data: {id: 'n7'}},
    {data: {id: 'n8'}},    
    {data: {id: 'v1', parent: 'n6'}, classes: ['alignment']},
    {data: {id: 'v2'}, classes: ['alignment']},    
    {data: {id: 'v3', parent: 'n8'}, classes: ['alignment']},
    {data: {id: 'v4', parent: 'n8'}, classes: ['alignment']},
    {data: {id: 'v5', parent: 'n5'}, classes: ['alignment']},
    {data: {id: 'h1'}, classes: ['alignment']},
    {data: {id: 'h2'}, classes: ['alignment']},
    {data: {id: 'h3'}, classes: ['alignment']},     
    {data: {id: 'h4', parent: 'n7'}, classes: ['alignment']},
    {data: {id: 'h5', parent: 'n7'}, classes: ['alignment']},     
    {data: {id: 'vh1', parent: 'n6'}, classes: ['alignment']},
    {data: {id: 'vh2', parent: 'n5'}, classes: ['alignment']}
  ],
  edges: [
    {data: {source: 'v1', target: 'vh1'}},
    {data: {source: 'v1', target: 'n1'}}, 
    {data: {source: 'n1', target: 'n2'}},    
    {data: {source: 'n2', target: 'vh1'}},
    {data: {source: 'n6', target: 'h1'}},
    {data: {source: 'h1', target: 'h2'}},
    {data: {source: 'n6', target: 'n3'}},
    {data: {source: 'n3', target: 'v2'}},
    {data: {source: 'n3', target: 'h4'}},    
    {data: {source: 'h4', target: 'h5'}},
    {data: {source: 'h4', target: 'v3'}},
    {data: {source: 'v3', target: 'v4'}},
    {data: {source: 'v3', target: 'n5'}},
    {data: {source: 'v5', target: 'vh2'}},    
    {data: {source: 'v3', target: 'n4'}},
    {data: {source: 'h3', target: 'n8'}},    
    {data: {source: 'n4', target: 'h3'}}
  ]
};

let elements3 = {
  nodes: [
    {data: {id: 'r1', parent: 'n8'}, classes: ['relative']},
    {data: {id: 'r2', parent: 'n8'}, classes: ['relative']},
    {data: {id: 'r3', parent: 'n8'}, classes: ['relative']},
    {data: {id: 'r4'}, classes: ['relative']},
    {data: {id: 'r5'}, classes: ['relative']},
    {data: {id: 'r6', parent: 'n7'}, classes: ['relative']},
    {data: {id: 'r7', parent: 'n10'}, classes: ['relative']},    
    {data: {id: 'r8', parent: 'n10'}, classes: ['relative']},    
    {data: {id: 'n1', parent: 'n7'}},
    {data: {id: 'n2'}},
    {data: {id: 'n3'}},
    {data: {id: 'n4'}},
    {data: {id: 'n5'}},
    {data: {id: 'n6'}},
    {data: {id: 'n7', parent: 'n10'}},
    {data: {id: 'n8'}},
    {data: {id: 'n9'}},
    {data: {id: 'n10'}}
  ],
  edges: [
    {data: {source: 'r6', target: 'n1'}},
    {data: {source: 'r6', target: 'n3'}},
    {data: {source: 'n1', target: 'r8'}},
    {data: {source: 'n1', target: 'r5'}},
    {data: {source: 'n1', target: 'r7'}},
    {data: {source: 'n2', target: 'n3'}},
    {data: {source: 'n2', target: 'r2'}},
    {data: {source: 'n2', target: 'n4'}},
    {data: {source: 'r5', target: 'n5'}},
    {data: {source: 'r5', target: 'n6'}},
    {data: {source: 'r2', target: 'r1'}},
    {data: {source: 'r2', target: 'r3'}},
    {data: {source: 'n7', target: 'n9'}},
    {data: {source: 'n5', target: 'n6'}},
    {data: {source: 'n5', target: 'r4'}}
  ]
};

let elements4 = [
  {group: 'nodes', data: {id: 'n1'}},
  {group: 'nodes', data: {id: 'n2'}},
  {group: 'nodes', data: {id: 'n3'}},
  {group: 'nodes', data: {id: 'n4'}},
  {group: 'nodes', data: {id: 'n5'}},  
  {group: 'nodes', data: {id: 'n6', parent: 'n24'}},
  {group: 'nodes', data: {id: 'n7', parent: 'n24'}},
  {group: 'nodes', data: {id: 'n8', parent: 'n24'}},
  {group: 'nodes', data: {id: 'n9'}},
  {group: 'nodes', data: {id: 'n10', parent: 'n28'}},
  {group: 'nodes', data: {id: 'n11', parent: 'n28'}},
  {group: 'nodes', data: {id: 'n12', parent: 'n28'}},
  {group: 'nodes', data: {id: 'n13', parent: 'n28'}},
  {group: 'nodes', data: {id: 'n14', parent: 'n28'}},
  {group: 'nodes', data: {id: 'n15'}},
  {group: 'nodes', data: {id: 'n16'}},
  {group: 'nodes', data: {id: 'n17'}},
  {group: 'nodes', data: {id: 'n18'}},
  {group: 'nodes', data: {id: 'n19'}},
  {group: 'nodes', data: {id: 'n20', parent: 'n26'}},
  {group: 'nodes', data: {id: 'n21', parent: 'n26'}},
  {group: 'nodes', data: {id: 'n22', parent: 'n27'}},    
  {group: 'nodes', data: {id: 'n23', parent: 'n25'}},
  {group: 'nodes', data: {id: 'n24'}},
  {group: 'nodes', data: {id: 'n25'}},
  {group: 'nodes', data: {id: 'n26', parent: 'n30'}},
  {group: 'nodes', data: {id: 'n27', parent: 'n29'}},
  {group: 'nodes', data: {id: 'n28', parent: 'n29'}},
  {group: 'nodes', data: {id: 'n29', parent: 'n30'}},
  {group: 'nodes', data: {id: 'n30'}},
  {group: 'nodes', data: {id: 'f1', parent: 'n29'}, classes: ['fixed']},
  {group: 'nodes', data: {id: 'f2', parent: 'n28'}, classes: ['fixed']},  
  {group: 'nodes', data: {id: 'h1'}, classes: ['alignment']},
  {group: 'nodes', data: {id: 'h2'}, classes: ['alignment']},
  {group: 'nodes', data: {id: 'h3'}, classes: ['alignment']},
  {group: 'nodes', data: {id: 'v1', parent: 'n24'}, classes: ['alignment']},  
  {group: 'nodes', data: {id: 'v2', parent: 'n25'}, classes: ['alignment']},  
  {group: 'nodes', data: {id: 'v3'}, classes: ['alignment']},
  {group: 'nodes', data: {id: 'v4'}, classes: ['alignment']},
  {group: 'nodes', data: {id: 'h4r'}, classes: ['alignment']},
  {group: 'nodes', data: {id: 'r1', parent: 'n29'}, classes: ['relative']},  
  {group: 'nodes', data: {id: 'r2', parent: 'n29'}, classes: ['relative']},
  {group: 'nodes', data: {id: 'r3'}, classes: ['relative']},
  {group: 'edges', data: {id: 'e2', source: 'n2', target: 'n3'}},
  {group: 'edges', data: {id: 'e3', source: 'n1', target: 'n2'}},
  {group: 'edges', data: {id: 'e4', source: 'n3', target: 'v1'}},
  {group: 'edges', data: {id: 'e5', source: 'n2', target: 'v1'}},
  {group: 'edges', data: {id: 'e6', source: 'v1', target: 'n4'}},
//  {group: 'edges', data: {id: 'e7', source: 'n5', target: 'n6'}},
  {group: 'edges', data: {id: 'e8', source: 'v1', target: 'n5'}},
  {group: 'edges', data: {id: 'e9', source: 'v1', target: 'n6'}},
  {group: 'edges', data: {id: 'e10', source: 'v1', target: 'n7'}},
//  {group: 'edges', data: {id: 'e11', source: 'n3', target: 'n9'}},
  {group: 'edges', data: {id: 'e12', source: 'n6', target: 'n8'}},
  {group: 'edges', data: {id: 'e13', source: 'h1', target: 'n16'}},
  { group:'edges', data:{ id: 'e14', source: 'v2', target: 'n23'} },
  {group: 'edges', data: {id: 'e15', source: 'n16', target: 'n15'}},
  {group: 'edges', data: {id: 'e16', source: 'n16', target: 'h2'}},
  {group: 'edges', data: {id: 'e17', source: 'n15', target: 'n17'}},
  {group: 'edges', data: {id: 'e18', source: 'h3', target: 'v3'}},
  {group: 'edges', data: {id: 'e19', source: 'v3', target: 'n18'}},
  {group: 'edges', data: {id: 'e20', source: 'n17', target: 'n19'}},
  {group: 'edges', data: {id: 'e21', source: 'n18', target: 'n19'}},
  {group: 'edges', data: {id: 'e22', source: 'h2', target: 'n19'}},
  {group: 'edges', data: {id: 'e23', source: 'n19', target: 'h3'}},
  {group: 'edges', data: {id: 'e25', source: 'v4', target: 'n20'}},
  {group: 'edges', data: {id: 'e26', source: 'n20', target: 'n21'}},
  {group: 'edges', data: {id: 'e27', source: 'n25', target: 'f1'}},
  {group: 'edges', data: {id: 'e29', source: 'f1', target: 'n26'}},
  {group: 'edges', data: {id: 'e30', source: 'f1', target: 'r2'}},
  {group: 'edges', data: {id: 'e31', source: 'f1', target: 'r1'}},
  {group: 'edges', data: {id: 'e33', source: 'h3', target: 'v2'}},
  {group: 'edges', data: {id: 'e35', source: 'f2', target: 'n11'}},
  {group: 'edges', data: {id: 'e36', source: 'f2', target: 'n10'}},
  {group: 'edges', data: {id: 'e37', source: 'n11', target: 'n10'}},
  {group: 'edges', data: {id: 'e38', source: 'n12', target: 'n13'}},
  {group: 'edges', data: {id: 'e39', source: 'n12', target: 'n14'}},
  {group: 'edges', data: {id: 'e40', source: 'h2', target: 'n27'}},
  {group: 'edges', data: {id: 'e41', source: 'n9', target: 'r3'}},
  {group: 'edges', data: {id: 'e42', source: 'n9', target: 'h4r'}},
  {group: 'edges', data: {id: 'e43', source: 'r3', target: 'h4r'}},
  {group: 'edges', data: {id: 'e44', source: 'n11', target: 'r3'}},
  {group: 'edges', data: {id: 'e45', source: 'n14', target: 'r3'}}
];

let elements5 = {
  nodes: [
    {data: {id: 'r1'}, classes: ['relative'], position:{x:318, y:150}},
    {data: {id: 'r2'}, classes: ['relative'], position:{x:413, y:148}},
    {data: {id: 'r3'}, classes: ['relative'], position:{x:128, y:-151}},
    {data: {id: 'r4'}, classes: ['relative'], position:{x:132, y:-38}},   
    {data: {id: 'f1v', parent: 'n8'}, classes: ['fixed'], position:{x:-79, y:276}},    
    {data: {id: 'f2h', parent: 'n6'}, classes: ['fixed'], position:{x:96, y:82}},
    {data: {id: 'v1', parent: 'n5'}, classes: ['alignment'], position:{x:-290, y:153}},
    {data: {id: 'v2', parent: 'n5'}, classes: ['alignment'], position:{x:-197, y:152}},
    {data: {id: 'v3', parent: 'n8'}, classes: ['alignment'], position:{x:-85, y:177}},
    {data: {id: 'h1', parent: 'n7'}, classes: ['alignment'], position:{x:1, y:-9}},
    {data: {id: 'h2', parent: 'n7'}, classes: ['alignment'], position:{x:0, y:-104}},
    {data: {id: 'n0', parent: 'n6'}, position:{x:186, y:219}},
    {data: {id: 'n1', parent: 'n6'}, position:{x:197, y:122}},
    {data: {id: 'n2', parent: 'n6'}, position:{x:93, y:186}},
    {data: {id: 'n3'}, position:{x:-267, y:20}},
    {data: {id: 'n4'}, position:{x:-167, y:-10}},
    {data: {id: 'n5', parent: 'n8'}},
    {data: {id: 'n6'}},
    {data: {id: 'n7'}},
    {data: {id: 'n8'}}    
  ],
  edges: [
    {data: {source: 'n0', target: 'n1'}},
    {data: {source: 'n0', target: 'n2'}},
    {data: {source: 'n6', target: 'r1'}},
    {data: {source: 'n1', target: 'f2h'}},
    {data: {source: 'r1', target: 'r2'}},
    {data: {source: 'n2', target: 'f2h'}},
    {data: {source: 'n6', target: 'r4'}},
    {data: {source: 'n3', target: 'n4'}},
    {data: {source: 'n3', target: 'n8'}},
    {data: {source: 'n4', target: 'v3'}},
    {data: {source: 'r4', target: 'h1'}},
    {data: {source: 'r4', target: 'r3'}},
    {data: {source: 'h1', target: 'h2'}},
    {data: {source: 'v1', target: 'v2'}},
    {data: {source: 'v3', target: 'n5'}},
    {data: {source: 'h1', target: 'v3'}},
    {data: {source: 'v3', target: 'f1v'}}
  ]
};

let elements5_positions = [
  {x:318, y:150}, 
  {x:413, y:148},
  {x:128, y:-151},
  {x:132, y:-38},
  {x:-79, y:276},
  {x:96, y:82},
  {x:-290, y:153},
  {x:-197, y:152},
  {x:-85, y:177},
  {x:1, y:-9},
  {x:0, y:-104},
  {x:186, y:219},
  {x:197, y:122},
  {x:93, y:186},
  {x:-267, y:20},
  {x:-167, y:-10},
  {x:318, y:150},
  {x:318, y:150}
];

let sample1_constraints = {
  "fixedNodeConstraint": [
    {
      "nodeId": "f1",
      "position": {
        "x": -150,
        "y": -100
      }
    },
    {
      "nodeId": "f2",
      "position": {
        "x": -50,
        "y": -150
      }
    },
    {
      "nodeId": "f3",
      "position": {
        "x": 100,
        "y": 150
      }
    }
  ]
};

let sample2_constraints = {
  "alignmentConstraint": {
    "vertical": [
      [
        "v1",
        "v2",
        "vh1"
      ],
      [
        "v3",
        "v4",
        "v5",
        "vh2"
      ]
    ],
    "horizontal": [
      [
        "h1",
        "h2",
        "h3"
      ],
      [
        "h4",
        "h5",
        "vh1",
        "vh2"
      ]
    ]
  }
};

let sample3_constraints = {
  "relativePlacementConstraint": [
    {
      "left": "r1",
      "right": "r2",
      "gap": 100
    },
    {
      "top": "r1",
      "bottom": "r2",
      "gap": 100
    },
    {
      "left": "r2",
      "right": "r3",
      "gap": 200
    },
    {
      "top": "r4",
      "bottom": "r5",
      "gap": 150
    },
    {
      "left": "r6",
      "right": "r7",
      "gap": 150
    },
    {
      "top": "r8",
      "bottom": "r7",
      "gap": 100
    }
  ]
};

let sample4_constraints = {
  "fixedNodeConstraint": [
    {
      "nodeId": "f1",
      "position": {
        "x": -100,
        "y": 0
      }
    },
    {
      "nodeId": "f2",
      "position": {
        "x": 300,
        "y": 0
      }
    }
  ],
  "alignmentConstraint": {
    "horizontal": [
      [
        "h1",
        "h2",
        "h3",
        "h4r"
      ]
    ],
    "vertical": [
      [
        "v1",
        "v2",
        "v3",
        "v4"        
      ]
    ]
  },
  "relativePlacementConstraint": [
    {
      "top": "r1",
      "bottom": "r2",
      "gap": 150
    },    
    {
      "left": "r3",
      "right": "h4r",
      "gap": 150
    }
  ]
}; 