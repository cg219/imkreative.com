<template>
  <div class="art-item">
    <div class="art-item__image-container" :style="styleObject">
      <span>{{title}} / {{description}}</span>
    </div>
    
    <div class="art-item__info">
      <p class="art-item__title">{{title}}</p>
      <p class="art-item__desc">{{description}}</p>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['image', 'title', 'description', 'update'],
    data() {
      return {
        styleObject: {
          backgroundImage: `url(${this.image})`
        }
      }
    }
  }
</script>

<style lang="scss">
  @import 'vars';

  .art-item {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    overflow: hidden;
    margin-bottom: 50px;
    
    &__image-container {
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba($black, .2);
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      background-size: cover;
      background-position: center;

      span {
        display: none;
      }
    }
    
    &__info {

    }

    &__title {
      font-size: 14px;
      color: rgba($black, .7);
    }

    &__desc {
      font-size: 10px;
      color: rgba($black, .7);
      letter-spacing: .5px;
    }

  }
</style>