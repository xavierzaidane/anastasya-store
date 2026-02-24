
export const ADMIN_WHATSAPP_NUMBER = '62895375681188'; 

interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  category?: string;
}

export function generateWhatsAppMessage(product: Product, quantity: number): string {
  const message = `Halo Kak, saya mau pesan produk berikut yaa:

*Detail Pesanan*

Produk   : ${product.name}
Kategori : ${product.category || 'Umum'}
Harga    : ${product.price}
Jumlah   : ${quantity}

Boleh dibantu info ketersediaan dan cara pemesanannya? Terima kasih :)`;

  return encodeURIComponent(message);
}

export function generateWhatsAppUrl(product: Product, quantity: number): string {
  const message = generateWhatsAppMessage(product, quantity);
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${message}`;
}

export function orderViaWhatsApp(product: Product, quantity: number): void {
  const url = generateWhatsAppUrl(product, quantity);
  window.open(url, '_blank', 'noopener,noreferrer');
}

// For multiple items (SavedItems checkout)
export interface SavedItemForOrder {
  id: number;
  name: string;
  price: string;
  category?: string;
  quantity: number;
}

export function generateMultipleItemsMessage(items: SavedItemForOrder[]): string {
  const itemsList = items.map((item, index) => {
    return `${index + 1}. ${item.name}
   Kategori: ${item.category || 'Umum'}
   Harga: ${item.price}
   Jumlah: ${item.quantity}`;
  }).join('\n\n');

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const message = `Halo Kak, saya mau pesan produk berikut yaa:

*Detail Pesanan*

${itemsList}

---
Total Item: ${totalItems} produk

Boleh dibantu info ketersediaan dan cara pemesanannya? Terima kasih :)`;

  return encodeURIComponent(message);
}

export function generateMultipleItemsWhatsAppUrl(items: SavedItemForOrder[]): string {
  const message = generateMultipleItemsMessage(items);
  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${message}`;
}

export function orderMultipleItemsViaWhatsApp(items: SavedItemForOrder[]): void {
  if (items.length === 0) return;
  const url = generateMultipleItemsWhatsAppUrl(items);
  window.open(url, '_blank', 'noopener,noreferrer');
}
