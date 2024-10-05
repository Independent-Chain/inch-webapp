const formatUpgradeConfirm = (description, name, price) => {
    const upgradePhrase = description.split(' ');
    upgradePhrase.splice(1, 0, name);
    upgradePhrase.splice(3, 0, price);
    return upgradePhrase.join(" ");
  };

export default formatUpgradeConfirm;