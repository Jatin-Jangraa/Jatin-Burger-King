import OrderData from "../Models/Order.model.js";
import ProductData from "../Models/Product.model.js";
import UserData from "../Models/User.models.js";
import { calculatePercentage, getChartData ,getInventories, list} from "../utils/feastures.js";






export const getstats = async (req, res) => {
  let stats;


  const today = new Date();
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  console.log(sixMonthsAgo);


  const thisMonth = {
    start: new Date(today.getFullYear(), today.getMonth(), 1),
    end: today,
  };

  const lastMonth = {
    start: new Date(today.getFullYear(), today.getMonth() - 1, 1),
    end: new Date(today.getFullYear(), today.getMonth(), 0),
  };

  const thisMonthProductsPromise = ProductData.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthProductsPromise = ProductData.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthUsersPromise = UserData.find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthUsersPromise = UserData.find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const thisMonthOrdersPromise = OrderData .find({
    createdAt: {
      $gte: thisMonth.start,
      $lte: thisMonth.end,
    },
  });

  const lastMonthOrdersPromise = OrderData .find({
    createdAt: {
      $gte: lastMonth.start,
      $lte: lastMonth.end,
    },
  });

  const lastSixMonthOrdersPromise = OrderData .find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  });

  const latestTransactionsPromise = OrderData .find({})
    .select(["orderitems", "discount", "total", "status","user","name"]).sort({createdAt: -1}).limit(4);

    

  const [
    thisMonthProducts,
    thisMonthUsers,
    thisMonthOrders,
    lastMonthProducts,
    lastMonthUsers,
    lastMonthOrders,
    productsCount,
    usersCount,
    allOrders,
    lastSixMonthOrders,
    categories,
    femaleUsersCount,
    latestTransaction,
  ] = await Promise.all([
    thisMonthProductsPromise,
    thisMonthUsersPromise,
    thisMonthOrdersPromise,
    lastMonthProductsPromise,
    lastMonthUsersPromise,
    lastMonthOrdersPromise,
    ProductData.countDocuments(),
    UserData.countDocuments(),
    OrderData .find({}).select("total"),
    lastSixMonthOrdersPromise,
    ProductData.distinct("category"),
    UserData.countDocuments({ gender: "Female" }),
    latestTransactionsPromise,
    
  ]);

  const thisMonthRevenue = thisMonthOrders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  const lastMonthRevenue = lastMonthOrders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  const changePercent = {
    revenue: calculatePercentage(thisMonthRevenue, lastMonthRevenue),
    product: calculatePercentage(
      thisMonthProducts.length,
      lastMonthProducts.length
    ),
    user: calculatePercentage(thisMonthUsers.length, lastMonthUsers.length),
    order: calculatePercentage(
      thisMonthOrders.length,
      lastMonthOrders.length
    ),
  };

  const revenue = allOrders.reduce(
    (total, order) => total + (order.total || 0),
    0
  );

  const count = {
    revenue: {
      name: "Revenue",
      amount: revenue,
    },

    product: {
      name: "Products",
      amount: productsCount,
    },

    user: {
      name: "User",
      amount: usersCount,
    },
    

    transaction: {
      name: "Transactions",
      amount: allOrders.length,
    }

  };

  const orderMonthCounts = new Array(6).fill(0);
  const orderMonthyRevenue = new Array(6).fill(0);

  lastSixMonthOrders.forEach((order) => {
    const creationDate = order.createdAt;
    const monthDiff = (today.getMonth() - creationDate.getMonth() + 12) % 12;

    if (monthDiff < 6) {
      orderMonthCounts[6 - monthDiff - 1] += 1;
      orderMonthyRevenue[6 - monthDiff - 1] += order.total;
    }
  });





  const listofmonth = list()







  const userRatio = {
    male: usersCount - femaleUsersCount,
    female: femaleUsersCount,
  };


  stats = {
    changePercent,
    count,
    chart:[
        { month: (listofmonth[0]).slice(0, 3),revenue: orderMonthyRevenue[0] / 100, transactions: orderMonthCounts[0]  },
        { month: (listofmonth[1]).slice(0, 3),revenue: orderMonthyRevenue[1] / 100, transactions: orderMonthCounts[1]  },
        { month: (listofmonth[2]).slice(0, 3),revenue: orderMonthyRevenue[2] / 100, transactions: orderMonthCounts[2]  },
        { month: (listofmonth[3]).slice(0, 3),revenue: orderMonthyRevenue[3] / 100, transactions: orderMonthCounts[3]  },
        { month: (listofmonth[4]).slice(0, 3),revenue: orderMonthyRevenue[4] / 100, transactions: orderMonthCounts[4]  },
        { month: (listofmonth[5]).slice(0, 3),revenue: orderMonthyRevenue[5] / 100, transactions: orderMonthCounts[5]  },
      ],

  };

  // await redis.setex(key, redisTTL, JSON.stringify(stats));


  return res.status(200).json({
    success: true,
    stats,
  });
};

