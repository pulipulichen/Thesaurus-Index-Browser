const defaultStylesheet = require('./CytoscapeStyle.js')

const cytoscape = require('cytoscape');

// https://github.com/iVis-at-Bilkent/cytoscape.js-layout-utilities
const layoutUtilities = require('cytoscape-layout-utilities');
cytoscape.use( layoutUtilities ); // register extension

// https://www.npmjs.com/package/cytoscape-fcose
const fcose = require('cytoscape-fcose');
cytoscape.use( fcose ); // register extension

// https://www.npmjs.com/package/cytoscape-cose-bilkent
// let coseBilkent = require('cytoscape-cose-bilkent');
// cytoscape.use( coseBilkent ); // register extension

// https://www.npmjs.com/package/cytoscape-popper
// const popper = require('cytoscape-popper');
// cyqtip( popper );

const $ = require('jquery')

// console.log(cyqtip)
// console.log(defaultStylesheet)

export default function (app) {

  let ready = function (cy, vue) {
    let {relativePlacementConstraint, alignmentConstraint} = vue
    // console.log(this)       
    let layoutUtilities = cy.layoutUtilities({
      desiredAspectRatio: cy.width() / cy.height()
    });

    // cy.nodes().forEach(function (node) {
    //   // let size = Math.random()*40+30;
    //   // node.css("width", size);
    //   // node.css("height", size);
    // });

    let initialLayout = cy.layout({
      // name: 'fcose',
      name: 'fcose',

      // step: 'all', 
      // animationEasing: 'ease-out',
      relativePlacementConstraint,
      alignmentConstraint,
      // nestingFactor: 0.1,
      // gravity: 100,
      gravityCompound: 5,
      gravityRangeCompound: 0.7,
      // tilingPaddingVertical: 10,
      step: "all",
      animationDuration: 500,
      // animate: false,
    });
    // initialLayout.pon('layoutstart').then(function( event ){
    //   constraints.fixedNodeConstraint = JSON.parse(JSON.stringify(fixedNodeConstraint));
    // });
    initialLayout.run();

  }

  // cyqtip(cytoscape)
  app.methods.initCytoscapeVis = function () {
    if (this.config.inited === false || !this.graphData) {
      return false
    }

    clearTimeout(this.cyTimer)

    this.cyTimer = setTimeout(() => {
      let vue = this
      cy = window.cy = cytoscape({
        container: this.$refs.cy,
        ready: function () {
          ready(this, vue)
        },
        layout: { name: 'preset' },
        style: defaultStylesheet(),
        elements: this.graphElements,
        wheelSensitivity: 0.3,
      });

      this.setupCYEvents(cy)
      this.setupCYNodeHTML(cy)
    }, 100)
      

    // set nodeHtmlLabel for your Cy instance
    

    // let constraints = {
    //   fixedNodeConstraint: undefined,
    //   alignmentConstraint: undefined,
    //   relativePlacementConstraint: undefined
    // };
  }

  app.methods.setupCYEvents = function (cy) {
    let vue = this

    cy.on('click', 'node', function (e) {
      // console.log(this.data('classes'))
      if (!this.classes() || this.classes().indexOf('term') === -1) {
        return false
      }

      if (this.classes().indexOf('root') === -1) {
        // window.alert(this.data('id'))
        vue.localConfig.termFocus = this.data('term')
      }
      else {
        vue.scrollToTermFocus()
      }
    });

    cy.on('mouseover', 'node', function (e) {
      // console.log(this.classes())
      if (!this.classes() || this.classes().indexOf('term') === -1) {
        return false
      }
      // console.log('aaa')
      $('body').css('cursor', 'pointer');

      // var node = e.cyTarget;
      // node.qtip({
      
      // this.qtip({
      //      content: 'hello',
      //      show: {
      //         event: e.type,
      //         ready: true
      //      },
      //      hide: {
      //         event: 'mouseout unfocus'
      //      }
      // }, e);
    });

    cy.on('mouseout', 'node', function (e) {
      if (!this.classes() || this.classes().indexOf('term') === -1) {
        return false
      }
      // console.log(this.data('classes'))
      $('body').css('cursor', 'default');
    });
  }

  app.methods.setupCYNodeHTML = function (cy) {
    return false

    cy.nodeHtmlLabel([
      {
        query: 'node.term',
        tpl: function(data){
          console.log(data)
          return '<pre>' + data.id.split(' ').join('\n') + '</pre>'
        }
      },
    ]);
  }

  app.methods.getRef = function (keyword) {
    if (!this.graphData) {
      return false
    }

    let ref = this.graphData.crossReference[keyword]
    if (!ref || 
        Array.isArray(ref) === false || 
        ref.length === 0) {
      return false      
    }
    // return ref.map(r => this.nodeBreakLine(r))
    return ref
  }

  app.methods.setupCrossReference = function (keyword, nodes, edges, isIngoing = false) {
    let ref = this.getRef(keyword)
    if (!ref) {
      return false
    }

    nodes.push({ data: { id: keyword } })
    if (isIngoing) {
      edges.push({ data: { target: this.idRoot, source: keyword } },)
    }
    else {
      edges.push({ data: { source: this.idRoot, target: keyword } },)
    }

    ref.forEach((term, i) => {
      nodes.push({ data: { id: this.nodeBreakLine(term), parent: keyword, term }, classes: ['term'] })

      if (i > 0) {
        // edges.push({ data: { source: term, target: ref[0], classes: ['reference'] } },)
      }
    })

  }

  app.methods.setupGraphData = function () {
    if (this.config.inited === false) {
      return false
    }

    // console.log('aaa', 'bbb')
    if (!this.localConfig.termFocus) {
      return false
    }

    let index = this.$parent.$refs.ListIndex.graphData
    if (!index) {
      console.error('no index')
      // return false
    }

    // console.log(index)
    let thesaurus = this.$parent.$refs.ListThesaurus.graphData
    if (!thesaurus) {
      console.error('no thesaurus')
      // window.alert(this.$t(`"${this.localConfig.termFocus}" is not found in thesaurus.`))
      // return false
    }

    let data = {
      ...thesaurus
      // locators: index.locators
    }

    if (index && index.locators) {
      data.locators = index.locators
    }

    // console.log(data)
    // return data
    this.graphData = data

    setTimeout(() => {
      this.initCytoscapeVis()
    }, 100)
  }

  app.methods.hasChinese = function (text) {
    return /[\u4e00-\u9fa5]/.test(text)
  }

  let nodeWidth = 3
  app.methods.nodeBreakLine = function (term) {
    let output = []
    term.split(' ').map(word => {
      if (this.hasChinese(word) === false) {
        output.push(word)
        return false
      }
      
      while (word.length > nodeWidth) {
        let part = word.slice(0, nodeWidth)
        word = word.slice(nodeWidth)

        output.push(part.trim())
      }
      
      if (word.length > 0 && word.trim() !== '') {
        output.push(word.trim())
      }
    })


    // console.log(output.join('\n'))
    return output.join('\n')

    // return term.split(' ').join('\n')
  }

  app.methods.nodeJoinLine = function (term) {
    return term.split('\n').join(' ')
  }
}