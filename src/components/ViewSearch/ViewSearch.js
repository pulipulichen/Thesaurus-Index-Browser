import { use } from 'cytoscape';

const $ = require('jquery')

let app = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.localConfig.locale
    return {
      termScoreCache: {},
      queryResults: [],
      notFound: false,
      bestQuery: null
    }
  },
  watch: {
    'localConfig.locale'() {
      this.$i18n.locale = this.localConfig.locale;
    },
    'localConfig.dataThesaurus' () {
      if (this.config.inited !== true) {
        return false
      }
      this.localConfig.searchQuery = null
    },
    'localConfig.dataIndex' () {
      if (this.config.inited !== true) {
        return false
      }
      this.localConfig.searchQuery = null
    },
    'localConfig.view' () {
      if (this.localConfig.view === 'search' && 
          this.config.inited === true &&
          (!this.localConfig.searchQuery || this.localConfig.searchQuery === '')) {
        // console.log('okok', this.localConfig.searchQuery, this.config.inited)
        this.initSearchQuery()
      }
    }
  },
  computed: {
    listThesaurus () {
      return this.$parent.$refs.ViewBrowse.$refs.ListThesaurus.list
    },
    listIndex () {
      return this.$parent.$refs.ViewBrowse.$refs.ListIndex.list
    },
    mapThesaurus () {
      let list = this.listThesaurus
      let output = {}

      for (let i = 0; i < list.length; i++) {
        let {term, crossReference, sn} = list[i]
        output[term] = { crossReference, sn }
      }
      return output
    },
    mapIndex () {
      let list = this.listIndex
      let output = {}

      for (let i = 0; i < list.length; i++) {
        let {term, crossReference, locators} = list[i]
        output[term] = { crossReference, locators }
      }
      return output
    },
    finalTerm () {
      let count = this.queryResults.length
      if (count === 0) {
        return false
      }

      return this.queryResults[count - 1].term
    },
    searchQuery () {
      return this.localConfig.searchQuery.trim()
    },
    searchQueryIsEmpty () {
      return (this.searchQuery === '')
    }
  },
  mounted() {
    // this.init()
  },
  methods: {
    // init: async function () {

    //   // console.error('test 20230521-0036')
    //   // setTimeout(() => {
    //   //   this.localConfig.view = 'search'
    //   //   this.doQuery()
    //   // }, 6000)
    // },
    initSearchQuery () {
      // 找尋有USE
      // return console.log(this.listIndex)
      // return console.log(this.listThesaurus)
      
      let bestQuery
      let bestScore = 0
      for (let i = 0; i < this.listThesaurus.length; i++) {
        let {crossReference, term, sn} = this.listThesaurus[i]
        // let 

        let itemIndex = this.mapIndex[term]
        let locators = []
        if (itemIndex) {
          locators = itemIndex.locators
        }

        let score = 0
        if (Array.isArray(crossReference.USE) && crossReference.USE.length > 0) {
          let useTerm = crossReference.USE[0]
          // 查查看對面
          if (this.mapThesaurus[useTerm]) {
            score = score + 100
            let useItem = this.mapThesaurus[useTerm] 
            let termScore = this.calculateTermScore(useTerm, useItem.crossReference, useItem.locators, useItem.sn)
            // console.log(useTerm, termScore)
            score = score + termScore
          }
        }
        else {
          score = this.calculateTermScore(term, crossReference, locators, sn)
        }

        // console.log(term, score)

        if (score > bestScore) {
          bestScore = score
          bestQuery = term
        }

        if (bestScore >= 160) {
          break
        }
      }
      
      // console.log(this.listThesaurus)
      this.bestQuery = bestQuery
      this.localConfig.searchQuery = bestQuery
    },
    calculateTermScore (term, crossReference, locators, sn) {
      if (this.termScoreCache[term]) {
        return this.termScoreCache[term]
      }

      let {BT, NT, RT, UF} = crossReference
      // console.log(BT, NT, RT, UF)
      let score = 0

      if (Array.isArray(BT) && BT.length > 0) {
        score = score + 30

        let countScore = BT.length
        if (countScore > 5) {
          countScore = 5
        }
        score = score + countScore
      }

      if (Array.isArray(NT) && NT.length > 0) {
        score = score + 30

        let countScore = NT.length
        if (countScore > 5) {
          countScore = 5
        }
        score = score + countScore
      }

      if (Array.isArray(RT) && RT.length > 0) {
        score = score + 10

        let countScore = RT.length
        if (countScore > 5) {
          countScore = 5
        }
        score = score + countScore
      }

      if (Array.isArray(UF) && UF.length > 0) {
        score = score + 5

        let countScore = UF.length
        if (countScore > 3) {
          countScore = 3
        }
        score = score + countScore
      }

      if (Array.isArray(locators) && locators.length > 0) {
        score = score + 5

        let countScore = locators.length
        if (countScore > 3) {
          countScore = 3
        }
        score = score + countScore
      }

      if (sn) {
        score = score + 5
      }

      this.termScoreCache[term] = score

      return score
    },
    doQuery (term) {
      // console.log(term)
      this.queryResults = []
      this.notFound = false

      if (typeof(term) === 'string') {
        this.localConfig.searchQuery = term
      }

      if (!this.localConfig.searchQuery || 
          this.localConfig.searchQuery.trim() === '') {
          return false
      }

      let query = this.localConfig.searchQuery.trim()

      // console.log(this.queryResults)

      let item1Thesaurus = this.mapThesaurus[query]
      if (!item1Thesaurus) {
        // this.errorMessage = this.$t(`<strong>${query}</strong> is not found.`)
        let terms = this.searchThesaurusTerms(query)
        if (terms.length === 0) {
          this.notFound = true
        }
        else {
          this.notFound = terms
        }  
        return false
      }

      let result1 = {...item1Thesaurus}
      result1.term = query
      
      let item1Index = this.mapIndex[query]
      if (item1Index) {
        result1.locators = item1Index.locators
      }
      this.queryResults.push(result1)

      if (Array.isArray(item1Thesaurus.crossReference.USE) && item1Thesaurus.crossReference.USE.length > 0) {
        let useTerm = item1Thesaurus.crossReference.USE[0]

        let item2Thesaurus = this.mapThesaurus[useTerm]
        let result2 = {...item2Thesaurus}
        result2.term = useTerm

        let item2Index = this.mapIndex[useTerm]
        if (item2Index) {
          result2.locators = item2Index.locators
        }
        this.queryResults.push(result2)
      }

      // console.log(this.queryResults)
    },
    searchThesaurusTerms(query) {
      let terms = Object.keys(this.mapThesaurus)
      return terms.filter(term => term.indexOf(query) > -1)
    },
    displayMatchedTerm (term) {
      
      let parts = term.split(this.searchQuery)

      for (let i = 0; i < parts.length - 1; i++) {
        parts[i] = parts[i] + `<u>${this.searchQuery}</u>`
      }

      return parts.join('')
    }
  }
}

export default app