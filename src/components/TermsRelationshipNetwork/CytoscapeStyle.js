module.exports = function () {
  return [
    {
      selector: 'node',
      style: {
        // 'shape': 'diamond',
        'shape': 'round-rectangle',
        'width': 'label',
        'height': 'label',
        'padding': '5',
        // 'width': '300',
        // 'height': '100',
        'background-color': '#bdd3d4',
        'label': 'data(id)',
        'text-valign': 'center',
        'background-opacity': 0.7,
        "text-wrap": "wrap",
        "cursor": "pointer"
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
        // 'shape': 'arrow',
        'curve-style': 'straight',
        'line-color': '#bdd3d4',
        'target-arrow-shape': 'triangle',
        'opacity': 0.7
      }
    },

    // {
    //   selector: 'node:selected',
    //   style: {
    //     'background-color': '#33ff00',
    //     'border-color': '#22ee00'
    //   }
    // },

    // {
    //   selector: 'node.fixed',
    //   style: {
    //     'shape': 'diamond',
    //     'background-color': '#9D9696',
    //   }
    // }, 

    // {
    //   selector: 'node.fixed:selected',
    //   style: {
    //     'background-color': '#33ff00',
    //   }
    // },

    {
      selector: 'node.alignment',
      style: {
        'shape': 'round-heptagon',
        'background-color': '#fef2d1',
      }
    },

    // {
    //   selector: 'node.alignment:selected',
    //   style: {
    //     'background-color': '#33ff00',
    //   }
    // },  

    {
      selector: 'node.relative',
      style: {
        'shape': 'rectangle',
        'background-color': '#fed3d1',
      }
    },

    // {
    //   selector: 'node.relative:selected',
    //   style: {
    //     'background-color': '#33ff00',
    //   }
    // },  

    {
      selector: 'edge:selected',
      style: {
        'line-color': '#33ff00'
      }
    },
    // {
    //   selector: 'edge.reference',
    //   style: {
    //     'line-color': '#ffff00'
    //   }
    // },
    
    {
      selector: '#BT,#USE',
      style: {
        "text-valign": 'top',
      }
    },
    {
      selector: '#BT',
      style: {
        'background-color': '#f6e7ff',
      }
    },
    {
      selector: '#NT',
      style: {
        'background-color': '#f1e2d3',
      }
    },
    {
      selector: '#RT',
      style: {
        'background-color': '#ffedde',
      }
    },
    {
      selector: '#USE',
      style: {
        'background-color': '#fbfdef',
      }
    },
    {
      selector: '#UF',
      style: {
        'background-color': '#e1f7f7',
      }
    },
  ];

}