export interface AddToCartState {
    items: [
        {
            id: 0;
            name: string; 
            description: string; 
            price:  string; 
            imageUrl: string; 
            quantity: number;
        },       
    ];
    addedItems:[
        {
            id: 0;
            name: string; 
            description: string; 
            price:  string; 
            imageUrl: string; 
            qtyInCart: number;
            quantity: number;
        }, 
    ];
    total: 0;   
    invoiceDate: Date;
    invoiceNumber: string; 
  }