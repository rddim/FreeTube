import Vue from 'vue'

import FtFlexBox from '../ft-flex-box/ft-flex-box.vue'
import FtIconButton from '../ft-icon-button/ft-icon-button.vue'
import FtButton from '../ft-button/ft-button.vue'
import FtToggleSwitch from '../ft-toggle-switch/ft-toggle-switch.vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  name: 'FtShareButton',
  components: {
    'ft-flex-box': FtFlexBox,
    'ft-icon-button': FtIconButton,
    'ft-button': FtButton,
    'ft-toggle-switch': FtToggleSwitch
  },
  props: {
    id: {
      type: String,
      required: true
    },
    playlistId: {
      type: String,
      default: ''
    },
    getTimestamp: {
      type: Function,
      required: true
    }
  },
  data: function () {
    return {
      includeTimestamp: false
    }
  },
  computed: {
    invidiousInstance: function () {
      return this.$store.getters.getInvidiousInstance
    },

    invidiousURL() {
      let videoUrl = `${this.invidiousInstance}/watch?v=${this.id}`
      // `playlistId` can be undefined
      if (this.playlistId && this.playlistId.length !== 0) {
        // `index` seems can be ignored
        videoUrl += `&list=${this.playlistId}`
      }
      return videoUrl
    },

    invidiousEmbedURL() {
      return `${this.invidiousInstance}/embed/${this.id}`
    },

    youtubeURL() {
      let videoUrl = `https://www.youtube.com/watch?v=${this.id}`
      // `playlistId` can be undefined
      if (this.playlistId && this.playlistId.length !== 0) {
        // `index` seems can be ignored
        videoUrl += `&list=${this.playlistId}`
      }
      return videoUrl
    },

    youtubeShareURL() {
      // `playlistId` can be undefined
      if (this.playlistId && this.playlistId.length !== 0) {
        // `index` seems can be ignored
        return `https://www.youtube.com/watch?v=${this.id}&list=${this.playlistId}`
      }
      return `https://youtu.be/${this.id}`
    },

    youtubeEmbedURL() {
      return `https://www.youtube-nocookie.com/embed/${this.id}`
    }
  },
  methods: {
    copy(text) {
      navigator.clipboard.writeText(text)
    },

    openInvidious() {
      this.openExternalLink(this.getFinalUrl(this.invidiousURL))
      this.$refs.iconButton.focusOut()
    },

    copyInvidious() {
      this.showToast({
        message: this.$t('Share.Invidious URL copied to clipboard')
      })
      this.copy(this.getFinalUrl(this.invidiousURL))
      this.$refs.iconButton.focusOut()
    },

    openYoutube() {
      this.openExternalLink(this.getFinalUrl(this.youtubeURL))
      this.$refs.iconButton.focusOut()
    },

    copyYoutube() {
      this.showToast({
        message: this.$t('Share.YouTube URL copied to clipboard')
      })
      this.copy(this.getFinalUrl(this.youtubeShareURL))
      this.$refs.iconButton.focusOut()
    },

    openYoutubeEmbed() {
      this.openExternalLink(this.getFinalUrl(this.youtubeEmbedURL))
      this.$refs.iconButton.focusOut()
    },

    copyYoutubeEmbed() {
      this.showToast({
        message: this.$t('Share.YouTube Embed URL copied to clipboard')
      })
      this.copy(this.getFinalUrl(this.youtubeEmbedURL))
      this.$refs.iconButton.focusOut()
    },

    openInvidiousEmbed() {
      this.openExternalLink(this.getFinalUrl(this.invidiousEmbedURL))
      this.$refs.iconButton.focusOut()
    },

    copyInvidiousEmbed() {
      this.showToast({
        message: this.$t('Share.Invidious Embed URL copied to clipboard')
      })
      this.copy(this.getFinalUrl(this.invidiousEmbedURL))
      this.$refs.iconButton.focusOut()
    },

    updateIncludeTimestamp() {
      this.includeTimestamp = !this.includeTimestamp
    },

    getFinalUrl(url) {
      if (url.indexOf('?') === -1) {
        return this.includeTimestamp ? `${url}?t=${this.getTimestamp()}` : url
      }
      return this.includeTimestamp ? `${url}&t=${this.getTimestamp()}` : url
    },

    ...mapActions([
      'showToast',
      'openExternalLink'
    ])
  }
})
