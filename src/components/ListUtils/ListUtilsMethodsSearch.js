module.exports = function (List) {
  List.methods.filterMatched = function (searchKeyword) {
    if (searchKeyword.trim() === '') {
      return []
    }
    searchKeyword = searchKeyword.trim().toLowerCase()
    let matched = []

    this.terms.forEach((term, i) => {
      if (term.trim().toLowerCase().indexOf(searchKeyword) > -1) {
        matched.push(i)
      }
    })

    return matched
  }

  List.methods.searchNext = function (key) {
    this.localConfig[key]++

    if (this.localConfig[key] >= this.searchMatched.length) {
      this.localConfig[key] = 0
    }
  }

  List.methods.searchPrev = function (key) {
    this.localConfig[key]--

    if (this.localConfig[key] < 0) {
      this.localConfig[key] = this.searchMatched.length - 1
    }
  }

  List.methods.shouldBeHighlighted = function (i) {
    if (this.searchMatched.length === 0) {
      return false
    }

    // console.log(i)
    return (Array.isArray(this.searchMatched) && this.searchMatched.indexOf(i) > -1)
  }

  List.methods.shouldBeFocus = function (i, current) {
    if (!this.shouldBeHighlighted(i)) {
      return false
    }

    let pos = this.searchMatched.indexOf(i)
    return (current === pos)
  }

  List.methods.shouldBeStrongFocus = function (term) {
    // console.log(this.localConfig.termFocus, term)
    if (!this.localConfig.termFocus) {
      return false
    }
    
    return (this.localConfig.termFocus === term)
  }
  

  List.methods.scrollTo = function (current) {
    if (!this.$refs.item) {
      return false
    }

    clearTimeout(this.searchScrollTimer)

    if (current === -1) {
      return false
    }

    this.searchScrollTimer = setTimeout(() => {
      let pos = this.searchMatched[current]
      if (!this.$refs.item || !this.$refs.item[pos]) {
        return false
      }
      
      this.scrollIntoView(pos)
    }, 100)
  }

  List.methods.scrollIntoView = function (pos) {
    // this.$refs.item[pos].scrollIntoView({
    //   behavior: "smooth", 
    //   block: "center", 
    //   inline: "nearest"
    // })

    if (!this.$refs.item) {
      return false
    }

    let ele = this.$refs.item[pos]
    if (ele === undefined) {
      return false
    }

    let eleHalf = ele.offsetHeight / 2
    let containerHalf = (this.$refs.container.offsetHeight / 2)

    if (eleHalf > containerHalf) {
      eleHalf = containerHalf - 30
    }
    let offsetTop = (ele.offsetTop + eleHalf)

    // let scrollTop = this.$refs.container.scrollTop
    

    offsetTop = offsetTop - containerHalf


    // console.log(offsetTop)
    this.$refs.container.scrollTo({top: offsetTop, behavior: "smooth"})
  }

  List.methods.displayTerm = function (term, search) {
    if (!search || search.trim() === '') {
      return term
    }

    let lTerm = term.toLowerCase()
    let lSearch = search.toLowerCase()

    let parts = lTerm.split(lSearch)
    let posList = []
    let len = 0
    parts.forEach(part => {
      posList.push(len + part.length)
      len = len + part.length

      if (len < term.length + 1) {
        posList.push(len + search.length)
        len = len + search.length
      }
    })
    let output = []

    for (let i = 0; i < posList.length; i++) {
      let start = 0
      if (i > 0) {
        start = posList[(i - 1)]
      }
      let end = posList[i]

      let t = term.slice(start, end)
      if (i % 2 === 1) {
        t = '<span class="matched">' + t + '</span>'
      }
      output.push(t)
    }

    return output.join('')
  }

  List.methods.selectNearestPos = function (matched) {
    // console.log(this.$refs.container.scrollTop)
    // console.log(this.termsOffsetTop)

    let scrollTop = this.$refs.container.scrollTop
    for (let i = 0; i < this.termsOffsetTop.length; i++) {
      if (this.termsOffsetTop[i] > scrollTop) {
        // console.log(this.termsOffsetTop[i], scrollTop, i)
        let nearestPos = i
        
        for (let j = 0; j < matched.length; j++) {
          // console.log(matched[j], nearestPos)
          if (matched[j] >= nearestPos) {
            return j
          }
          // else {
          //   console.log(['A', scrollTop, this.termsOffsetTop[i], nearestPos, matched[j], matched.length, matched, this.termsOffsetTop])
          //   return matched.length - 1
          // }
        }

        // console.log(['B', scrollTop, this.termsOffsetTop[i], nearestPos, matched.length, matched, this.termsOffsetTop])
        return 0

      }
    }

    console.log(['C', scrollTop, this.termsOffsetTop, matched, matched.length])
    return 0
  }
}