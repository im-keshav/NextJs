import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  if (!product) return null;

  return (
    <div className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:shadow-slate-900/50 hover:border-blue-500/30">
      {/* Product Image Container */}
      <div className="relative flex h-60 w-full items-center justify-center bg-muted/40 p-6 overflow-hidden border-b border-border/50">
        <Link 
          href={`/products/${product.id}`}
          className="flex h-full w-full items-center justify-center"
        >
          <img
            src={product.image}
            alt={product.title || "Product image"}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
      </div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Category */}
          {product.category && (
            <span className="mb-2 inline-block rounded-full bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 text-xs font-semibold capitalize text-blue-600 dark:text-blue-400">
              {product.category}
            </span>
          )}

          {/* Title */}
          <Link href={`/products/${product.id}`}>
            <h2 className="mb-2 line-clamp-2 text-base font-semibold text-foreground transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" title={product.title}>
              {product.title}
            </h2>
          </Link>

          {/* Description */}
          <p className="mb-4 line-clamp-2 text-xs text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        <div>
          {/* Price + Rating */}
          <div className="mb-4 flex items-center justify-between">
            <span className="text-xl font-bold text-foreground">
              ${product.price}
            </span>

            {product.rating && (
              <div className="flex items-center gap-1 rounded-md bg-amber-50 dark:bg-amber-950/50 px-2 py-1 text-xs font-semibold text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
                <span>⭐</span>
                <span>{product.rating.rate}</span>
                <span className="text-muted-foreground font-normal">({product.rating.count})</span>
              </div>
            )}
          </div>

          {/* Button */}
          <button className="w-full rounded-xl bg-primary text-primary-foreground font-medium text-sm py-2.5 transition-all duration-200 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 shadow-sm hover:shadow-md active:scale-95 cursor-pointer">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;