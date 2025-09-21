// --- Inline "backend service logic" ---
type Order = { id: string; items: { name: string; price: number; qty: number }[] };

// Simulated service function
function calculateOrderTotal(order: Order): number {
    if (!order.items || order.items.length === 0) return 0;

    return order.items.reduce((total, item) => {
        if (item.qty < 0) throw new Error('Quantity cannot be negative');
        return total + item.price * item.qty;
    }, 0);
}

// --- Unit Tests ---
describe('calculateOrderTotal (service logic)', () => {
    it('calculates total for multiple items', () => {
        const order: Order = {
            id: 'order-1',
            items: [
                { name: 'Widget', price: 10, qty: 2 },
                { name: 'Gadget', price: 5, qty: 3 }
            ]
        };

        const total = calculateOrderTotal(order);
        expect(total).toBe(10 * 2 + 5 * 3); // 35
    });

    it('returns 0 for empty order', () => {
        const order: Order = { id: 'order-2', items: [] };
        expect(calculateOrderTotal(order)).toBe(0);
    });

    it('throws error for negative quantity', () => {
        const order: Order = {
            id: 'order-3',
            items: [{ name: 'Widget', price: 10, qty: -1 }]
        };
        expect(() => calculateOrderTotal(order)).toThrow('Quantity cannot be negative');
    });
});
