<template>
  <div class="item" @mouseover="onHover" @mouseout="offHover" @click="gotoProject">
    <img :class="{hover: isHovered}" :src="thumbnail" :alt="name" />
    <div class="item__info">
      <div :class="{'item__info-background': true, hover: isHovered}"></div>
      <div :class="{'item__info-text': true, hover: isHovered}">
        <p class="item__title">{{name}} &mdash; <span>{{client}}</span></p>
        <p class="item__agency">
          <span v-for="role in roles">{{role}}</span> [at] {{agency}}
        </p>
        <p class="item__tech">
          <span v-for="type in tech">{{type}}</span>
        </p>
        <p class="item__active" v-if="isActive">Online</p>
        <p class="item__active" v-else>Offline</p>
      </div>
    </div>
  </div>
</template>

<script>
  module.exports = {
    props: ['name', 'link', 'client', 'agency', 'roles', 'tech', 'isActive', 'date', 'thumbnail'],
    data() {
      return {
        isHovered: false
      }
    },
    methods: {
      onHover(event) {
        this.isHovered = true;
      },
      offHover(event) {
        this.isHovered = false;
      },
      gotoProject(event) {
        if(this.link) {
          window.location = this.link;
        }
      }
    }
  }
</script>

<style lang="scss">
  @import "vars";

    .fade-transition {
      -webkit-transition: all .5s;
         -moz-transition: all .5s;
          -ms-transition: all .5s;
           -o-transition: all .5s;
              transition: all .5s;
      position: relative;
      opacity: 1;
      top: 0px;
    }

    .fade-enter,
    .fade-leave {
      opacity: 0;
      top: -10px;
    }

  .item{
    float: left;
    width: 33.3%;
    overflow: hidden;
    cursor: pointer;
    position: relative;
    box-sizing: border-box;
    max-height: 380px;

    @media #{$sm-mobile} {
      width: 100%;
      max-width: 480px;
    }

    @media #{$mobile} {
      width: 50%;
    }

    @media #{$sm-desktop} {
      width: 33.3%;
    }

    @media #{$desktop} {
      width: 25%;
    }

    @media #{$lg-desktop} {
      width: 20%;
    }

    img{
      padding: 0;
      margin: 0;
      -webkit-transform: scale(1);
         -moz-transform: scale(1);
        -ms-transform: scale(1);
         -o-transform: scale(1);
          transform: scale(1);
      -webkit-transition: -webkit-transform .2s;
         -moz-transition: -moz-transform .2s;
        -ms-transition: -ms-transform .2s;
         -o-transition: --o-transform .2s;
          transition: transform .2s;

      &.hover {
        -webkit-transform: scale(1.3);
           -moz-transform: scale(1.3);
          -ms-transform: scale(1.3);
           -o-transform: scale(1.3);
            transform: scale(1.3);
      }

      @media #{$mobile} {
        -webkit-transform: scale(1.3);
           -moz-transform: scale(1.3);
          -ms-transform: scale(1.3);
           -o-transform: scale(1.3);
            transform: scale(1.3);
      }

      @media #{$sm-mobile} {
        -webkit-transform: scale(1.3);
           -moz-transform: scale(1.3);
          -ms-transform: scale(1.3);
           -o-transform: scale(1.3);
            transform: scale(1.3);
        height: 100%;
        width: 100%;
      }
    }

    &__info{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
    }

    &__info-text{
      display: block;
      position: absolute;
      opacity: 0;
      top: 25%;
      left: 0;
      width: 100%;
      height: 75%;
      color: $white;
      box-sizing: border-box;
      padding: 10px;
      -webkit-transition: opacity .2s .1s;
         -moz-transition: opacity .2s .1s;
        -ms-transition: opacity .2s .1s;
         -o-transition: opacity .2s .1s;
          transition: opacity .2s .1s;

      &.hover {
        opacity: 1;
      }

      @media #{$mobile} {
        opacity: 1;
      }

      @media #{$sm-mobile} {
        opacity: 1;
      }
    }

    &__title{
      font-size: 26px;
      line-height: 26px;
      margin: 0;

      span{
        font-size: 16px;
        font-weight: 600;
      }
    }

    &__tech{
      font-size: 16px;

      span{
        display: block;
        font-size: 12px;
      }
    }

    &__active{
      position: absolute;
      bottom: 10px;
      right: 10px;
      font-size: 10px;
      color: $maincolor;

      &.offline{
        color: red;
      }
    }

    &__info-background{
      display: block;
      position: absolute;
      opacity: 0;
      top: -25%;
      left: -25%;
      width: 100%;
      height: 100%;
      background-color: rgba(red($black), green($black), blue($black), 0.9);
      border-radius: 100%;
      -webkit-transform: scale(.2) rotate(60deg);
         -moz-transform: scale(.2) rotate(60deg);
        -ms-transform: scale(.2) rotate(60deg);
         -o-transform: scale(.2) rotate(60deg);
          transform: scale(.2) rotate(60deg);
      -webkit-transition: -webkit-transform .3s, left .3s .2s, top .3s .2s, opacity .1s .05s;
         -moz-transition: -moz-transform .3s, left .3s .2s, top .3s .2s, opacity .1s .05s;
        -ms-transition: -ms-transform .3s, left .3s .2s, top .3s .2s, opacity .1s .05s;
         -o-transition: --o-transform .3s, left .3s .2s, top .3s .2s, opacity .1s .05s;
          transition: transform .3s, left .3s .2s, top .3s .2s, opacity .1s .05s;

      &.hover {
        opacity: 1;
        left: 0;
        top: 0;
        -webkit-transform: scale(1.5) rotate(0);
           -moz-transform: scale(1.5) rotate(0);
          -ms-transform: scale(1.5) rotate(0);
           -o-transform: scale(1.5) rotate(0);
            transform: scale(1.5) rotate(0);
      }

      @media #{$mobile} {
        opacity: 1;
        left: 0;
        top: 0;
        -webkit-transform: scale(1.5) rotate(0);
           -moz-transform: scale(1.5) rotate(0);
          -ms-transform: scale(1.5) rotate(0);
           -o-transform: scale(1.5) rotate(0);
            transform: scale(1.5) rotate(0);
      }

      @media #{$sm-mobile} {
        opacity: 1;
        left: 0;
        top: 0;
        -webkit-transform: scale(1.5) rotate(0);
           -moz-transform: scale(1.5) rotate(0);
          -ms-transform: scale(1.5) rotate(0);
           -o-transform: scale(1.5) rotate(0);
            transform: scale(1.5) rotate(0);
      }
    }
  }
</style>