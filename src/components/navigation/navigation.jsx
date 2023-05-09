import styles from './navigation.module.css';
import { useState } from 'react';
import { Link} from 'react-router-dom';
//redux
import { useSelector } from 'react-redux';
//svg's
import searchBtn from "../../utils/svg/search-outline.svg";
import closeBtn from "../../utils/svg/close-outline.svg";
import menuBtn from "../../utils/svg/menu-outline.svg";
import BasicMenu from '../drop-down/drop-down';
//components
import CartIcon from '../cart-icon/cart-icon';
import { useDispatch } from 'react-redux';
import { setPagesActions } from '../../features/productsPagination/productsPaginationSlice';
import { searchProduct } from './search';
import { getProductsActions, prodNameCopy, productsName } from '../../features/products/productSlice';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isToggleOn, setIsToggleOn] = useState(false);
  const [isToggleCartOn, setIsToggleCartOn] = useState(false);
  const { products,productsCopy,productsFilter,productsFilterCopy } = useSelector(state => state.products)
  const { userCredentials } = useSelector((state) => state.currentUser);
  const dispatch = useDispatch()
  const handleClickSearchBtn = () => {
    setIsOpen(true);
    setIsToggleOn(false);
    if (isOpen) {
      setIsOpen(false);
    }
  }

  const handleClickCloseBtn = () => {
    setIsOpen(false);
  }

  const handleClickHeader = () => {
    setIsToggleOn(!isToggleOn);
    setIsOpen(false);
  }

  const handleClick = () => {
    setIsToggleOn(!isToggleOn);
    dispatch(getProductsActions(productsCopy))
      dispatch(productsName([]))
      dispatch(setPagesActions(Math.ceil(productsCopy.length/8)))  
  }
  const handleClickCart = ()=> {
    setIsToggleCartOn(!isToggleCartOn);
  }
  // desdpues de la presentacion, este codigo se movera a un helper
 const handleChange = async (value) => {
  console.log(products);
  const name = value.target.value.trim()
  if(name){
    const searchProducts = await searchProduct(name , productsCopy)
    dispatch(prodNameCopy(searchProducts))
    if(productsFilter.length){
      const searchProducts = await searchProduct(name , productsFilterCopy)
      dispatch(getProductsActions(searchProducts))
      dispatch(productsName(searchProducts))
      dispatch(setPagesActions(Math.ceil(searchProducts.length/8)))  
     
    }
    else{
      const searchProducts = await searchProduct(name , productsCopy)
      dispatch(getProductsActions(searchProducts))
      dispatch(productsName(searchProducts))
      dispatch(setPagesActions(Math.ceil(searchProducts.length/8)))  
    }

  }else
  {
   
    if(productsFilter.length){
      dispatch(setPagesActions(Math.ceil(products.length/8)))  
      dispatch(getProductsActions(productsFilterCopy))
      dispatch(productsName([]));
    }
    else{

      dispatch(setPagesActions(Math.ceil(products.length/8)))  
      dispatch(getProductsActions(productsCopy));
      dispatch(productsName([]));
    }

  }
 }

  return (
    <>
   <header className={`${isToggleOn ? styles.open : ""} ${styles.header}`}>
        <Link to="/" className={styles.logo} onClick={handleClick} >MB&H</Link>
        <div className={styles.group}>
          <ul className={styles.navigation}>
            <li><Link to="/shop" onClick={handleClick}>Tienda</Link></li>
            {
              userCredentials
                ? <li><Link to="#" onClick={handleClick}><BasicMenu /></Link></li>
                : <li><Link to="/auth" onClick={handleClick}>Login</Link></li>
            }
            <li onClick={handleClickCart}><CartIcon/></li>
          </ul>
          <div className={styles.search}>
            <span className={styles.icon}>
              <img
                src={searchBtn}
                alt="SearchBtn"
                name="search-outline"
                className={`${styles.searchBtn} ${isOpen ? styles.active : ""}`}
                onClick={handleClickSearchBtn}
              />
              <img
                src={closeBtn}
                alt="CloseBtn"
                name="close-outline"
                className={`${styles.closeBtn}  ${isOpen ? styles.active : ""}`}
                onClick={handleClickCloseBtn}
              />
            </span>
          </div>
          <img
            src={menuBtn}
            alt="MenuBtn"
            className={`${styles.menuToggle}  ${isOpen ? styles.hide : ""}`}
            onClick={handleClickHeader}
          />
        </div>
        <div className={`${styles.searchBox}  ${isOpen ? styles.active : ""}`}>
          <input
            type="text"
            name="searchBox"
            placeholder="Busca algo para tu bebé..."
            onChange={(e)=>{handleChange(e)}}
            />        
        </div>
        {/* <CartDropdown isToggleCartOn={isToggleCartOn} /> */}
      </header>
    </>
  );
}

export default Navigation
