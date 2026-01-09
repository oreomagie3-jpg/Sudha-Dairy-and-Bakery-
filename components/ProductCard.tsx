
import React from 'react';
import { Plus, Minus, Star, Heart, Zap } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  quantityInCart: number;
  isWishlisted: boolean;
  onAddToCart: (p: Product) => void;
  onRemoveFromCart: (p: Product) => void;
  onBuyNow: (p: Product) => void;
  onToggleWishlist: (id: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  quantityInCart, 
  isWishlisted,
  onAddToCart, 
  onRemoveFromCart,
  onBuyNow,
  onToggleWishlist
}) => {
  return (
    <div className="bg-white rounded-[2rem] border border-stone-100 overflow-hidden hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 group flex flex-col h-full relative">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden m-2 rounded-[1.5rem]">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Wishlist Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 z-10 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-lg hover:bg-white transition-all group/wishlist active:scale-90"
        >
          <Heart 
            className={`h-4 w-4 transition-all duration-300 ${
              isWishlisted 
                ? 'fill-rose-500 text-rose-500 scale-110' 
                : 'text-slate-400 group-hover/wishlist:text-rose-400'
            }`} 
          />
        </button>

        {product.isFresh && (
          <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
            Fresh
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-black text-slate-900 leading-tight text-lg">{product.name}</h3>
            <p className="hindi-font text-emerald-600 text-sm font-bold mt-1">{product.hindiName}</p>
          </div>
          <div className="flex items-center gap-1 text-amber-500 bg-amber-50 px-2 py-1 rounded-lg">
            <Star className="h-3 w-3 fill-current" />
            <span className="text-amber-700 text-[10px] font-black">4.8</span>
          </div>
        </div>
        
        <p className="text-slate-500 text-xs mt-2 line-clamp-2 leading-relaxed">{product.description}</p>

        <div className="mt-auto pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xl font-black text-slate-900">₹{product.price}</span>
              <span className="text-slate-400 text-[10px] font-black ml-1 uppercase tracking-widest">/ {product.unit}</span>
            </div>
          </div>

          <div className="flex gap-2">
            {quantityInCart > 0 ? (
              <div className="flex-1 flex items-center justify-between bg-emerald-50 rounded-2xl px-3 py-2 border border-emerald-100">
                <button 
                  onClick={() => onRemoveFromCart(product)}
                  className="p-1.5 hover:bg-emerald-200 rounded-xl transition-colors"
                >
                  <Minus className="h-4 w-4 text-emerald-700" />
                </button>
                <span className="font-black text-emerald-700 text-sm">{quantityInCart}</span>
                <button 
                  onClick={() => onAddToCart(product)}
                  className="p-1.5 hover:bg-emerald-200 rounded-xl transition-colors"
                >
                  <Plus className="h-4 w-4 text-emerald-700" />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => onAddToCart(product)}
                className="flex-1 bg-white border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-50 px-4 py-3 rounded-2xl transition-all flex items-center justify-center gap-2 text-sm font-black active:scale-95"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            )}

            <button 
              onClick={() => onBuyNow(product)}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 rounded-2xl transition-all shadow-lg shadow-amber-100 flex items-center justify-center gap-2 text-sm font-black active:scale-95"
            >
              <Zap className="h-4 w-4 fill-current" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
