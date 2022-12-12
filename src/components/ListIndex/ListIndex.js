let app = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.localConfig.locale
    return {
      crossReferenceKeywords: [
        'see',
        'see also'
      ],
      searchScrollTimer: null,
      posTimer: null
    }
  },
  watch: {
    'localConfig.locale'() {
      this.$i18n.locale = this.localConfig.locale;
    },
    'localConfig.searchIndexCurrent' (current) {
      if (current === -1) {
        this.localConfig.searchIndexCurrentPos = -1
        return false
      }
      this.localConfig.searchIndexCurrentPos = this.searchMatched[current]
    },
    'localConfig.searchIndexCurrentPos' (pos) {
      this.scrollTo(this.localConfig.searchIndexCurrent)
    },
    'localConfig.termFocus' (term) {
      if (term === '' || !term) {
        return false
      }

      this.localConfig.searchIndex = ''
      this.localConfig.searchGlobal = ''
      let pos = this.terms.indexOf(term)
      this.scrollIntoView(pos)
      // console.log(term)
    },
    'config.inited' (inited) {
      if (!inited) {
        return false
      }

      this.scrollToTermFocus()
    }
  },
  computed: {
    list () {
      return this.parseList(this.localConfig.dataIndex, true)
    },
    terms () {
      return this.getTerms(this.list)
    },
    termsOffsetTop () {
      return this.getTermsOffsetTop(this.list)
    },
    graphData () {
      return this.getGraphData(this.list)
    },
    complexest () {
      return this.getComplexestTerm(this.list)
    },
    searchMatched () {
      if (this.localConfig.searchIndex === '') {
        this.localConfig.searchIndexCurrent = -1
        return []
      }

      let matched = this.filterMatched(this.localConfig.searchIndex)
      this.localConfig.searchIndexCurrent = -1
      this.localConfig.termFocus = null

      if (this.localConfig.searchGlobal !== this.localConfig.searchIndex) {
        this.localConfig.searchGlobal = ''
      }
      
      clearTimeout(this.posTimer)
      this.posTimer = setTimeout(() => {
        if (matched.length === 0) {
          return false
        }
        this.localConfig.searchIndexCurrent = this.selectNearestPos(matched)
        this.localConfig.searchIndexCurrentPos = matched[this.localConfig.searchIndexCurrent]
      }, 100)
      
      // console.log(this.localConfig.searchIndexCurrent)


      return matched
    }
  },
  // mounted() {
    
  // },
  methods: {
    scrollToTermFocus: function () {
      let term = this.localConfig.termFocus
      if (term === '' || !term) {
        return false
      }

      this.localConfig.searchIndex = ''
      let pos = this.terms.indexOf(term)
      this.scrollIntoView(pos)
    },
    alert (l) {
      window.alert(l)
    }
  }
}

import ListUtilsMethodsParse from '../ListUtils/ListUtilsMethodsParse.js'
ListUtilsMethodsParse(app)

import ListUtilsMethodsSearch from '../ListUtils/ListUtilsMethodsSearch.js'
ListUtilsMethodsSearch(app)

import ListUtilsMethodsComputed from '../ListUtils/ListUtilsMethodsComputed.js'
ListUtilsMethodsComputed(app)

export default app