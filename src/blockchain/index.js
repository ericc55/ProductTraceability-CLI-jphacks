import TraceSystemJson from './ProductTraceabilitySystem.json';

let TraceSystem = null;

export const updateWeb3 = async (web3) => {
  TraceSystem = new web3.eth.Contract(
    TraceSystemJson.abi,
    '0xF91eea26CFEC5f38211bCf6D6E91403033A364a3',
  );
};
export const getTrace = async (productID) => {
  const events = await TraceSystem.getPastEvents('Confirm', {
    filter: { productionID: productID }, // Using an array means OR: e.g. 20 or 23
    fromBlock: 0,
    toBlock: 'latest',
  });
  return events;
};

export const getGlobalTrace = async (productID, unitID) => {
  const events = await TraceSystem.getPastEvents('Confirm', {
    filter: { productionID: productID, productionUnitID: unitID },
    fromBlock: 0,
    toBlock: 'latest',
  });
  return events;
};

export const getGlobalSanction = async (unitID) => {
  const events = await TraceSystem.getPastEvents('Sanction', {
    filter: { productionUnitID: unitID },
    fromBlock: 0,
    toBlock: 'latest',
  });
  return events;
};
export const getGlobalComplain = async (puserID, unitID) => {
  const events = await TraceSystem.getPastEvents('Complaint', {
    filter: { productionUnitID: unitID, userID: puserID },
    fromBlock: 0,
    toBlock: 'latest',
  });
  return events;
};
export const getGlobalUnitRegister = async (unitID) => {
  const events = await TraceSystem.getPastEvents('UnitRegister', {
    filter: { productionUnitID: unitID },
    fromBlock: 0,
    toBlock: 'latest',
  });
  return events;
};
export const getGlobalHandleComplain = async (unitID) => {
  const events = await TraceSystem.getPastEvents('ComplaintHandled', {
    filter: { productionUnitID: unitID },
    fromBlock: 0,
    toBlock: 'latest',
  });
  return events;
};

export const confirm = async (sender, { productID, state }) => {
  await TraceSystem.methods.confirm(productID, state).send({
    from: sender,
  });
};

export const complain = async (sender, { unitID }) => {
  await TraceSystem.methods.complain(unitID).send({
    from: sender,
  });
};

export const callUserRegister = async (sender, { id }) => {
  console.log(id);
  const flag = await TraceSystem.methods.userRegister(id).call({
    gas: 180000,
    from: sender,
  });
  return flag;
};
export const sendUserRegister = async (sender, { id }) => {
  console.log(id);
  const flag = await TraceSystem.methods.userRegister(id).send({
    gas: 180000,
    from: sender,
  });
  return flag;
};
export const generateProductID = async (sender, { time }) => {
  const res = await TraceSystem.methods.generateProductID(time).call({ gas: 180000, from: sender });
  return res;
};

export const isUserRegistered = async (sender) => {
  console.log('judge register:');
  console.log(sender);
  const flag = await TraceSystem.methods.getUserRegistered(sender).call({ from: sender });
  console.log(flag);
  console.log('judge register:');

  return flag;
};
export const registerUnit = async (sender, { name, address, addrCode }) => {
  await TraceSystem.methods.unitRegister(address, addrCode, name)
    .send({ from: sender, gas: 180000 });
};
export const getUserID = async (sender) => {
  const one = await TraceSystem.methods.getUserID().call({ from: sender });
  return one;
};
export const score = async (sender, { unitID, point }) => {
  const id = parseInt(unitID, 10);
  console.log(sender, unitID, point);
  await TraceSystem.methods.score(id, point * 2).send({ from: sender });
};
export const getCredit = async (sender) => {
  const credit = await TraceSystem.methods.getCredit().call({ from: sender });
  return credit;
};

export const getScore = async ({ unitID }) => {
  const credit = await TraceSystem.methods.getScore(unitID).call();
  return credit;
};
export const getUnitID = async (sender) => {
  const id = await TraceSystem.methods.getUnitID().call({ from: sender });
  return id;
};

export const HandleComplain = async (sender, { userID, unitID, result }) => {
  await TraceSystem.methods.HandleComplain(userID, unitID, result).send({ from: sender });
};
export const banUser = async (sender, { userID }) => {
  await TraceSystem.methods.banUser(userID).send({ from: sender });
};
export const userRecover = async (sender, { userID }) => {
  await TraceSystem.methods.userRecover(userID).send({ from: sender });
};
export const sanction = async (sender, { unitID }) => {
  await TraceSystem.methods.sanction(unitID).send({ from: sender });
};
export const unitRecover = async (sender, { unitID }) => {
  await TraceSystem.methods.unitRecover(unitID).send({ from: sender });
};
export default {
  updateWeb3,
  confirm,
  sendUserRegister,
  callUserRegister,
  isUserRegistered,
  generateProductID,
  getUnitID,
};
