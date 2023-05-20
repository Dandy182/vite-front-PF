import styles from "../home-admin/home-admin.module.css"
import { useSelector } from "react-redux"


const HomeAdmin = () => {

  const selector = useSelector(state => state.cart)
  const { orders } = useSelector(state => state.orders)
  
  const currentDate = new Date();
  const todaysDate = currentDate.getFullYear()+'/' +(currentDate.getMonth()+1)+'/'+currentDate.getDate();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    
    const formattedDate = `${year}/${month}/${day}`;
    return formattedDate;
  };
  
//Ordenes del dia
  const ordersDate = orders.map((order) => {
    const orderDate = order.date
    const firebaseTime = new Date(orderDate.seconds * 1000 + orderDate.nanoseconds / 1000000)
    const fecha = firebaseTime.toDateString();
    const formattedDate = formatDate(fecha);
    return formattedDate
  })
  // console.log("orderDate:", ordersDate)

  const todayOrder = () => {
    const todaysOrders = ordersDate.filter((o) => o.includes(todaysDate))
  if(todaysOrders.length > 0) return todaysOrders.length;
  else return "0 orders";
  }
  const allTodayOrders = todayOrder();
  
// ordenes de la semana
const lastWeek = new Date();
lastWeek.setDate(lastWeek.getDate() - 7);
const lastWeekString = formatDate(lastWeek)
const lastWeeksOrders = ordersDate.filter((date) => date >= lastWeekString && date <= todaysDate).length;


  return (
<div className={styles.base}>

    <h1>Panel Principal</h1>
    <div className={styles.container}>
      <p className={styles.item}>Ordenes</p>
      <div className={styles.flex}>
        <div className={styles.areaPanel}>
          <p className={styles.title}>Hoy</p>
          {allTodayOrders > 0 ? allTodayOrders : 0}
          <p className={styles.vExtra}>Ordenes del día</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Esta semana</p>
          {/* <p className={styles.value}>25</p> */}
          {lastWeeksOrders > 0 ? lastWeeksOrders : 0}
          <p className={styles.vExtra}>Ordenes esta semana</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Este mes</p>
          {orders ? orders.length : '0'}
          <p className={styles.vExtra}>Ordenes en el mes</p>
        </div>
      </div>

      <p className={styles.item}>Ingresos</p>
      
      <div className={styles.flex}>
        <div className={styles.areaPanel}>
          <p className={styles.title}>Hoy</p>
          <p className={styles.value}>2</p>
          <p className={styles.vExtra}>Ordenes del día</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Esta semana</p>
          <p className={styles.value}>25</p>
          <p className={styles.vExtra}>Ordenes esta semana</p>
        </div>

        <div className={styles.areaPanel}>
          <p className={styles.title}>Este mes</p>
          <p className={styles.value}>32</p>
          <p className={styles.vExtra}>Ordenes en el mes</p>
        </div>
      </div>
    </div>
   
    </div>
  )
}

export default HomeAdmin