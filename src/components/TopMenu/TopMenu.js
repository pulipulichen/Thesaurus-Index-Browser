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
    'localConfig.searchGlobal' (search) {
      if (this.config.inited === false) {
        return false
      }

      if (search === '') {
        return false
      }

      this.localConfig.searchIndex = search
      this.localConfig.searchThesaurus = search
    }
  },
  computed: {
    
  },
  mounted() {
    
  },
  methods: {
    
  }
}

export default app