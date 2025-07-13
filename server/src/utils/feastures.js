import ProductData from "../Models/Product.model.js";

export const invalidateCache = async () => {
  const productkey = ["products", "cateproduct", "allproduct,allorders,"];

  mycache.del(productkey);
};











export const findAverageRatings = async (
  productId
) => {
  let totalRating = 0;

  const reviews = await Review.find({ product: productId });
  reviews.forEach((review) => {
    totalRating += review.rating;
  });

  const averateRating = Math.floor(totalRating / reviews.length) || 0;

  return {
    numOfReviews: reviews.length,
    ratings: averateRating,
  };
};



export const calculatePercentage = (thisMonth, lastMonth) => {
  if (lastMonth === 0) return thisMonth * 1;
  const percent = (thisMonth - lastMonth)/ lastMonth;
  return Number(percent.toFixed(0));


  
};

export const getInventories = async ({
  categories,
  productsCount,}
) => {
  const categoriesCountPromise = categories.map((category) =>
    ProductData.countDocuments({ category })
  );

  const categoriesCount = await Promise.all(categoriesCountPromise);

  const categoryCount = [];

  categories.forEach((category, i) => {
    categoryCount.push({
      "name":category,
      "number": Math.round((categoriesCount[i] / productsCount) * 100),
    });
  });

  return categoryCount;
};

export const list = ()=>{
  
  const result = [


  ]


  const currentdate = new Date();

  for (let i = 5; i > -1; i--) {
    const monthdate = new Date(currentdate.getFullYear(),currentdate.getMonth() - i,1)
    const months = monthdate.toLocaleString("default",{month:"long"});
    
    result.push(months)
  }
    return (result)
  }

  

export const getChartData = ({
  length,
  docArr,
  today,
  property,
}) => {
  const data = new Array(length).fill(0);

  docArr.forEach((i) => {
    const creationDate = i.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

    if (monthDiff < length) {
      if (property) {
        data[length - monthDiff - 1] += i[property];
      } else {
        data[length - monthDiff - 1] += 1;
      }
    }
  });

  return data;
};