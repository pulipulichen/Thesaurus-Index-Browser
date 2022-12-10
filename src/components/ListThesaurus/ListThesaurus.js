let app = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.localConfig.locale
    return {
      crossReferenceKeywords: [
        'USE',
        'UF',
        'NT',
        'BT',
        'RT'
      ],
      searchScrollTimer: null,
      posTimer: null
    }
  },
  watch: {
    'localConfig.locale'() {
      this.$i18n.locale = this.localConfig.locale;
    },
    'localConfig.searchThesaurusCurrent' (current) {
      if (current === -1) {
        this.localConfig.searchThesaurusCurrentPos = -1
        return false
      }
      this.localConfig.searchThesaurusCurrentPos = this.searchMatched[current]
    },
    'localConfig.searchThesaurusCurrentPos' (pos) {
      this.scrollTo(this.localConfig.searchThesaurusCurrent)
    },
    'localConfig.termFocus' (term) {
      if (term === '' || !term) {
        return false
      }

      this.localConfig.searchThesaurus = ''
      let pos = this.terms.indexOf(term)
      this.scrollIntoView(pos)
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
      return this.parseList(this.localConfig.dataThesaurus)
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
    searchMatched () {
      if (this.localConfig.searchThesaurus === '') {
        this.localConfig.searchThesaurusCurrent = -1
        return []
      }

      let matched = this.filterMatched(this.localConfig.searchThesaurus)
      this.localConfig.searchThesaurusCurrent = -1
      this.localConfig.termFocus = null

      if (this.localConfig.searchGlobal !== this.localConfig.searchThesaurus) {
        this.localConfig.searchGlobal = ''
      }
        
      
      clearTimeout(this.posTimer)
      this.posTimer = setTimeout(() => {
        if (matched.length === 0) {
          return false
        }
        this.localConfig.searchThesaurusCurrent = this.selectNearestPos(matched)
        this.localConfig.searchThesaurusCurrentPos = matched[this.localConfig.searchThesaurusCurrent]
      }, 100)
      
      // console.log(this.localConfig.searchThesaurusCurrent)


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

      this.localConfig.searchThesaurus = ''
      let pos = this.terms.indexOf(term)
      this.scrollIntoView(pos)
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