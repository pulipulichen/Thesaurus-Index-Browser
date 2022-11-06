/* global Node */
//import $ from 'jquery'

let Index = {
  props: ['config', 'localConfig', 'utils'],
  data() {
    this.$i18n.locale = this.config.localConfig
    return {
      postMessageAPI: null
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
    'config.inited'() {
      if (this.config.inited === false) {
        return false
      }
      this.initPostMessageAPI()

      //this.testRegression()
    },
  },
  mounted() {
    setTimeout(() => {
      this.initCY()
    }, 500)

  },
  methods: {
    initCY() {
      let sample1_constraints = {
        "fixedNodeConstraint": [
          // {
          //   "nodeId": "f1",
          //   "position": {
          //     "x": -150,
          //     "y": -100
          //   }
          // },
          // {
          //   "nodeId": "f2",
          //   "position": {
          //     "x": -50,
          //     "y": -150
          //   }
          // },
          // {
          //   "nodeId": "f3",
          //   "position": {
          //     "x": 100,
          //     "y": 150
          //   }
          // }
        ]
      };

      let defaultStylesheet = [
        {
          selector: 'node',
          style: {
            'background-color': '#bdd3d4',
            'label': 'data(id)',
            'text-valign': 'center',
            'background-opacity': 0.7,
            'shape': 'round-rectangle',
            'width': "label",
            'height': "label",
            "padding": "10"
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

      let constraints = {
        // fixedNodeConstraint: undefined,
        fixedNodeConstraint: [{ nodeId: 'border-term', position: { x: 100, y: 200 } },
        { nodeId: 'narrower-term', position: { x: 200, y: -300 } }],
        alignmentConstraint: {
          "vertical": [
            [
              "Adult Students",
              "Students",
              "Population Groups"
            ]
          ],
          "horizontal": [
            [
              "used-for",
              "Students",
              "related-term"
            ]
          ]
        },
        relativePlacementConstraint: undefined
      };

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

      let cy = window.cy = cytoscape({
        container: document.getElementById('cy'),
        ready: function () {
          // let layoutUtilities = this.layoutUtilities({
          //   desiredAspectRatio: this.width() / this.height()
          // });

          // this.nodes().forEach(function (node) {
          //   //  let size = Math.random() * 40 + 30;
          //   //  node.css("width", size);
          //   //  node.css("height", size);

          //    node.css("width", "data(width)");
          //    node.css("height", "data(height)");
          // });

          let initialLayout = this.layout({
            name: 'fcose',
            step: 'all',
            animationEasing: 'ease-out',
            // fixedNodeConstraint: constraints.fixedNodeConstraint
            // alignmentConstraint: {vertical: [['border-term', 'narrower-term']]},
          });
          initialLayout.pon('layoutstart').then(function (event) {
            // constraints.fixedNodeConstraint = JSON.parse(JSON.stringify(sample1_constraints.fixedNodeConstraint));
            // clearConstraintListTable();
            // fillConstraintListTableFromConstraints();
          });
          initialLayout.run();

          setTimeout(function () {
            return false

            let finalOptions = Object.assign({}, options);
            finalOptions.step = "all";
            finalOptions.randomize = false


            finalOptions.alignmentConstraint = constraints.alignmentConstraint ? constraints.alignmentConstraint : undefined;
            // finalOptions.relativePlacementConstraint = constraints.relativePlacementConstraint ? constraints.relativePlacementConstraint : undefined;
            // finalOptions.fixedNodeConstraint = constraints.fixedNodeConstraint ? constraints.fixedNodeConstraint : undefined;
            console.log(finalOptions)

            let layout = cy.layout(finalOptions);
            cy.layoutUtilities("get").setOption("randomize", finalOptions.randomize);
            let start = performance.now();
            layout.run();
            console.log((performance.now() - start) + " ms");
          }, 3000)

        },
        layout: {
          name: 'preset',
        },
        style: defaultStylesheet,
        elements: {
          nodes: [
            { data: { id: 'Students', classes: ['fixed'] } },

            { data: { id: 'border-term' } },
            { data: { id: 'Population Groups', parent: 'border-term', classes: ['borader-term'] } },

            { data: { id: 'narrower-term' } },
            { data: { id: 'Adult Students', parent: 'narrower-term', classes: ['narrower-term'] } },
            { data: { id: 'Advanced Students', parent: 'narrower-term', classes: ['narrower-term'] } },
            { data: { id: 'African American Students', parent: 'narrower-term', classes: ['narrower-term'] } },

            { data: { id: 'related-term' } },
            { data: { id: 'Attendance', parent: 'related-term', classes: ['related-term'] } },
            { data: { id: 'Enrollment', parent: 'related-term', classes: ['related-term'] } },
            { data: { id: 'Extracurricular Activities', parent: 'related-term', classes: ['related-term'] } },

            { data: { id: 'used-for' } },
            { data: { id: 'Average Students (1967 1980)', parent: 'used-for', classes: ['used-for'] } },
            { data: { id: 'Day Students (2004)', parent: 'used-for', classes: ['used-for'] } },
            { data: { id: 'Exceptional Students (1966 1978) (2004)', parent: 'used-for', classes: ['used-for'] } },
          ],
          edges: [
            { data: { source: 'Students', target: 'border-term' } },
            { data: { source: 'Students', target: 'narrower-term' } },
            { data: { source: 'Students', target: 'related-term' } },
            { data: { source: 'Students', target: 'used-for' } }
          ]
        },
        wheelSensitivity: 0.3,
        constraints
      });

      // console.log(constraints);
    }
  }
}

// import IndexMethodsPostMessage from './IndexMethodsPostMessage.js'
// IndexMethodsPostMessage(Index)

//import IndexMethodsTest from './IndexMethodsTest.js'
//IndexMethodsTest(Index)

export default Index