export const getPie = (async (req, res, next) => {
  let charts;

  const allOrderPromise = OrderData .find({}).select([
    "total",
    "discount",
    "subtotal",
    "tax",
    "shippingcharges",
  ]);

  const [
    processingOrder,
    shippedOrder,
    deliveredOrder,
    categories,
    productsCount,
    outOfStock,
    allOrders,
    allUsers,
    adminUsers,
    customerUsers,
  ] = await Promise.all([
    OrderData.countDocuments({ status: "Processing" }),
    OrderData.countDocuments({ status: "Shipped" }),
    OrderData.countDocuments({ status: "Delivered" }),
    ProductData.distinct("category"),
    ProductData.countDocuments(),
    ProductData.countDocuments({ available: false }),
    allOrderPromise,
    UserData.find({}).select(["dob"]),
    UserData.countDocuments({ role: "admin" }),
    UserData.countDocuments({ role: "user" }),
  ]);

  const orderFullfillment = [
    {name:"Processing",number: processingOrder},

    {name:"Shipped",number: shippedOrder},

    {name:"Delivered",number: deliveredOrder},
      ];

  const productCategories = await getInventories({
    categories,
    productsCount,
  });

  const stockAvailablity = [
  {name:  "Item Available",number: productsCount - outOfStock},
   { name:"Item Not Available",number:outOfStock},
  ];

  const grossIncome = allOrders.reduce(
    (prev, order) => prev + (order.total || 0),
    0
  );

  const discount = allOrders.reduce(
    (prev, order) => prev + (order.discount || 0),
    0
  );

  const productionCost = allOrders.reduce(
    (prev, order) => prev + (order.shippingcharges || 0),
    0
  );

  const burnt = allOrders.reduce((prev, order) => prev + (order.tax || 0), 0);

  const marketingCost = Math.round(grossIncome * (20 / 100));

  const netMargin =
    grossIncome - discount - productionCost - burnt - marketingCost;

  const revenueDistribution = [
    {name:"NetMargin",number:netMargin},
    {name:"Discount",number:discount},
    {name:"ProductionCost",number:productionCost},
    {name:"Burnt",number:burnt},
    {name:"MarketingCost",number:marketingCost},
  
  ];

 

  const adminCustomer = [
   {name: "Admin",number: adminUsers},
   {name: "Customer",number: customerUsers,}
  ];

  charts = {
    orderFullfillment,
    stockAvailablity,
    revenueDistribution,
    
    adminCustomer,
  };

  //     await redis.setex(key, redisTTL, JSON.stringify(charts));


  return res.status(200).json({
    success: true,
    charts,
  });
});

export const getBarCharts = async (req, res, next) => {
  let charts;
  //   const key = "admin-bar-charts";

  //   charts = await redis.get(key);

  //   if (charts) charts = JSON.parse(charts);
  //   else {
  const today = new Date();

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const twelveMonthsAgo = new Date();
  twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

  const sixMonthProductPromise = ProductData.find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const sixMonthUsersPromise = UserData.find({
    createdAt: {
      $gte: sixMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const twelveMonthOrdersPromise = OrderData .find({
    createdAt: {
      $gte: twelveMonthsAgo,
      $lte: today,
    },
  }).select("createdAt");

  const [products, users, orders] = await Promise.all([
    sixMonthProductPromise,
    sixMonthUsersPromise,
    twelveMonthOrdersPromise,
  ]);

  const productCounts = getChartData({ length: 6, today, docArr: products });
  const usersCounts = getChartData({ length: 6, today, docArr: users });
  const ordersCounts = getChartData({ length: 6, today, docArr: orders });
  const listofmonth = list()

  charts = {
    months:listofmonth,
    users: usersCounts,
    products: productCounts,
    orders: ordersCounts,
  };

  //     await redis.setex(key, redisTTL, JSON.stringify(charts));
  //   }

  return res.status(200).json({
    success: true,
    charts,
  });
};

// export const getLineCharts = async (req, res, next) => {
//   let charts;
//   //   const key = "admin-line-charts";

//   //   charts = await redis.get(key);

//   //   if (charts) charts = JSON.parse(charts);
//   //   else {
//   const today = new Date();

//   const twelveMonthsAgo = new Date();
//   twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);

//   const baseQuery = {
//     createdAt: {
//       $gte: twelveMonthsAgo,
//       $lte: today,
//     },
//   };

//   const [products, users, orders] = await Promise.all([
//     ProductData.find(baseQuery).select("createdAt"),
//     UserData.find(baseQuery).select("createdAt"),
//     OrderData.find(baseQuery).select(["createdAt", "discount", "total"]),
//   ]);

//   const productCounts = getChartData({ length: 12, today, docArr: products });
//   const usersCounts = getChartData({ length: 12, today, docArr: users });
//   const discount = getChartData({
//     length: 12,
//     today,
//     docArr: orders,
//     property: "discount",
//   });
//   const revenue = getChartData({
//     length: 12,
//     today,
//     docArr: orders,
//     property: "total",
//   });

//   charts = {
//     users: usersCounts,
//     products: productCounts,
//     discount,
//     revenue,
//   }

//   res.json(charts)

// };
