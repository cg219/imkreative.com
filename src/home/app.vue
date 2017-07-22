<template>
  <div class="container">
    <h1 class="header">Mente Gee</h1>

    <nav class="social-nav">
      <ul>
        <li><a href="">email</a></li>
        <li><a href="">instagram</a></li>
        <li><a href="">youtube</a></li>
      </ul>
    </nav>
  
    <h2 class="subheader">The Gist</h2>
    <p>I create <a href="/art">art</a>. I develop <a href="/portfolio">web apps</a>. I <a href="/blog">blog</a> my thoughts.</p>
    <p class="subline">&mdash; Just an all around Kreative.</p>
    
    <div class="network-content">
      <ul>
        <li>
          <h2 class="subheader">Latest Post</h2>
          <a :href="postInfo.url">
            <div class="thumbnail" :style="postBackground"></div>
          </a>
          <h3 class="content-title">{{postInfo.title}}</h3>
        </li>
        <li>
          <h2 class="subheader">Featured Shop Item</h2>
          <a :href="itemInfo.url">
            <div class="thumbnail" :style="itemBackground"></div>
          </a>
          <h3 class="content-title">{{itemInfo.title}}</h3>
        </li>
        <li>
          <h2 class="subheader">Latest Web App</h2>
          <a :href="appInfo.url">
            <div class="thumbnail" :style="appBackground"></div>
          </a>
          <h3 class="content-title">{{appInfo.title}}</h3>
        </li>
      </ul>
    </div>
    
  </div>
</template>

<script>
  const axios = require('axios');
  const shopify = require('./../global/shopify');

  const secret = 'a64c85be6766';//'21b9406958b1';
  const client = 'ghost-frontend';
  const api_url = `/blog/ghost/api/v0.1/posts?client_id=${client}&client_secret=${secret}`;
  const product_base_url = '/art/shop/product';
  const blog_base_url = '/blog';
  const portfolio_base_url = '/portfolio';

  module.exports = {
    data() {
      return {
        postInfo: {
          url: "",
          image: "",
          title: ""
        },
        itemInfo: {
          url: "",
          image: "",
          id: "",
          title: ""
        },
        appInfo: {
          url: "",
          image: "",
          title: ""
        }
      }
    },
    computed: {
        postBackground() {
          return {
            backgroundImage: `url('${this.postInfo.image}')`
          }
        },
        itemBackground() {
          return {
            backgroundImage: `url('${this.itemInfo.image}')`
          }
        },
        appBackground() {
          return {
            backgroundImage: `url('${this.appInfo.image}')`
          }
        }
    },
    created() {
      axios.get(api_url)
        .then(response => {
          this.postInfo = {
            url: `${blog_base_url}${response.data.posts[0].url}`,
            image: response.data.posts[0].image,
            title: response.data.posts[0].title
          }
        })

      shopify.fetchQueryProducts({collection_id: '391278534'})
        .then(products => {
          this.itemInfo = {
            url: `${product_base_url}/${products[0].id}`,
            image: products[0].selectedVariantImage.variants[6].src,
            id: products[0].id,
            title: products[0].title
          }
        })

      axios.get('/api/entries')
        .then(response => {
          let webApp = response.data[0];

          this.appInfo = {
            url: webApp.link || portfolio_base_url,
            image: webApp.thumbnail,
            title: webApp.name
          }
        });
    }
  }
</script>

<style lang="scss">
  @import "vars";

  div {
    padding: 30px;
  }

  p {
    font-size: 40px;
    margin: 0;
  }

  .network-content {
    padding-left: 0;
    padding-right: 0;

    ul {
      list-style-type: none;
      display: flex;
      margin: 0;
      padding: 0;

      li {
        width: 30%;
        margin-right: 3.33%;
      }
    }

    a {
      display: block;
      height: 175px;
      width: 100%;
      overflow: hidden;
      border: 1px solid lighten($black, 50%);

      &:hover {
        .thumbnail {
          transform: scale(1.1);
        }
      }
    }

    .thumbnail {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: center center;
      padding: 0;
      -webkit-transition: transform .3s ease-out;
         -moz-transition: transform .3s ease-out;
          -ms-transition: transform .3s ease-out;
           -o-transition: transform .3s ease-out;
              transition: transform .3s ease-out;
    }

    @media #{$mobile} {
      ul {
        flex-direction: column;

        li {
          width: 100%;
          margin-right: 0;
        }
      }

      a {
        height: 250px;
      }
      
    }

    @media #{$sm-mobile} {
      ul {
        flex-direction: column;

        li {
          width: 100%;
          margin-right: 0;
        }
      }

      a {
        height: 250px;
      }
      
    }
  }

  .social-nav {
    ul {
      float: right;
      display: flex;
      flex-direction: column;
      list-style-type: none;
      padding: 0;
      margin: 0;

      li {
        display: inline-block;
        width: auto;
        font-size: 14px;
        text-align: right;
        line-height: 30px;
      }

      a {
        font-weight: 400;
      }
    }
  }

  .header {
    font-size: 20px;
    color: $black;
    font-weight: 400;
  }

  .subheader {
    font-size: 16px;
    color: $black;
    margin: 0 0 5px;
    padding-top: 20px;
    text-transform: uppercase;
    clear: both;
    font-weight: 600;
  }

  .content-title {
    @extend .subheader;
    font-size: 14px;
    margin: 0;
    padding-top: 10px;
  }

  .subline {
    font-size: 24px;
    margin-top: 10px;
    padding-left: 10px;
  }


</style>