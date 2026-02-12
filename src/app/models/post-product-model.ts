export class PostProductModel{
    id!: number;
    name: string='';
    description: string='';
    price: number=0;
    categoryId: number=0;
    imageUrl: string='';
    isAvailable: boolean=true;
}