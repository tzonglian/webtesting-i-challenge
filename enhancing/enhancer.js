module.exports = {
  success,
  fail,
  repair,
  get,
  itemMaker,
};

function itemMaker(name, durability, enhancement) {
  return {
    name, // string
    durability, // integer between 0-100
    enhancement, // integer between 0-20
  };
}

function repair(item) {
  return { ...item, durability: 100 };
}

function success(item) {
  if (item.enhancement === 20) {
    return item;
  }
  const newEnhance = item.enhancement + 1;
  return { ...item, enhancement: newEnhance };
}

function fail(item) {
  if (item.enhancement < 15) {
    const newDurability = item.durability - 5;
    return { ...item, durability: newDurability };
  } else {
    const newDurability = item.durability - 10;
    if (item.enhancement > 16) {
      const newEnhance = item.enhancement - 1;
      return { ...item, durability: newDurability, enhancement: newEnhance };
    }
    return { ...item, durability: newDurability };
  }
}

function get(item) {
  return { ...item };
}
