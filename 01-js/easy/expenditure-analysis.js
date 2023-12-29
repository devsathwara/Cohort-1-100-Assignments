// <<<<<<< Updated upstream
/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
        {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

// =======
// >>>>>>> Stashed changes
function calculateTotalSpentByCategory(transactions) {
  let resultArray = [];

  for (let i = 0; i < transactions.length; i++) {
    let currentCategory = transactions[i].category;
    let totalAmount = transactions[i].price;


    while (i < transactions.length - 1 && transactions[i].category === transactions[i + 1].category) {
      i++;
      totalAmount += transactions[i].price; 
    }

    let existingCategory = resultArray.find(item => item.category === currentCategory);

    if (existingCategory) {
      existingCategory.totalSpent += totalAmount;
    } else {
      resultArray.push({ category: currentCategory, totalSpent: totalAmount });
    }
  }

  return resultArray;
}

module.exports = calculateTotalSpentByCategory;
