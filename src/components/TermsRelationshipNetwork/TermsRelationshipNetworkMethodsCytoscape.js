const defaultStylesheet = require('./CytoscapeStyle.js')
// console.log(defaultStylesheet)

module.exports = function (app) {

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
      name: 'fcose',
      // step: 'all', 
      // animationEasing: 'ease-out',
      relativePlacementConstraint,
      alignmentConstraint,
      // nestingFactor: 0.1,
      // gravity: 100,
      gravityCompound: 5,
      gravityRangeCompound: 0.5,
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

  app.methods.initCytoscapeVis = function () {
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
      if (!this.data('classes') || this.data('classes').indexOf('term') === -1) {
        return false
      }

      if (this.data('classes').indexOf('root') === -1) {
        // window.alert(this.data('id'))
        vue.localConfig.termFocus = this.data('id')
      }
      else {
        vue.scrollToTermFocus()
      }
    });

    cy.on('mouseover', 'node', function (e) {
      // console.log(this.data('classes'))
      if (!this.data('classes') || this.data('classes').indexOf('term') === -1) {
        return false
      }
      $('body').css('cursor', 'pointer');
    });

    cy.on('mouseout', 'node', function (e) {
      if (!this.data('classes') || this.data('classes').indexOf('term') === -1) {
        return false
      }
      // console.log(this.data('classes'))
      $('body').css('cursor', 'default');
    });
  }

  app.methods.setupCYNodeHTML = function (cy) {
    
    cy.nodeHtmlLabel([
      {
        query: 'node.term',
        tpl: function(data){
          console.log(data)
          return '<p class="line1">line 1</p><p class="line1">line 2</p>'}
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
      nodes.push({ data: { id: term, parent: keyword }, classes: ['term'] })

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
    // console.log(index)
    let thesaurus = this.$parent.$refs.ListThesaurus.graphData

    let data = {
      ...thesaurus,
      locators: index.locators
    }

    // console.log(data)
    // return data
    this.graphData = data

    setTimeout(() => {
      this.initCytoscapeVis()
    }, 100)
  }
}