/* global Node */
//import $ from 'jquery'

// import TermsRelationshipNetwork from './ViewBrowse/TermsRelationshipNetwork/TermsRelationshipNetwork.vue'
import TopMenu from './TopMenu/TopMenu.vue'
import ViewBrowse from './ViewBrowse/ViewBrowse.vue'
import ViewConfiguration from './ViewConfiguration/ViewConfiguration.vue'
import ViewData from './ViewData/ViewData.vue'

let Index = {
  props: ['config', 'localConfig', 'utils'],
  data() {
    this.$i18n.locale = this.config.localConfig
    return {
      
    }
  },
  components: {
    // TermsRelationshipNetwork,
    TopMenu,
    ViewBrowse,
    ViewConfiguration,
    ViewData
  },
  computed: {
  },
  watch: {
    'config.inited'() {
      if (this.config.inited === false) {
        return false
      }
    },
    'localConfig.dataIndex' () {
      this.setDocumentTitle()
    },
    'localConfig.dataThesaurus' () {
      this.setDocumentTitle()
    },
    'localConfig.termFocus' () {
      this.setDocumentTitle()
    }
  },
  // mounted() {
  // },
  methods: {
    setDocumentTitle () {
      let output = []

      let countIndex = this.$refs.ViewBrowse.$refs.ListIndex.list.length
      let countThesaurus = this.$refs.ViewBrowse.$refs.ListThesaurus.list.length

      if (countThesaurus === countIndex) {
        output.push(`(${countThesaurus}/${countIndex})`)
      }
      else {
        output.push(`(${countThesaurus})`)
      }

      if (this.localConfig.termFocus) {
        output.push(this.localConfig.termFocus)
      }
      if (this.localConfig.graphTerm) {
        output.push(this.localConfig.graphTerm)
      }
      else {
        output.push(this.$t('Thesaurus Index Browser'))
      }

      document.title = output.join(' ')
    }
  }
}
// import IndexMethodsPostMessage from './IndexMethodsPostMessage.js'
// IndexMethodsPostMessage(Index)

//import IndexMethodsTest from './IndexMethodsTest.js'
//IndexMethodsTest(Index)

export default Index