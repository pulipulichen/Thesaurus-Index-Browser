module.exports = function (List) {
  List.methods.parseList = function (rawText, isIndex = false) {
    let list = []
    rawText = rawText.trim()

    

    if (rawText === '') {
      return list
    }

    let termObject = this.buildEmptyTermObject()
    
    let lines = rawText.split('\n')
    // console.log(lines)
    for (let i = 0; i < lines.length; i++) {
      let line = lines[i].trim()
      

      let isCrossReference = false

      if (line.startsWith('SN ')) {
        termObject.sn = line.slice(3)
        continue
      }

      // console.log(this.crossReferenceKeywords)
      for (let r = this.crossReferenceKeywords.length - 1; r > -1; r--) {
        let keyword = this.crossReferenceKeywords[r]
        // console.log(keyword)
        if (line.length > keyword.length + 1 && 
          line.toLowerCase().startsWith(keyword.toLowerCase() + ' ')) {
          
          let term = line.slice(keyword.length + 1).trim()
          
          if (Array.isArray(termObject.crossReference[keyword]) === false) {
            termObject.crossReference[keyword] = []
          }

          termObject.crossReference[keyword].push(term)

          isCrossReference = true
          break
        }
      } // for (let r = 0; r < this.crossReferenceKeywords.length; r++) {

      // console.log(isCrossReference)

      if (isCrossReference) {
        continue
      }

      // -------------
      // 塞進去

      if (termObject.term) {
        termObject = this.sortTermObject(termObject)
        list.push(termObject)
        termObject = this.buildEmptyTermObject()
      }

      // -------------
      // 處理詞跟locaters

      let splitor = ','
      if (line.indexOf(splitor) === -1 && isIndex) {
        if (line.indexOf(' ') > -1) {
          splitor = ' '
        }
      }

      let parts = line.split(splitor).map(t => t.trim())
      termObject.term = parts[0]
      let locators = parts.slice(1)
      if (locators.length > 0) {
        termObject.locators = locators
      }
        

    } // for (let i = 0; i < lines.length; i++) {

    if (termObject.term) {
      termObject = this.sortTermObject(termObject)
      list.push(termObject)
    }
    // console.log(list)
    return list
  }

  List.methods.buildEmptyTermObject = function () {
    let termObject = {
      term: null,
      crossReference: {}
    }

    this.crossReferenceKeywords.forEach(keyword => {
      termObject.crossReference[keyword] = []
    })

    return termObject
  }

  List.methods.sortTermObject = function (termObject) {
    if (Array.isArray(termObject.locators)) {
      termObject.locators.sort((a, b) => {
        return a.localeCompare(b)
      })
    }

    Object.keys(termObject.crossReference).forEach(keyword => {
      let list = termObject.crossReference[keyword]

      list.sort((a, b) => {
        return a.localeCompare(b)
      })

      termObject.crossReference[keyword] = list
    })

    return termObject
  }

  List.methods.buildCrossReferenceHref = function (base, ref, isLink = false) {
    let output = encodeURIComponent(base + '_' + ref)
    if (isLink) {
      output = '#' + output
    }
    return output
  }

}