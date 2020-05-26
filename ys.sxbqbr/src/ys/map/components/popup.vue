<template>
  <div :id="id" class="ys-popup">
    <div id="popup-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Overlay from 'ol/Overlay';
  export default {
    data(){
      return {
        overlay:null
      }
    },
    props:{
      position:Array,
      map:Object,
      id:String
    },
    mounted() {
      if (this.map && !this.overlay) {
        this.overlay = new Overlay({
          element: document.getElementById(this.id),
          autoPan: true,
          autoPanAnimation: {
            duration: 250
          }
        });
        this.overlay.setPosition(undefined);
        this.map.map.addOverlay(this.overlay);
        this.map.popup = this.overlay;
      }
    },
    watch:{
      position(newP){
        this.overlay.setPosition(newP);
      },
      map(map){
        if(map&&!this.overlay){
          this.overlay = new Overlay({
            element: document.getElementById(this.id),
            autoPan: true,
            autoPanAnimation: {
              duration: 250
            }
          });
          this.overlay.setPosition(undefined);
          this.map.map.addOverlay(this.overlay);
          this.map.popup = this.overlay;
        }
      }
    },
    methods:{
      closePopup(){
        this.overlay.setPosition(undefined);
        return false;
      }
    }
  }
</script>
<style scoped>
  .ys-popup {
    position: absolute;
    background-color: #FFFFFF;
    -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
    bottom: 28px;
    left: -47px;
    width: 320px;
  }
  .ys-popup:after, .ys-popup:before {
    top: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .ys-popup:after {
    border-top-color: #FFFFFF;
    border-width: 10px;
    left: 48px;
    margin-left: -10px;
  }
  .ys-popup:before {
    border-top-color: #FFFFFF;
    border-width: 11px;
    left: 48px;
    margin-left: -11px;
  }
  .ys-popup-closer {
    text-decoration: none;
    position: absolute;
    top: 5px;
    right: 8px;
    color: #ffffff;
  }
  .ys-popup-closer:after {
    content: "✖";
  }
</style>
