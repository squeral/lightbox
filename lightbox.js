var Lightbox = function(elem) {
	this.trigger = elem;
	this.el = document.querySelector('.lightbox');
	this.body = document.querySelector('.lightbox .body');
	this.content = document.querySelector('.lightbox .content');
	this.type = elem.getAttribute('lightbox');
	this.href = elem.getAttribute('url') || elem.getAttribute('href');
	this.width = 1024;
	this.height = 580;
	this.image = null;
	this.video = null;
	this.init();
}

Lightbox.prototype.init = function() {
	var _this = this;

	if (!this.el)
		this.create();

	this.trigger.addEventListener('click', function(e) {
		e.preventDefault();
		_this.open();
	});
}

Lightbox.prototype.create = function() {
	var _this = this,
		cl = document.createElement('div'), // close
		bd = document.createElement('div'); // backdrop

	this.el = document.createElement('div');
	this.content = document.createElement('div');
	this.body = document.createElement('div');

	this.el.classList.add('lightbox');
	bd.classList.add('backdrop');
	cl.classList.add('close');
	this.content.classList.add('content');
	this.body.classList.add('body');

	cl.innerHTML = '<i class="fa fa-times"></i>';

	this.el.appendChild(bd);
	this.content.appendChild(cl);
	this.content.appendChild(this.body);
	this.el.appendChild(this.content);
	document.body.appendChild(this.el);

	cl.addEventListener('click', function() {
		_this.close();
	});

	bd.addEventListener('click', function() {
		_this.close();
	});

	var f = function(e) {
		if (_this.isOpen()) return;
		_this.el.classList.remove('show');
		_this.body.innerHTML = '';
	}

	this.el.addEventListener('transitionend', f, false);
	this.el.addEventListener('webkitTransitionEnd', f, false);
	this.el.addEventListener('mozTransitionEnd', f, false);
	this.el.addEventListener('msTransitionEnd', f, false);
}

Lightbox.prototype.loadImage = function() {
	var _this = this;

	this.setDimensions(this.width, this.height);

	if (!this.image) {
		this.image = new Image();

		this.image.addEventListener('load', function() {
			var dim = _this.fitToSize(this.naturalWidth, this.naturalHeight, _this.width, _this.height);
			_this.setDimensions(dim.width, dim.height);
		});

		this.image.src = this.href;
	}

	this.body.appendChild(this.image);
}

Lightbox.prototype.loadVideo = function() {
	var _this = this;
	this.setDimensions(this.width, this.height);

	if (!this.video) {
		this.video = document.createElement('video');
		this.video.addEventListener('loadedmetadata', function() {
			var dim = _this.fitToSize(this.videoWidth, this.videoHeight, _this.width, _this.height);
			_this.setDimensions(dim.width, dim.height);
		});
		this.video.src = this.href;
		this.video.autoplay = true;
		this.video.controls = true;
	}

	this.body.appendChild(this.video);
}

Lightbox.prototype.loadIframe = function() {
	this.setDimensions(this.width, this.height);
	this.body.innerHTML = '<iframe src="' +this.href+ '" frameborder="0" allowfullscreen></iframe>';
}

Lightbox.prototype.open = function() {
	switch(this.type) {
		case 'image':
			this.loadImage();
			break;
		case 'video':
			this.loadVideo();
			break;
		default:
			this.loadIframe();
	}

	this.el.classList.add('show');
	this.el.offsetHeight; // force render
	this.el.classList.add('open');
}

Lightbox.prototype.close = function() {
	this.el.classList.remove('open');
}

Lightbox.prototype.isOpen = function() {
	return this.el.classList.contains('open');
}

Lightbox.prototype.setDimensions = function(w, h) {
	this.width = w;
	this.height = h;
	this.content.style.width = w + 'px';
	this.content.style.height = h + 'px';
}

Lightbox.prototype.fitToSize = function(w, h, maxW, maxH) {
	var r = h / w;

	if(w >= maxW && r <= 1){
		w = maxW;
		h = w * r;
	} else if(h >= maxH) {
		h = maxH;
		w = h / r;
	}

	return {
		width: w,
		height: h,
	}
}
