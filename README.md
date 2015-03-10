# lightbox
Simple lightbox effect for images and iframes (using Vanilla JS)

# Usage
```
<a href="//c3.staticflickr.com/3/2921/14110628260_d7d1e4ec5c_z.jpg" lightbox="image">Image</a>
<a href="//www.youtube.com/watch?v=N9K90cA3LZQ" lightbox="iframe" url="//www.youtube.com/embed/N9K90cA3LZQ?autoplay=1">YouTube</a>
<a href="//vimeo.com/49695922" lightbox="iframe" url="//player.vimeo.com/video/49695922?autoplay=true">Vimeo</a>
```

```
[].forEach.call(document.querySelectorAll('[lightbox]'), function(el) {
  el.lightbox = new Lightbox(el);
});
```
