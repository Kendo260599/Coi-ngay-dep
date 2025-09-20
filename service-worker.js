// Service Worker cho Xem Ngày Tốt PWA
// Tạo khả năng hoạt động offline và cache dữ liệu

const CACHE_NAME = 'xem-ngay-tot-v1.0.0';
const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/enhanced-app.js',
    '/enhanced-lunar-calculator.js',
    '/enhanced-good-day-calculator.js',
    '/advanced-features.js',
    '/manifest.json',
    '/app.js',
    '/lunar-calculator.js',
    '/good-day-calculator.js',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Caching files');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: Cached all files successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Cache failed', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deleting old cache', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activated successfully');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
    // Skip cross-origin requests
    if (!event.request.url.startsWith(self.location.origin) && 
        !event.request.url.startsWith('https://fonts.googleapis.com') &&
        !event.request.url.startsWith('https://cdnjs.cloudflare.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version or fetch from network
                if (response) {
                    console.log('Service Worker: Serving from cache', event.request.url);
                    return response;
                }

                console.log('Service Worker: Fetching from network', event.request.url);
                return fetch(event.request).then((response) => {
                    // Don't cache if not a valid response
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // Clone the response
                    const responseToCache = response.clone();

                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                }).catch(() => {
                    // If both cache and network fail, return offline page
                    if (event.request.destination === 'document') {
                        return caches.match('/index.html');
                    }
                });
            })
    );
});

// Background sync for saving user data when back online
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync triggered', event.tag);
    
    if (event.tag === 'save-user-data') {
        event.waitUntil(syncUserData());
    }
    
    if (event.tag === 'cache-lunar-data') {
        event.waitUntil(cacheLunarData());
    }
});

// Push notification support (for future updates)
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push notification received', event);
    
    const options = {
        body: event.data ? event.data.text() : 'Có cập nhật mới cho ứng dụng Xem Ngày Tốt!',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/badge-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '1'
        },
        actions: [
            {
                action: 'explore',
                title: 'Xem ngay',
                icon: '/icons/checkmark.png'
            },
            {
                action: 'close',
                title: 'Đóng',
                icon: '/icons/xmark.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Xem Ngày Tốt', options)
    );
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Notification click received', event);

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Helper functions
async function syncUserData() {
    try {
        // Sync any pending user data when back online
        const pendingData = await getStoredData('pendingSync');
        
        if (pendingData && pendingData.length > 0) {
            // Process pending sync data
            console.log('Service Worker: Syncing pending data', pendingData);
            
            // Clear pending data after successful sync
            await clearStoredData('pendingSync');
        }
    } catch (error) {
        console.error('Service Worker: Sync failed', error);
    }
}

async function cacheLunarData() {
    try {
        // Pre-cache lunar calendar data for next few months
        const currentDate = new Date();
        const cache = await caches.open(CACHE_NAME);
        
        // Cache data for next 3 months
        for (let i = 0; i < 3; i++) {
            const targetDate = new Date(currentDate);
            targetDate.setMonth(targetDate.getMonth() + i);
            
            // This would normally make API calls to cache lunar data
            console.log(`Service Worker: Caching lunar data for ${targetDate.getMonth() + 1}/${targetDate.getFullYear()}`);
        }
    } catch (error) {
        console.error('Service Worker: Lunar data caching failed', error);
    }
}

async function getStoredData(key) {
    return new Promise((resolve) => {
        // Simple IndexedDB wrapper for storing data
        const request = indexedDB.open('XemNgayTotDB', 1);
        
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['data'], 'readonly');
            const store = transaction.objectStore('data');
            const getRequest = store.get(key);
            
            getRequest.onsuccess = () => {
                resolve(getRequest.result?.value || null);
            };
            
            getRequest.onerror = () => {
                resolve(null);
            };
        };
        
        request.onerror = () => {
            resolve(null);
        };
        
        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains('data')) {
                db.createObjectStore('data', { keyPath: 'key' });
            }
        };
    });
}

async function clearStoredData(key) {
    return new Promise((resolve) => {
        const request = indexedDB.open('XemNgayTotDB', 1);
        
        request.onsuccess = (event) => {
            const db = event.target.result;
            const transaction = db.transaction(['data'], 'readwrite');
            const store = transaction.objectStore('data');
            const deleteRequest = store.delete(key);
            
            deleteRequest.onsuccess = () => {
                resolve(true);
            };
            
            deleteRequest.onerror = () => {
                resolve(false);
            };
        };
        
        request.onerror = () => {
            resolve(false);
        };
    });
}

// Listen for skip waiting message
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

console.log('Service Worker: Loaded successfully');