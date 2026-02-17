import { computed, Injectable, signal } from '@angular/core';
import { ProductModel } from '../models/product-model';
import { OrderItemModel } from '../models/order-item-model';

@Injectable({
    providedIn: 'root'
})
export class CartService {

    cartCount = signal(0);
    cartItems = signal<OrderItemModel[]>([
        {
            orderId: -1,
            productId: 202,
            quantity: 1,
            productName: 'Wireless Headphones',
            productImageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
            productPrice: 299.99,
        },
        {
            orderId: -1,
            productId: 2,
            quantity: 1,
            productName: 'Smart Watch',
            productImageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
            productPrice: 199.99
        },
    ]);

    ngOnInit(): void {
        const savedCart = localStorage.getItem('shopping_cart');

        if (savedCart) {
            this.cartItems.set(JSON.parse(savedCart));
        }
    }

    removeFromCart(quantity: number = 1): void {
        this.cartCount.update(count => Math.max(0, count - quantity));
    }

    clearCart(): void {
        this.cartItems.set([]);
        this.cartCount.set(0);
    }

    totalPrice = computed(() => {
        const total = this.cartItems().reduce((acc, item) => {
            return acc + (item.productPrice * (item.quantity || 1));
        }, 0);
        return parseFloat(total.toFixed(2)); // מחזיר מספר נקי עם 2 ספרות
    });

    // הוספת מוצר לסל
    addToCart(product: ProductModel, quantity: number ) {
        const orderProduct: OrderItemModel = {
            orderId: -1, // מזהה זמני, יוחלף בעת יצירת ההזמנה
            productId: product.id,
            quantity: quantity,
            productName: product.name,
            productImageUrl: product.imageUrl,
            productPrice: product.price
        };

        this.cartItems.update(prevItems => {
            const existingItem = prevItems.find(p => p.productId === orderProduct.productId);
            
            if (existingItem) {
                // אם המוצר קיים, נעלה כמות
                return prevItems.map(p =>
                    p.productId === orderProduct.productId ? { ...p, quantity: (p.quantity || 1) + 1 } : p
                );
            }
            else
                return [...prevItems, orderProduct];
        });
    }

    // עדכון כמות (פלוס או מינוס)
    updateQuantity(productId: number, delta: number) {
        this.cartItems.update(prevItems =>
            prevItems.map(p => {
                if (p.productId === productId) {
                    const newQty = (p.quantity || 1) + delta;
                    return { ...p, quantity: newQty > 0 ? newQty : 1 };
                }
                return p;
            })
        );
    }

    // הסרת מוצר מהסל
    removeItem(productId: number) {
        this.cartItems.update(prevItems => prevItems.filter(p => p.productId !== productId));
    }

}


