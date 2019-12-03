<script>
  export default {
    name: 'TimelineItemBase',

    props: {
      bgColor: { // 设置圆圈和圆圈的边框颜色。
        type: String,
        default: ''
      },
      lineColor: {  // 仅设置圆的边框颜色。
        type: String,
        default: ''
      },
      hollow: {  //控制圆是否空心。
        type: Boolean,
        default: false
      },
      iconSize: {
        type: String,
        default: ''
      },
      fontColor: {
        type: String,
        default: '#37414a'
      },
    },

    data () {
      return {
        slotOthers: false,
        iconSizeData: {
            'small' : {
                'top': '.28em', 'left': '-34px', 'width': '10px', 'height': '10px'
            },
            'medium' : {
                'top': '0em', 'left': '-39.5px', 'height': '20px', 'width': '20px'
            },
            'large' : {
                'top': '-0.5em', 'left': '-44px', 'height': '30px', 'width': '30px'
            }
        }
      }
    },

    computed: {
      circleStyle () {
        if (!this.bgColor && !this.lineColor && !this.hollow && !this.iconSize) return
        let style = {}
        if (this.bgColor) {
          style = {
            'border-color': this.bgColor,
            'background-color': this.bgColor
          }
        }
        if (this.lineColor) {
          style = Object.assign({}, style, {
            'border-color': this.lineColor
          })
        }
        if (this.iconSizeData[this.iconSize]) {
          style = Object.assign({}, style,
            this.iconSizeData[this.iconSize]
          )
        }
        return style
      },
      itemStyle () {
        return {
          'color': this.fontColor
        }
      },
      slotClass () {
        let className = '';
        if (this.slotOthers) {
          className = 'timeline-others'
        }
        else if (this.hollow){
          className = 'hollow'
        }

        return className
      }
    },

    mounted () {
      this.slotOthers = !!this.$refs.others.innerHTML
    },
  }
</script>
