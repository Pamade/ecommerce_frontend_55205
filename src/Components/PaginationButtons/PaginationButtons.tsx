
import styles from "./PaginationButtons.module.scss"

interface PaginationProps {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
  }


const PaginationButtons = ({ totalItems, itemsPerPage, currentPage, setCurrentPage }:PaginationProps) => {

    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return (
      <div className={styles.wrapper}>        
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`${styles.btn} ${i + 1 === currentPage && styles.current}`}
          >
            {i + 1}
          </button>
        ))}
{/* 
        {currentPage !== totalPages && <button
          onClick={() =>setCurrentPage(currentPage + 1)}        >
          Next
        </button> } */}
        
      </div>
    );
  };


export default PaginationButtons;