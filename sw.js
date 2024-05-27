// sw.js - This file needs to be in the root of the directory to work,
//         so do not move it next to the other scripts

const CACHE_NAME = 'lab-8-starter';
const RECIPE_URLs = [
  'https://adarsh249.github.io/Lab8-Starter/recipes/1_50-thanksgiving-side-dishes.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/2_roasting-turkey-breast-with-stuffing.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/3_moms-cornbread-stuffing.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/4_50-indulgent-thanksgiving-side-dishes-for-any-holiday-gathering.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/5_healthy-thanksgiving-recipe-crockpot-turkey-breast.json',
  'https://adarsh249.github.io/Lab8-Starter/recipes/6_one-pot-thanksgiving-dinner.json',
];

// Installs the service worker. Feed it some initial URLs to cache
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      // B6. TODO - Add all of the URLs from RECIPE_URLs here so that they are
      //            added to the cache when the ServiceWorker is installed
      // const feches = RECIPE_URLs.map(url => {
      //   return fetch(url).then(response => {
      //     if (!response.ok) {
      //       throw new TypeError('Bad response status');
      //     }
      //     return cache.put(url, response);
      //   }).catch(error => {
      //     console.error('Failed to fetch adn cahce:', url, error);
      //   });
      // });
      // return Promise.all(fetches);
      return cache.addAll(RECIPE_URLs);
    })
  );
});

// Activates the service worker
self.addEventListener('activate', function (event) {
  event.waitUntil(self.clients.claim());
});

// Intercept fetch requests and cache them
// self.addEventListener('fetch', function (event) {
//   // We added some known URLs to the cache above, but tracking down every
//   // subsequent network request URL and adding it manually would be very taxing.
//   // We will be adding all of the resources not specified in the intiial cache
//   // list to the cache as they come in.
//   /*******************************/
//   // This article from Google will help with this portion. Before asking ANY
//   // questions about this section, read this article.
//   // NOTE: In the article's code REPLACE fetch(event.request.url) with
//   //       fetch(event.request)
//   // https://developer.chrome.com/docs/workbox/caching-strategies-overview/
//   /*******************************/
//   // B7. TODO - Respond to the event by opening the cache using the name we gave
//   //            above (CACHE_NAME)
//   // event.respondWith(caches.open(CACHE_NAME).then((cache) => {
//   // // B8. TODO - If the request is in the cache, return with the cached version.
//   // //            Otherwise fetch the resource, add it to the cache, and return
//   // //            network response.
//   //   return cache.match(event.request).then((cachedResponse) => {
//   //     return cachedResponse || fetch(event.request).then((fetchedResponse) => {
//   //       cache.put(event.request, fetchedResponse.clone());
//   //       return fetchedResponse;
//   //     });
//   //   });
//   // }));
//   event.respondWith(
//     caches.match(event.request).then(function(response) {
//       if (response) {
//         return response;
//       }
//       return fetch(event.request).then(
//         function(response) {
//           if (!response || response.status !== 200 || response.type !== 'basic') {
//             return response;
//           }
//           var responseToCache = response.clone();
//           caches.open(CACHE_NAME) // Open the cache again
//             .then(function(cache) {
//               cache.put(event.request, responseToCache); // Add the response to the cache
//           });
//         }
//       )
//     })
//   )
// });
// self.addEventListener('fetch', function (event) {
//   // Only cache requests that are from our site (ignore chrome-extension, etc.)
//   if (!event.request.url.startsWith('http')) {
//     // If it is not an HTTP request, skip the cache step.
//     return fetch(event.request);
//   }

//   // B7. TODO - Respond to the event by opening the cache using the name we gave
//   //            above (CACHE_NAME)
//   event.respondWith(
//     caches.match(event.request).then(function (response) {
//       // B8. TODO - If the request is in the cache, return with the cached version.
//       //            Otherwise fetch the resource, add it to the cache, and return
//       //            network response.

//       // Return the cached response if found
//       if (response) {
//         return response;
//       }

//       // Fetch from Network if not in Cache
//       return fetch(event.request).then(function (response) {
//         // Check if the response is valid
//         // Do not cache non-GET requests or bad responses
//         if (!response || response.status !== 200 || response.type !== 'basic' || event.request.method !== 'GET') {
//           return response;
//         }

//         // Clone and Cache the Response
//         var responseToCache = response.clone(); // Clone the response for the cache
//         caches.open(CACHE_NAME).then(function (cache) {
//           cache.put(event.request, responseToCache); // Cache the cloned response
//         });

//         return response;
//       }
//       // Error Handling
//       ).catch(function (error) {
//         console.error('Fetching failed:', error);
//         throw error;
//       });
//     })
//   );
// });

// Intercept fetch requests and cache them
self.addEventListener('fetch', function (event) {
  console.log('Service Worker: Fetch event for ', event.request.url);
  // We added some known URLs to the cache above, but tracking down every
  // subsequent network request URL and adding it manually would be very taxing.
  // We will be adding all of the resources not specified in the intiial cache
  // list to the cache as they come in.
  /*******************************/
  // This article from Google will help with this portion. Before asking ANY
  // questions about this section, read this article.
  // NOTE: In the article's code REPLACE fetch(event.request.url) with
  //       fetch(event.request)
  // https://developer.chrome.com/docs/workbox/caching-strategies-overview/
  /*******************************/
  // B7. TODO - Respond to the event by opening the cache using the name we gave
  //            above (CACHE_NAME)
  event.respondWith(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('return cache.match(event.request).then(function (response)');
      return cache.match(event.request).then(function (response) {
      // B8. TODO - If the request is in the cache, return with the cached version.
      //            Otherwise fetch the resource, add it to the cache, and return
      //            network response.
        if (response) {
          console.log('return (response)');
          return response;
        } else {
          return fetch(event.request).then(function (networkResponse) {
            cache.put(event.request, networkResponse.clone());
            console.log('return networkResponse');
            return networkResponse;
          });
        }
      }).catch(function (error) {
        console.error('Fetching failed:', error);
        throw error;
      });
    })
  );
});

// return fetch(event.request).then(function (networkResponse) {
//   // Only cache successful responses
//   if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
//     cache.put(event.request, networkResponse.clone()).catch(function (error) {
//       console.warn('Service Worker: Error caching new data.', error);
//     });
//   }
//   // cache.put(event.request, networkResponse.clone());
//   // console.log('return networkResponse');
//   return networkResponse;
// });