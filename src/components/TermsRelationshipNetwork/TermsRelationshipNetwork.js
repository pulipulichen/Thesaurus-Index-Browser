/* global Node */
//import $ from 'jquery'

let app = {
  props: ['config', 'localConfig', 'utils'],
  data() {
    this.$i18n.locale = this.config.localConfig
    return {
      postMessageAPI: null,
      graphData: null,
      // cy: null
    }
  },
  components: {
  },
  computed: {
  },
  watch: {
    
  },
  mounted() {
    // setTimeout(() => {
    //   this.initCytoscapeVis()
    // }, 500)

  },
  methods: {
  }
}

import TermsRelationshipNetworkWatch from './TermsRelationshipNetworkWatch.js'
TermsRelationshipNetworkWatch(app)

import TermsRelationshipNetworkComputed from './TermsRelationshipNetworkComputed.js'
TermsRelationshipNetworkComputed(app)

import TermsRelationshipNetworkComputedCytoscape from './TermsRelationshipNetworkComputedCytoscape.js'
TermsRelationshipNetworkComputedCytoscape(app)

import TermsRelationshipNetworkMethods from './TermsRelationshipNetworkMethods.js'
TermsRelationshipNetworkMethods(app)

import TermsRelationshipNetworkMethodsCytoscape from './TermsRelationshipNetworkMethodsCytoscape.js'
TermsRelationshipNetworkMethodsCytoscape(app)

//import IndexMethodsTest from './IndexMethodsTest.js'
//IndexMethodsTest(Index)

export default app