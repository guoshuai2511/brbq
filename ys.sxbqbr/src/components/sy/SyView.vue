<template>
  <div class="syPage">
    <ol-map></ol-map>
  </div>
</template>

<script>
  import OlMap from '@/components/map/OlMap'

  export default {
    name: "SyView",
    data(){
      return {

      }
    },
    components: {
      OlMap
    }
  }
</script>

<style scoped lang="scss">
  .syPage{
    background: #fff;
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    padding: 10px;
    border-radius: 3px;
  }
</style>
