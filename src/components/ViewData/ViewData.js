const $ = require('jquery')

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
  computed: {
    
  },
  mounted() {
    this.init()
  },
  methods: {
    init: async function () {
      await this.utils.AsyncUtils.sleep(1000)
      
      let initCount = 0
      if (this.localConfig.dataIndex.trim() === '') {
        this.resetIndex()
        initCount++
      }

      if (this.localConfig.dataThesaurus.trim() === '') {
        this.resetThesaurus()
        initCount++
      }

      if (initCount === 2) {
        setTimeout(() => {
          this.localConfig.view = 'browse'
        }, 3000)
      }
    },
    resetIndex: function () {
      $.get('./assets/data/index.txt', (data) => {
        this.localConfig.dataIndex = data
      })
    },
    resetIndexConfirm: function () {
      if (this.localConfig.dataIndex !== '' && 
          !window.confirm(this.$t('Are you sure to reset current index?'))) {
        return false
      }
      this.resetIndex()
    },
    resetThesaurus: function () {
      $.get('./assets/data/thesaurus.txt', (data) => {
        this.localConfig.dataThesaurus = data
      })
    },
    resetThesaurusConfirm: function () {
      if (this.localConfig.dataThesaurus !== '' && 
          !window.confirm(this.$t('Are you sure to reset current thesaurus?'))) {
        return false
      }
      this.resetThesaurus()
    },
  }
}

export default app