<template>
  <div id="disqus_thread"></div>
</template>
<script>
export default {
  //var disqus_config = function () {
  //this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
  //this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  //};
  methods: {
    setDisqus() {
      var d = document,
        s = d.createElement("script");
      s.src = "https://tunas-blog.disqus.com/embed.js";
      s.setAttribute("data-timestamp", new Date());      (d.head || d.body).appendChild(s);
    }
  },
  created() {
    this.setDisqus();
  }
};
</script>
