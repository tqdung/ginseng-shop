import { showNotification, cloneData } from "../utilities/fnUtil";
const saveCartItemLSGuest = item => {
  let productData;
  productData = cloneData(item);
  if (window.$("#input-quantity").length) {
    // Check if input-quantity exists
    let quantity = document.getElementById("input-quantity");
    if (quantity.value <= 0) {
      showNotification({
        type: "error",
        message: "Số Lượng Sản Phẩm Phải Lớn Hơn 0"
      });
    } else {
      // Add quantity use input to product data
      productData.quantity = parseFloat(quantity.value);
      // Add quantity use input to product data
      // create array in local storage
      let arrProductListLocalStorage = [];
      // Parse the serialized data back into an aray of objects
      arrProductListLocalStorage = getCartFromLS();
      // if duplicate product, just add quantity
      arrProductListLocalStorage = checkExistingItem(
        productData,
        arrProductListLocalStorage
      );
      // Re-serialize the array back into a string and store it in localStorage
      localStorage.setItem("list", JSON.stringify(arrProductListLocalStorage));
      showNotification({ message: "Lưu Vào Giỏ Hàng Thành Công!" });
    }
  } else {
    // Add quantity use input to product data
    productData.quantity = parseFloat(1);
    // create array in local storage
    let arrProductListLocalStorage = [];
    // Parse the serialized data back into an aray of objects
    arrProductListLocalStorage = getCartFromLS();
    // if duplicate product, just add quantity
    arrProductListLocalStorage = checkExistingItem(
      productData,
      arrProductListLocalStorage
    );
    // Re-serialize the array back into a string and store it in localStorage
    localStorage.setItem("list", JSON.stringify(arrProductListLocalStorage));
    showNotification({ message: "Lưu Vào Giỏ Hàng Thành Công!" });
  }
};

const checkExistingItem = (product, arr) => {
  let isExist = false;
  let clonedArr = arr.slice();
  clonedArr.forEach(element => {
    if (element._id === product._id) {
      // element.quantity += product.quantity;
      isExist = true;
    }
  });
  if (isExist) {
    return clonedArr;
  }
  clonedArr.push(product);
  return clonedArr;
};

// const removeCartItemLS = (cartList, itemID) => {

//   cartList = cartList.filter(ele => ele._id !== itemID);

//   let cartListTemp = cartList.slice(0);

//   const user = JSON.parse(localStorage.getItem('authUser')) || []
//   const arrProductListAuthLS = {
//     arrProductListLocalStorage: cartListTemp,
//     userPhone: user.userPhone

//   }
//   if (loginService.isAuthenticated()) {
//     localStorage.setItem("listAuth", JSON.stringify(arrProductListAuthLS));
//   } else {
//     localStorage.setItem("list", JSON.stringify(cartListTemp));
//   }

//   return cartList;
// }

// const addProductToCart = (productInfo, cart) => {
//   const clonedCart = cloneData(cart);
//   if (loginService.isAuthenticated()) {
//     clonedCart.productOrder.push(productInfo);
//     Actions.userActions.updateCartFromSV(cart._id, clonedCart);
//   }
//   else {
//     return saveCartItemLSGuest(productInfo)
//   }
// }

const getCartFromLS = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

const cartService = {
  saveCartItemLSGuest,
  getCartFromLS,
  checkExistingItem
};

export default cartService;
