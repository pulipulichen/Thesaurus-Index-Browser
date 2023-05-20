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
    
    // console.log('沒有這個詞彙？', this.localConfig.termFocus)
    if (!this.localConfig.termFocus) {
      // console.log('沒有這個詞彙？')
      return null
    }

    for (let i = 0; i < list.length; i++) {
      let {term} = list[i]
      if (term === this.localConfig.termFocus) {
        return list[i]
      }
    }

    // 如果都沒有找到的話
    return list[0]
  }

  let locatorSizeLimit = 8
  List.methods.displayLocator = function (loc) {
    if (loc.length < locatorSizeLimit) {
      return loc
    }

    let half = Math.ceil(locatorSizeLimit / 2) - 1
    return loc.slice(0, half) + '...' + loc.slice(half * -1)
  }

  List.methods.getComplexestTerm = function (list) {
    let maxScore = 0
    let complexest

    for (let i = 0; i < list.length; i++) {
      
      let score = 0
      let types = Object.keys(list[i].crossReference)
      score = score + (types.length * types.length * types.length)


      types.forEach(type => {
        let count = list[i].crossReference[type].length
        count = Math.sqrt(count) * 10
        score = score + count
      })

      // console.log(score, list[i].term, types.length, list[i].crossReference)
      if (i === 0 || 
          score > maxScore) {
        maxScore = score
        complexest = list[i]
        // console.log(score, complexest.term)
      }
    }

    return complexest
  }
  
}