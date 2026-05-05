export type CartItem = {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  category?: string | null;
  image?: string | null;
  price: number;
  quantity: number;
};

const CART_KEY = "restaurant_cart";

function notifyCartUpdate() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("cart-updated"));
  }
}

export function getCartItems(): CartItem[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(CART_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(item: Omit<CartItem, "quantity">, quantity = 1) {
  const currentItems = getCartItems();

  const existingItem = currentItems.find((cartItem) => cartItem.id === item.id);

  const updatedItems = existingItem
    ? currentItems.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem,
      )
    : [...currentItems, { ...item, quantity }];

  saveCartItems(updatedItems);
  notifyCartUpdate();
  return updatedItems;
}

export function updateCartItemQuantity(id: number, quantity: number) {
  const currentItems = getCartItems();

  const updatedItems = currentItems.map((item) =>
    item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
  );

  saveCartItems(updatedItems);
  notifyCartUpdate();
  return updatedItems;
}

export function removeCartItem(id: number) {
  const updatedItems = getCartItems().filter((item) => item.id !== id);
  saveCartItems(updatedItems);
  notifyCartUpdate();
  return updatedItems;
}

export function clearCart() {
  saveCartItems([]);
  notifyCartUpdate();
}
