import TermsRelationshipNetwork from './../TermsRelationshipNetwork/TermsRelationshipNetwork.vue'
import ListThesaurus from './../ListThesaurus/ListThesaurus.vue'
import ListIndex from './../ListIndex/ListIndex.vue'

let app = {
  props: ['config', 'localConfig', 'utils'],
  data () {    
    this.$i18n.locale = this.localConfig.locale
    return {
    }
  },
  watch: {
    'localConfig.locale'() {
      this.$i18n.locale = this.localConfig.locale;
    },
  },
  components: {
    TermsRelationshipNetwork,
    ListThesaurus,
    ListIndex
  },
  computed: {
    
  },
  mounted() {
    
  },
  methods: {
    
  }
}

export default app