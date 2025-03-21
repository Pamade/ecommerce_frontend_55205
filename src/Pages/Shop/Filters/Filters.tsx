import { useEffect, useState } from "react";
import { DressStyle, DressType, ProductInterface } from "../../../types/types";
import styles from "./Filters.module.scss";
import { useNavigate, useLocation } from "react-router";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { FilterState } from "../../../types/types";

interface Props {
  products: ProductInterface[],
  onFilterChange?: (filters: FilterState) => void,
  setIsFilterOn:React.Dispatch<React.SetStateAction<boolean>>,
  priceMin:number,
  priceMax:number,
  setPriceMin:React.Dispatch<React.SetStateAction<number>>,
  setPriceMax:React.Dispatch<React.SetStateAction<number>>,
  filters:FilterState,
  setFilters:React.Dispatch<React.SetStateAction<FilterState>>
}

// Define the consolidated filter state interface

const dressStyles: DressStyle[] = ["casual", "formal", "gym", "party"];
const dressTypes: DressType[] = ["tshirt", "hoodie", "joggers", "shorts"];
const sizes = ["XS", "S", "M", "L", "XL", "XXL"];

const Filters = ({ products, onFilterChange, setIsFilterOn, priceMin, priceMax, setPriceMax, setPriceMin, filters, setFilters}: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const colors = [
    { id: 'green', hex: '#00C853' },
    { id: 'red', hex: '#FF0000' },
    { id: 'yellow', hex: '#FFEB3B' },
    { id: 'orange', hex: '#FF9800' },
    { id: 'lightblue', hex: '#03A9F4' },
    { id: 'blue', hex: '#2196F3' },
    { id: 'purple', hex: '#7B1FA2' },
    { id: 'pink', hex: '#E91E63' },
    { id: 'white', hex: '#FFFFFF' },
    { id: 'black', hex: '#000000' }
  ];

  // Initialize price range from products
  useEffect(() => {
    if (products.length > 0) {
      const prices = products.map((p) => p.price).sort((a, b) => a - b);
      setPriceMin(prices[0]);
      setPriceMax(prices[prices.length - 1]);
    }
  }, [products]);

  // Consolidated state for all filters


  // Load filters from URL search parameters
  useEffect(() => {
    if (initialLoadComplete) return;

    const searchParams = new URLSearchParams(location.search);
    
    // Define a validation map for each filter type
    const validations = {
      style: (value: string) => dressStyles.includes(value as DressStyle) ? value as DressStyle : null,
      type: (value: string) => dressTypes.includes(value as DressType) ? value as DressType : null,
      color: (value: string) => colors.some(c => c.id === value) ? value : null,
      size: (value: string) => sizes.includes(value) ? value : null
    };
    
    // Create an object to collect validated URL params
    const urlFilters: Partial<FilterState> = {};
    
    // Process string-based parameters
    Object.entries(validations).forEach(([param, validator]) => {
      const value = searchParams.get(param);
      if (value) {
        const validValue = validator(value);
        switch (param) {
          case 'style': 
            urlFilters.dressStyle = validValue as DressStyle;
            break;
          case 'type': 
            urlFilters.dressType = validValue as DressType;
            break;
          case 'color': 
            urlFilters.color = validValue;
            break;
          case 'size': 
            urlFilters.size = validValue;
            break;
        }
      }
    });
    
    // Process price range
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    
    if (minPrice && maxPrice) {
      const min = parseInt(minPrice);
      const max = parseInt(maxPrice);
      if (!isNaN(min) && !isNaN(max)) {
        urlFilters.priceRange = [min, max];
      } else {
        urlFilters.priceRange = [priceMin, priceMax];
      }
    } else {
      urlFilters.priceRange = [priceMin, priceMax];
    }
    
    // Update filters state with URL params
    setFilters(prevFilters => ({
      ...prevFilters,
      ...urlFilters
    }));
    setInitialLoadComplete(true);

  }, [location.search, priceMin, priceMax, colors]);

  // Update URL when filters change
  const updateSearchParams = (newFilters: FilterState) => {
    const searchParams = new URLSearchParams();
    
    // Map filters to search params using a more concise approach
    const paramsMap: Record<string, string | null> = {
      'style': newFilters.dressStyle,
      'type': newFilters.dressType,
      'color': newFilters.color,
      'size': newFilters.size
    };
    
    // Add non-null params to the URL
    Object.entries(paramsMap).forEach(([key, value]) => {
      if (value !== null) {
        searchParams.set(key, value);
      }
    });
    
    // Add price range params
    if (newFilters.priceRange[0] !== priceMin) {
      searchParams.set('minPrice', newFilters.priceRange[0].toString());
    }
    
    if (newFilters.priceRange[1] !== priceMax) {
      searchParams.set('maxPrice', newFilters.priceRange[1].toString());
    }
    
    // Update URL without reload
    const newUrl = `${location.pathname}${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    navigate(newUrl, { replace: true });
  };

  // Update filters and handle side effects
  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters);
    
    // Notify parent component
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  // Generic handler for toggle filters (style, type, color, size)
  const handleToggleFilter = <K extends keyof FilterState>(
    key: K, 
    value: FilterState[K], 
    currentValue: FilterState[K]
  ) => {
    const newFilters = {
      ...filters,
      [key]: currentValue === value ? null : value
    };
    
    updateFilters(newFilters);
  };

  // Handle price range change
  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const newFilters = {
      ...filters,
      priceRange: newValue as [number, number]
    };
    
    updateFilters(newFilters);
  };

  // Apply filters to URL
  const handleApplyFilters = () => {
    updateSearchParams(filters);
  };

  // Clear all filters
  const handleClearFilters = () => {
    // const clearedFilters:FilterState = {
    //   dressStyle: null,
    //   dressType: null,
    //   color: null,
    //   size: null,
    //   priceRange: [priceMin, priceMax]
    // };
    
    // updateFilters(clearedFilters);
    // updateSearchParams(clearedFilters);
    setIsFilterOn(false)
  };

  // Helper function for price formatting
  const formatPrice = (value: number) => {
    return `$${value}`;
  };

  return (
    <section className={styles.filters}>
      <div className={styles.content}>
        <div className={styles.filters_close}>
          <p>Filters</p>
          <p className={styles.filters_x} onClick={handleClearFilters}>X</p>
        </div>

        {/* Dress Styles */}
        <div className={`${styles.wrapper_single}`}>
          <p className={styles.name}>DRESS STYLE</p>
          <div className={styles.items_wrapper}>
            {dressStyles.map((style) => (
              <div
                key={style} 
                onClick={() => handleToggleFilter('dressStyle', style, filters.dressStyle)}
                className={filters.dressStyle === style ? `${styles.box_item} ${styles.box_item_selected}` : styles.box_item }
              >
                {style}
              </div>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className={styles.wrapper_single}>
          <p className={styles.name}>PRICE</p>
          <Box>
            <Slider
              getAriaLabel={() => 'Price range'}
              value={filters.priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="on"
              min={priceMin}
              max={priceMax}
              getAriaValueText={formatPrice}
              valueLabelFormat={formatPrice}
            />
          </Box>
        </div>

        {/* Colors */}
        <div className={styles.wrapper_single}>
          <p className={styles.name}>COLORS</p>
          <div className={styles.palette}>
            {colors.map((color) => (
              <button
                key={color.id}
                className={`${styles.color_option} ${filters.color === color.id ? styles.selected : ''}`}
                style={{ backgroundColor: color.hex }}
                onClick={() => handleToggleFilter('color', color.id, filters.color)}
                aria-label={`Select ${color.id} color`}
              >
                {filters.color === color.id && (
                  <span className={styles.checkmark}>✓</span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div className={styles.wrapper_single}>
          <p className={styles.name}>SIZE</p>
          <div className={styles.items_wrapper}>
            {sizes.map((size) => (
              <div 
                key={size} 
                className={filters.size === size ?  `${styles.box_item} ${styles.box_item_selected}` : styles.box_item }
                onClick={() => handleToggleFilter('size', size, filters.size)}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Dress Types */}
        <div className={`${styles.wrapper_single}`}>
          <p className={styles.name}>DRESS TYPE</p>
          <div className={styles.items_wrapper}>
            {dressTypes.map((type) => (
              <div 
                key={type} 
                onClick={() => handleToggleFilter('dressType', type, filters.dressType)}
                className={filters.dressType === type ?  `${styles.box_item} ${styles.box_item_selected}` : styles.box_item }
              >
                <span>{type}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Apply Button */}
        <button className={styles.btn} onClick={handleApplyFilters}>
          APPLY FILTER
        </button>
      </div>
    </section>
  );
};


export default Filters;