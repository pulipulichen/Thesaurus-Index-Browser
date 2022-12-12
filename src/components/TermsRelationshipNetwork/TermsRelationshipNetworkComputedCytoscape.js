export default function (app) {
  app.computed.graphElements = function () {
    // elements: {
      //   nodes: [
      //     {data: {id: 'n1'}},
      //     {data: {id: 'n2'}},
      //     {data: {id: 'n3', parent: 'n8'}},
      //     {data: {id: 'n5'}},
      //     {data: {id: 'n6', parent: 'n8'}},
      //     {data: {id: 'n7', parent: 'n8'}},
      //     {data: {id: 'n8'}},
      //     {data: {id: 'f1'}, classes: ['fixed']},
      //     {data: {id: 'f2'}, classes: ['fixed']},
      //     {data: {id: 'f3', parent: 'n8'}, classes: ['fixed']}, 
      //   ],
      //   edges: [
      //     {data: {source: 'n1', target: 'f1'}},
      //     {data: {source: 'n1', target: 'n3'}},
      //     {data: {source: 'f1', target: 'n2'}},
      //     {data: {source: 'f1', target: 'n3'}},
      //     {data: {source: 'n3', target: 'f2'}},
      //     {data: {source: 'f2', target: 'n5'}},
      //     {data: {source: 'n5', target: 'n8'}},
      //     {data: {source: 'n6', target: 'n3'}},
      //     {data: {source: 'n6', target: 'n7'}},
      //     {data: {source: 'n6', target: 'f3'}}
      //   ]
      // },

    let nodes = []
    let edges = []

    nodes.push({ data: { id: this.idRoot}, classes: ['term', 'root']  })
    
    let ingoingKeywords = ['UF', 'NT']
    this.$parent.$refs.ListThesaurus.crossReferenceKeywords.forEach((keyword) => {
      this.setupCrossReference(keyword, nodes, edges, (ingoingKeywords.indexOf(keyword) > -1))
    })

    // console.log(nodes)
    // console.log(edges)

    return {
      nodes,
      edges
      // nodes: [
      //   { data: { id: 'NT' } },
      //   { data: { id: 'nt1', parent: 'NT', classes: ['term'] } },
      //   { data: { id: 'BT' } },
      //   { data: { id: 'bt1', parent: 'BT', classes: ['term'] } },
      //   { data: { id: 'bt2', parent: 'BT', classes: ['term'] } },
      //   { data: { id: 'USE' } },
      //   { data: { id: 'use1', parent: 'USE', classes: ['term'] } },
      //   { data: { id: 'use2', parent: 'USE', classes: ['term'] } },
      //   { data: { id: 'UF' } },
      //   { data: { id: 'uf1', parent: 'UF', classes: ['term'] } },
      //   { data: { id: 'RT' } },
      //   { data: { id: 'rt1', parent: 'RT', classes: ['term'] } },
      //   { data: { id: 'rt2', parent: 'RT', classes: ['term'] } },
      //   // {data: {id: 'rt\naaaa', classes: ['term']}},
      // ],
      // edges: [
      //   { data: { source: 'NT', target: this.idRoot } },
      //   { data: { source: this.idRoot, target: 'BT' } },
      //   { data: { source: this.idRoot, target: 'RT' } },
      //   { data: { source: this.idRoot, target: 'USE' } },
      //   { data: { source: 'UF', target: this.idRoot } },
      // ]
    }
  }

  app.computed.idRoot = function () {
    if (!this.graphData) {
      return false
    }
    let text = this.graphData.term

    text = this.nodeBreakLine(text)

    return text
  }

  app.computed.relativePlacementConstraint = function () {
    let rel = []

    let refRT = this.getRef('RT')
    if (Array.isArray(refRT)) {
      refRT = refRT.map(t => this.nodeBreakLine(t))
    }

    let refNT = this.getRef('NT')
    if (Array.isArray(refNT)) {
      refNT = refNT.map(t => this.nodeBreakLine(t))
    }

    let refBT = this.getRef('BT')
    if (Array.isArray(refBT)) {
      refBT = refBT.map(t => this.nodeBreakLine(t))
    }

    let refUSE = this.getRef('USE')
    if (Array.isArray(refUSE)) {
      refUSE = refUSE.map(t => this.nodeBreakLine(t))
    }

    let refUF = this.getRef('UF')
    if (Array.isArray(refUF)) {
      refUF = refUF.map(t => this.nodeBreakLine(t))
    }

    if (refRT) {
      rel.push({
        left: this.idRoot,
        right: refRT[0]
      })

      if (refBT) {
        rel.push({
          left: refBT[(refBT.length - 1)],
          right: refRT[0]
        })
      }

      if (refNT) {
        rel.push({
          left: refNT[(refNT.length - 1)],
          right: refRT[0]
        })
      }
    }

    if (refUSE) {
      rel.push({
        right: this.idRoot,
        left: refUSE[0]
      })

      if (refUF) {
        rel.push({
          top: refUSE[(refUSE.length - 1)],
          bottom: refUF[0]
        })
      }

      if (refBT) {
        rel.push({
          right: refBT[0],
          left: refUSE[0]
        })
      }

      if (refNT) {
        rel.push({
          right: refNT[0],
          left: refUSE[0]
        })
      }
    }

    if (refUF) {
      rel.push({
        right: this.idRoot,
        left: refUF[0]
      })

      if (refBT) {
        rel.push({
          right: refBT[0],
          left: refUF[0]
        })
      }

      if (refNT) {
        rel.push({
          right: refNT[0],
          left: refUF[0]
        })
      }
    }

    if (refBT) {
      rel.push({
        bottom: this.idRoot,
        top: refBT[0]
      })
    }

    if (refNT) {
      rel.push({
        top: this.idRoot,
        bottom: refNT[0]
      })
    }

    // console.log(rel)

    return rel

    // return [
    //   { 'left': 'root', 'right': 'rt1' },
    //   { 'left': 'bt2', 'right': 'rt1' },
    //   { 'left': 'nt1', 'right': 'rt1' },

    //   { 'right': 'root', 'left': 'use1' },
    //   { 'right': 'bt1', 'left': 'use1' },
    //   { 'right': 'bt1', 'left': 'uf1' },
    //   { 'right': 'nt1', 'left': 'use1' },
    //   { 'right': 'nt1', 'left': 'uf1' },
    //   { 'right': 'root', 'left': 'uf1' },

    //   { 'top': 'use1', 'bottom': 'uf1' },
    //   { 'top': 'root', 'bottom': 'nt1' },
    //   { 'bottom': 'root', 'top': 'bt1' },

    //   // { 'left': 'bt1', 'right': 'bt2' },
    //   // { 'top': 'use1', 'bottom': 'use2' },
    //   // { 'top': 'rt1', 'bottom': 'rt2' },
    // ]
  }

  app.computed.alignmentConstraint = function () {
    let vertical = []
    let horizontal = []

    // let verticalKeywords = ['USE', 'UF', 'RT']
    // this.$parent.$refs.ListThesaurus.crossReferenceKeywords.forEach((keyword) => {
    //   let ref = this.getRef(keyword)
    //   if (!ref || ref.length < 2) {
    //     return false
    //   }

    //   // console.log(verticalKeywords.indexOf(keyword), keyword)
    //   if (verticalKeywords.indexOf(keyword) > -1) {
        
    //     vertical.push(ref)
    //   }
    //   else {
    //     horizontal.push(ref)
    //   }
    //   // this.setupAlignmentConstraint(keyword, vertical, horizontal, (verticalKeywords.indexOf(keyword) > -1))
    // })

    // console.log({
    //   vertical,
    //   horizontal
    // })

    return {
      vertical,
      horizontal
      // vertical: [
      //   ["use1", "use2"],
      //   ["rt1", "rt2"],
      // ],
      // horizontal: [
      //   ["bt1", "bt2"],
      // ]
    }
  }
}