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
  </div>
</template>

<script>
  module.exports = {

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

  .subline {
    font-size: 24px;
    margin-top: 10px;
    padding-left: 10px;
  }


</style>