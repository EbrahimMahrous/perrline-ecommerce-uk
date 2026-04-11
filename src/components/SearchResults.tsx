import { Link } from "react-router-dom";
import { getImageUrl } from "../utils/imageUrl";
import defaultProductImage from "../assets/alt-product-image.png";

interface Product {
  barcode: string;
  productName: string;
  brand: string;
  productImage: string;
  casePrice: number;
}

interface SearchResultsProps {
  results: Product[];
  onSelect: () => void;
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  onSelect,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
        <div className="p-4 text-center">جاري البحث...</div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
        <div className="p-4 text-center">لا توجد نتائج</div>
      </div>
    );
  }

  return (
    <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-50 mt-1 max-h-80 overflow-y-auto">
      {results.map((product) => (
        <Link
          key={product.barcode}
          to={`/product/${product.barcode}`}
          className="block p-3 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-b-0"
          onClick={onSelect}
        >
          <div className="flex items-center">
            <img
              src={getImageUrl(product.productImage)}
              alt={product.productName}
              className="w-10 h-10 object-contain mr-3"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultProductImage;
              }}
            />
            <div className="flex-1">
              <p className="font-medium text-sm text-gray-800">
                {product.productName}
              </p>
              <p className="text-xs text-gray-500">{product.brand}</p>
            </div>
            <div className="text-xs text-gray-500">
              £{product.casePrice.toFixed(2)}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
