module.exports = function (List) {
  List.methods.getTerms = function (list) {
    let terms = this.list.map(i => i.term)
    // console.log(terms)
    return terms
  }

  List.methods.getTermsOffsetTop = function (list) {
    if (!this.$refs.item) {
      return []
    }
    return this.$refs.item.map(ele => ele.offsetTop)
  }

  List.methods.getGraphData = function (list) {
    
    if (!this.localConfig.termFocus) {
      return null
    }

    for (let i = 0; i < list.length; i++) {
      let {term} = list[i]
      if (term === this.localConfig.termFocus) {
        return list[i]
      }
    }
  }
}