var VERSION = "1.0.0::";
		var CACHE_URLS = [
			"/",
			"material.min.css",
			"material.min.js"
		];

		var SOUNDS_URLS = ["sounds/Yes.wav","sounds/No.wav","sounds/Hohoho.wav","sounds/Ben.wav","sounds/Augg.wav"];

		self.addEventListener("install", function(event) {
			event.waitUntil(
				caches
					.open(VERSION + 'assets')
						.then(function(cache){
							cache.addAll(SOUNDS_URLS);
							return cache.addAll(CACHE_URLS);
						})
			);
		});

		self.addEventListener("activate", function(event) {
			event.waitUntil(
				caches
					.keys()
						.then(function (keys){
							return Promise.all(
								keys
									.filter(function(key){
										return !key.startsWith(VERSION);
									})
									.map(function(key){
										return caches.delete(key);
									})
							);
						})
			);
		});

		self.addEventListener("fetch", function(event){

			if(event.request.method !== 'GET'){
				return;
			}

			event.respondWith(
				caches.match(event.request).then(function(response){
					return response || fetch(event.request);
				})
			);
		});