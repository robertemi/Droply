document.addEventListener('DOMContentLoaded', function() {
    // Sample notification data
    const notifications = [
        {
            id: 1,
            type: 'order',
            title: 'New Order Available',
            message: 'You have a new delivery request from Acme Corp',
            time: '10 minutes ago',
            read: false,
            meta: { orderId: 'ORD-12345' }
        },
        {
            id: 2,
            type: 'system',
            title: 'System Update',
            message: 'Scheduled maintenance tonight at 2:00 AM',
            time: '2 hours ago',
            read: true
        },
        {
            id: 3,
            type: 'order',
            title: 'Delivery Completed',
            message: 'Your delivery to 123 Main St has been marked as completed',
            time: '1 day ago',
            read: true,
            meta: { orderId: 'ORD-12344' }
        },
        {
            id: 4,
            type: 'alert',
            title: 'Payment Received',
            message: 'Your payment of $25.00 has been processed',
            time: '2 days ago',
            read: false
        }
    ];

    const notificationsList = document.querySelector('.notifications-list');
    const markAllReadBtn = document.getElementById('markAllRead');
    const clearAllBtn = document.getElementById('clearAll');
    const filterRadios = document.querySelectorAll('input[name="filter"]');

    // Render notifications
    function renderNotifications(filter = 'all') {
        let filteredNotifications = notifications;
        
        if (filter === 'unread') {
            filteredNotifications = notifications.filter(n => !n.read);
        } else if (filter === 'orders') {
            filteredNotifications = notifications.filter(n => n.type === 'order');
        } else if (filter === 'system') {
            filteredNotifications = notifications.filter(n => n.type === 'system' || n.type === 'alert');
        }

        if (filteredNotifications.length === 0) {
            notificationsList.innerHTML = `
                <div class="empty-state">
                    <img src="../images/empty-notifications.svg" alt="No notifications">
                    <p>No notifications found</p>
                </div>
            `;
            return;
        }

        notificationsList.innerHTML = filteredNotifications.map(notification => `
            <div class="notification-item ${notification.read ? '' : 'unread'}" data-id="${notification.id}">
                <div class="notification-icon ${notification.type}">
                    ${getNotificationIcon(notification.type)}
                </div>
                <div class="notification-content">
                    <div class="notification-title">
                        <span>${notification.title}</span>
                        <span class="notification-time">${notification.time}</span>
                    </div>
                    <p class="notification-message">${notification.message}</p>
                    <div class="notification-actions">
                        ${notification.type === 'order' ? 
                          `<button class="btn-notification btn-primary" 
                                   onclick="viewOrder('${notification.meta.orderId}')">
                            View Order
                          </button>` : ''}
                        <button class="btn-notification btn-secondary" 
                                onclick="markAsRead(${notification.id})">
                            ${notification.read ? 'Mark Unread' : 'Mark Read'}
                        </button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function getNotificationIcon(type) {
        const icons = {
            order: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M17 6c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-2zm-6-3c1.66 0 3 1.34 3 3H8c0-1.66 1.34-3 3-3zm0 10c-2.76 0-5-2.24-5-5h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2c0 2.76-2.24 5-5 5z"/></svg>',
            system: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/></svg>',
            alert: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>'
        };
        return icons[type] || icons.system;
    }

    // Event listeners
    markAllReadBtn.addEventListener('click', function() {
        notifications.forEach(n => n.read = true);
        renderNotifications(document.querySelector('input[name="filter"]:checked').value);
    });

    clearAllBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all notifications?')) {
            notifications.length = 0;
            renderNotifications();
        }
    });

    filterRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            renderNotifications(this.value);
        });
    });

    // Initial render
    renderNotifications();
});

// Global functions for button actions
function markAsRead(id) {
    const notification = notifications.find(n => n.id === id);
    if (notification) {
        notification.read = !notification.read;
        document.querySelector(`.notification-item[data-id="${id}"]`).classList.toggle('unread');
    }
}

function viewOrder(orderId) {
    alert(`Viewing order ${orderId}`);
    // In a real app: window.location.href = `/order-details.html?id=${orderId}`;
}