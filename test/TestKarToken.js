const addressRegex = /^(0x)([A-Fa-f0-9]{2}){20}$/;
var KarToken = artifacts.require('KarToken')
// var TestUSDC = artifacts.require('TestUSDC')
// var Diamond = artifacts.require('Diamond')
// var Drawing = artifacts.require('DiamondDrawing')
// var Exchange = artifacts.require('DiamondExchange')
// var RobotS = artifacts.require('RobotS')
// var RobotA = artifacts.require('RobotA')
// var Item = artifacts.require('Item')
// var ItemDrawing = artifacts.require('ItemDrawing')

// Diamond ID
var ID_SPLUS = 0;
var ID_S = 1;
var ID_A = 2;
var ID_B = 3;
var ID_C = 4;
var ID_ROCK = 5;

// Item ID
var ID_BATTERY_S = 0;
var ID_BATTERY_A = 1;
var ID_MACHINE = 2;
var ID_B_JUMP_S = 3;
var ID_C_JUMP_A = 4;
var ID_BLESS = 5;
// Robot ID
var ID_ROBOT_S = 0;
var ID_ROBOT_A = 1;

contract('KarToken', function(accounts){
  var tokenKARInstance

  var account_0 = accounts[0]
  var account_1 = accounts[1]

  // let draw_quantity = 1000 // draw 1000 quantity
  // let draw_price = 10000000n // draw 10 USDT
  // let approve_max_amount = "10000000000" // 10000 USDT

  // let itemdrawing_quantity = 100
  // let itemdrawing_price = 10000000n // draw 10 USDT
  // let itemdrawing_approve_max_amount = "1000000000" // 1000 USDT

  it('Token KAR instance should be ok.', function () {
    return KarToken.deployed().then(function (instance) {
      tokenKARInstance = instance
      return Promise.all([tokenKARInstance.balanceOf(account_0), tokenKARInstance.owner()])
    }).then(function (values) {
      assert.equal(values[0].valueOf(), 10000000000n)
      assert.equal(values[1], account_0)
    })
  })

})

// contract('Diamond', function (accounts) {
//   var itemInstance
//   var diamondInstance
//   var testUSDTInstance
//   var testUSDCInstance
//   var drawingInstance
//   var exchangeInstance
//   var robotSInstance
//   var robotAInstance
//   var itemDrawingInstance
  
//   var account_0 = accounts[0]
//   var account_1 = accounts[1]

//   let draw_quantity = 1000 // draw 1000 quantity
//   let draw_price = 10000000n // draw 10 USDT
//   let approve_max_amount = "10000000000" // 10000 USDT

//   let itemdrawing_quantity = 100
//   let itemdrawing_price = 10000000n // draw 10 USDT
//   let itemdrawing_approve_max_amount = "1000000000" // 1000 USDT

//   it('TestUSDT instance should be ok.', function () {
//     return TestUSDT.deployed().then(function (instance) {
//       testUSDTInstance = instance
//       return Promise.all([testUSDTInstance.balanceOf(account_0), testUSDTInstance.owner()])
//     }).then(function (values) {
//       assert.equal(values[0].valueOf(), 10000000000n)
//       assert.equal(values[1], account_0)
//     })
//   })

//   it('TestUSDC instance should be ok.', function () {
//     return TestUSDC.deployed().then(function (instance) {
//       testUSDCInstance = instance
//       return Promise.all([testUSDCInstance.balanceOf(account_0), testUSDCInstance.owner()])
//     }).then(function (values) {
//       assert.equal(values[0].valueOf(), 10000000000n)
//       assert.equal(values[1], account_0)
//     })
//   })

//   it('Diamond instance should be ok.', function () {
//     return Diamond.deployed().then(function (instance) {
//       diamondInstance = instance
//       return diamondInstance.owner()
//     }).then(function (owner) {
//       assert.equal(owner, account_0)
//     })
//   })

//   it('drawing instance should be ok.', function () {
//     return Drawing.new(diamondInstance.address).then(function (instance) {
//       drawingInstance = instance
//       return Promise.all([drawingInstance._numAvailableTokens(), drawingInstance.owner()])
//     }).then(function (values) {
//       assert.equal(values[0].valueOf(), draw_quantity) // 1000 quantity
//       assert.equal(values[1], account_0)
//     })
//   })

//   it('updated DiamondDrawing suppportTokens', async () => {
//     await drawingInstance.updatedSupportToken(testUSDTInstance.address, draw_price).then(async function(){
//       const values = await Promise.all([drawingInstance.supportToken(testUSDTInstance.address)]);
//       assert.equal(values[0].valueOf(), draw_price);
//     })

//     await drawingInstance.updatedSupportToken(testUSDCInstance.address, draw_price).then(async function(){
//       const values = await Promise.all([drawingInstance.supportToken(testUSDCInstance.address)]);
//       assert.equal(values[0].valueOf(), draw_price);
//     })
//   })

//   it('drawing contract register to diamond', async () => {
//     await diamondInstance.registerValidContractAddress(drawingInstance.address)
//   })

//   it('user approve TestUSDT to Drawing contract', function () {
//     return testUSDTInstance.approve(drawingInstance.address, approve_max_amount).then(function(){
//       return Promise.all([testUSDTInstance.allowance(account_0, drawingInstance.address)]).then(function(values){
//         assert.equal(values[0].toString(), approve_max_amount)
//       })
//     })
//   })

//   it('user approve TestUSDC to Drawing contract', function () {
//     return testUSDCInstance.approve(drawingInstance.address, approve_max_amount).then(function(){
//       return Promise.all([testUSDCInstance.allowance(account_0, drawingInstance.address)]).then(function(values){
//         assert.equal(values[0].toString(), approve_max_amount)
//       })
//     })
//   })

//   // item
//   it('Item instance should be ok.', function () {
//     return Item.deployed().then(function (instance) {
//       itemInstance = instance
//       return itemInstance.owner()
//     }).then(function (owner) {
//       assert.equal(owner, account_0)
//     })
//   })

//   it('RobotS instance should be ok.', function () {
//     return RobotS.new(diamondInstance.address, itemInstance.address).then(function (instance) {
//       robotSInstance = instance
//       return robotSInstance.owner()
//     }).then(function (owner) {
//       assert.equal(owner, account_0)
//     })
//   })

//   it('RobotA instance should be ok.', function () {
//     return RobotA.new(diamondInstance.address, itemInstance.address).then(function (instance) {
//       robotAInstance = instance
//       return robotAInstance.owner()
//     }).then(function (owner) {
//       assert.equal(owner, account_0)
//     })
//   })

//   it('ItemDrawing instance should be ok.', function () {
//     return ItemDrawing.new(diamondInstance.address, itemInstance.address, robotSInstance.address, robotAInstance.address).then(function (instance) {
//       itemDrawingInstance = instance
//       return Promise.all([itemDrawingInstance._numAvailableTokens(), itemDrawingInstance.owner()])
//     }).then(function (values) {
//       assert.equal(values[0].valueOf(), itemdrawing_quantity) // 100 quantity
//       assert.equal(values[1], account_0)
//     })
//   })

//   it('updated ItemDrawing suppportTokens', async () => {
//     await itemDrawingInstance.updatedSupportToken(testUSDTInstance.address, itemdrawing_price).then(async function(){
//       const values = await Promise.all([itemDrawingInstance.supportToken(testUSDTInstance.address)]);
//       assert.equal(values[0].valueOf(), itemdrawing_price);
//     })

//     await itemDrawingInstance.updatedSupportToken(testUSDCInstance.address, itemdrawing_price).then(async function(){
//       const values = await Promise.all([itemDrawingInstance.supportToken(testUSDCInstance.address)]);
//       assert.equal(values[0].valueOf(), itemdrawing_price);
//     })
//   })

//   it('ItemDrawing contract register to Diamond, Item and Robot', async () => {
//     await diamondInstance.registerValidContractAddress(itemDrawingInstance.address)
//     await itemInstance.registerValidContractAddress(itemDrawingInstance.address)
//     await robotSInstance.registerValidContractAddress(itemDrawingInstance.address)
//     await robotAInstance.registerValidContractAddress(itemDrawingInstance.address)
//   })

//   it('user approve TestUSDT to ItemDrawing contract', function () {
//     return testUSDTInstance.approve(itemDrawingInstance.address, itemdrawing_approve_max_amount).then(function(){
//       return Promise.all([testUSDTInstance.allowance(account_0, itemDrawingInstance.address)]).then(function(values){
//         assert.equal(values[0].toString(), itemdrawing_approve_max_amount)
//       })
//     })
//   })

//   it('user approve TestUSDC to ItemDrawing contract', function () {
//     return testUSDCInstance.approve(itemDrawingInstance.address, itemdrawing_approve_max_amount).then(function(){
//       return Promise.all([testUSDCInstance.allowance(account_0, itemDrawingInstance.address)]).then(function(values){
//         assert.equal(values[0].toString(), itemdrawing_approve_max_amount)
//       })
//     })
//   })

//   it('exchange instance should be ok.', function () {
//     return Exchange.new(diamondInstance.address, itemInstance.address).then(function (instance) {
//       exchangeInstance = instance
//       return Promise.all([exchangeInstance.owner()])
//     }).then(function (values) {
//       assert.equal(values[0], account_0)
//     })
//   })

//   it('exchange contract register to Diamond and Item', async () => {
//     await diamondInstance.registerValidContractAddress(exchangeInstance.address)
//     await itemInstance.registerValidContractAddress(exchangeInstance.address)
//   })

//   it('mint C to user and test C exchange to B', async () => {
//     await diamondInstance.mint(account_0, ID_C, 2, "0x00").then(async function(){
//       const values = await Promise.all([diamondInstance.balanceOf(account_0, ID_C)]);
//       assert.equal(values[0].valueOf(), 2);
//     })

//     await exchangeInstance.exchange_C_to_B().then(async function(){
//       const values_C = await Promise.all([diamondInstance.balanceOf(account_0, ID_C)]);
//       assert.equal(values_C[0].valueOf(), 0);

//       const values_B = await Promise.all([diamondInstance.balanceOf(account_0, ID_B)]);
//       assert.equal(values_B[0].valueOf(), 1);
//     })
//   })

//   it('mint C and B to user and test B exchange to A', async () => {
//     await diamondInstance.mint(account_0, ID_C, 1, "0x00").then(async function(){
//       const values = await Promise.all([diamondInstance.balanceOf(account_0, ID_C)]);
//       assert.equal(values[0].valueOf(), 1);
//     })

//     await diamondInstance.mint(account_0, ID_B, 3, "0x00").then(async function(){
//       const values = await Promise.all([diamondInstance.balanceOf(account_0, ID_B)]);
//       assert.equal(values[0].valueOf(), 4);
//     })

//     await exchangeInstance.exchange_B_to_A().then(async function(){
//       const values_C = await Promise.all([diamondInstance.balanceOf(account_0, ID_C)]);
//       assert.equal(values_C[0].valueOf(), 0);

//       const values_B = await Promise.all([diamondInstance.balanceOf(account_0, ID_B)]);
//       assert.equal(values_B[0].valueOf(), 0);

//       const values_A = await Promise.all([diamondInstance.balanceOf(account_0, ID_A)]);
//       assert.equal(values_A[0].valueOf(), 1);
//     })
//   })

//   it('mint C and A to user and test A exchange to S', async () => {
//     await diamondInstance.mint(account_0, ID_C, 1, "0x00").then(async function(){
//       const values = await Promise.all([diamondInstance.balanceOf(account_0, ID_C)]);
//       assert.equal(values[0].valueOf(), 1);
//     })

//     await diamondInstance.mint(account_0, ID_A, 4, "0x00").then(async function(){
//       const values = await Promise.all([diamondInstance.balanceOf(account_0, ID_A)]);
//       assert.equal(values[0].valueOf(), 5);
//     })

//     await exchangeInstance.exchange_A_to_S().then(async function(){
//       const values_C = await Promise.all([diamondInstance.balanceOf(account_0, ID_C)]);
//       assert.equal(values_C[0].valueOf(), 0);

//       const values_A = await Promise.all([diamondInstance.balanceOf(account_0, ID_A)]);
//       assert.equal(values_A[0].valueOf(), 0);

//       const values_S = await Promise.all([diamondInstance.balanceOf(account_0, ID_S)]);
//       assert.equal(values_S[0].valueOf(), 1);
//     })
//   })

//   it('mint C and S to user and test S exchange to S_PLUS', async () => {
//     await diamondInstance.mint(account_0, ID_C, 2, "0x00").then(async function(){
//       const values = await Promise.all([diamondInstance.balanceOf(account_0, ID_C)]);
//       assert.equal(values[0].valueOf(), 2);
//     })

//     await diamondInstance.mint(account_0, ID_S, 4, "0x00").then(async function(){
//       const values = await Promise.all([diamondInstance.balanceOf(account_0, ID_S)]);
//       assert.equal(values[0].valueOf(), 5);
//     })

//     await exchangeInstance.exchange_S_to_SPLUS().then(async function(){
//       const values_C = await Promise.all([diamondInstance.balanceOf(account_0, ID_C)]);
//       assert.equal(values_C[0].valueOf(), 0);

//       const values_S = await Promise.all([diamondInstance.balanceOf(account_0, ID_S)]);
//       assert.equal(values_S[0].valueOf(), 0);

//       const values_SPLUS = await Promise.all([diamondInstance.balanceOf(account_0, ID_SPLUS)]);
//       assert.equal(values_SPLUS[0].valueOf(), 1);
//     })
//   })

//   it('[DiamondDrawing] user use TestUSDT draw one', function () {
//     return drawingInstance.getRandomAvailableTokenId(testUSDTInstance.address).then(function(){
//       return Promise.all([testUSDTInstance.allowance(account_0, drawingInstance.address), drawingInstance._numAvailableTokens()]).then(function(values){
//         assert.equal(values[0].toString(), "9990000000")
//         assert.equal(values[1].valueOf(), 999)
//       })
//     })
//   })

//   it('[DiamondDrawing] user use TestUSDC draw one', function () {
//     return drawingInstance.getRandomAvailableTokenId(testUSDCInstance.address).then(function(){
//       return Promise.all([testUSDCInstance.allowance(account_0, drawingInstance.address), drawingInstance._numAvailableTokens()]).then(function(values){
//         assert.equal(values[0].toString(), "9990000000")
//         assert.equal(values[1].valueOf(), 998)
//       })
//     })
//   })

//   //   // ======= Mint All Diamond Drawing NFT =======
//   // it(`[DiamondDrawing] user use TestUSDC draw 98 times`, async () => {
//   //   for (let i = 1; i <= 98; i++) {
//   //     // console.log(`[${i}/98]`)
//   //     await drawingInstance.getRandomAvailableTokenId(testUSDCInstance.address)
//   //   }
//   // })

//   // for(let round = 1; round <= 9; round++){
//   //   it(`[DiamondDrawing] [${round}/9] every round user use TestUSDT draw 100 times`, async () => {
//   //     for (let i = 1; i <= 100; i++) {
//   //       // console.log(`[${round}/9] - [${i}/100]`)
//   //       await drawingInstance.getRandomAvailableTokenId(testUSDTInstance.address)
//   //     }
//   //   })
//   // }

//   // it('[DiamondDrawing] check result', async function () {
//   //   const values = await Promise.all([drawingInstance._numAvailableTokens(), diamondInstance.balanceOf(account_0, ID_S), diamondInstance.balanceOf(account_0, ID_A), diamondInstance.balanceOf(account_0, ID_B), diamondInstance.balanceOf(account_0, ID_C)]);
//   //   assert.equal(values[0].valueOf(), 0);
//   //   assert.equal(values[1].valueOf(), 16);
//   //   assert.equal(values[2].valueOf(), 84);
//   //   assert.equal(values[3].valueOf(), 300);
//   //   assert.equal(values[4].valueOf(), 600);
//   // })
//   // // ==========================================

//   it('[DiamondDrawing] withdraw from account_0.', async () => {
//     await drawingInstance.withdraw(account_0, testUSDTInstance.address).then(async function(){
//       const values = await Promise.all([testUSDTInstance.balanceOf(account_0), testUSDTInstance.balanceOf(drawingInstance.address)]);
//       assert.equal(values[0].valueOf(), 10000000000n);
//       assert.equal(values[1].valueOf(), 0);
//     })

//     await drawingInstance.withdraw(account_0, testUSDCInstance.address).then(async function(){
//       const values = await Promise.all([testUSDCInstance.balanceOf(account_0), testUSDCInstance.balanceOf(drawingInstance.address)]);
//       assert.equal(values[0].valueOf(), 10000000000n);
//       assert.equal(values[1].valueOf(), 0);
//     })
//   })

//   it(`[ItemDrawing] user use TestUSDT draw one`, async () => {
//     await itemDrawingInstance.getRandomAvailableTokenId(testUSDTInstance.address)
//     const values = await Promise.all([testUSDTInstance.allowance(account_0, itemDrawingInstance.address), itemDrawingInstance._numAvailableTokens()]);
//     assert.equal(values[0].toString(), "990000000")
//     assert.equal(values[1].valueOf(), 99)
//     // const values_temp = await Promise.all([itemDrawingInstance.temp(), itemDrawingInstance.temp_str()]);
//     // console.log(`${values_temp[0].valueOf()} ${values_temp[1].toString()}`)
//   })

//   it(`[ItemDrawing] user use TestUSDC draw one`, async () => {
//     await itemDrawingInstance.getRandomAvailableTokenId(testUSDCInstance.address)
//     const values = await Promise.all([testUSDCInstance.allowance(account_0, itemDrawingInstance.address), itemDrawingInstance._numAvailableTokens()]);
//     assert.equal(values[0].toString(), "990000000")
//     assert.equal(values[1].valueOf(), 98)
//     // const values_temp = await Promise.all([itemDrawingInstance.temp(), itemDrawingInstance.temp_str()]);
//     // console.log(`${values_temp[0].valueOf()} ${values_temp[1].toString()}`)
//   })

//   //   // ======= Mint All ItemDrawing NFT =======
//   // it(`[ItemDrawing] user use TestUSDT draw 98 times`, async () => {
//   //   for (let i = 1; i <= 98; i++) {
//   //     // console.log(`[${i}/98]`)
//   //     await itemDrawingInstance.getRandomAvailableTokenId(testUSDTInstance.address)
//   //     // const values_temp = await Promise.all([itemDrawingInstance.temp(), itemDrawingInstance.temp_str()]);
//   //     // console.log(`${values_temp[0].valueOf()} ${values_temp[1].toString()}`)
//   //   }
//   // })

//   // it('[ItemDrawing] check result', async function () {
//   //   const values = await Promise.all([itemDrawingInstance._numAvailableTokens(),
//   //                                     itemInstance.balanceOf(account_0, ID_B_JUMP_S), 
//   //                                     itemInstance.balanceOf(account_0, ID_C_JUMP_A),
//   //                                     itemInstance.balanceOf(account_0, ID_BLESS), 
//   //                                     itemInstance.balanceOf(account_0, ID_MACHINE), 
//   //                                     diamondInstance.balanceOf(account_0, ID_ROCK),
//   //                                     ]);
//   //   assert.equal(values[0].valueOf(), 0);
//   //   assert.equal(values[1].valueOf(), 4);
//   //   assert.equal(values[2].valueOf(), 15);
//   //   assert.equal(values[3].valueOf(), 10);
//   //   assert.equal(values[4].valueOf(), 15);
//   //   assert.equal(values[5].valueOf(), 510);
//   // })
//   // // ==========================================

//   it('[ItemDrawing] withdraw from account_0.', async () => {
//     await itemDrawingInstance.withdraw(account_0, testUSDTInstance.address).then(async function(){
//       const values = await Promise.all([testUSDTInstance.balanceOf(account_0), testUSDTInstance.balanceOf(itemDrawingInstance.address)]);
//       assert.equal(values[0].valueOf(), 10000000000n);
//       assert.equal(values[1].valueOf(), 0);
//     })

//     await itemDrawingInstance.withdraw(account_0, testUSDCInstance.address).then(async function(){
//       const values = await Promise.all([testUSDCInstance.balanceOf(account_0), testUSDCInstance.balanceOf(itemDrawingInstance.address)]);
//       assert.equal(values[0].valueOf(), 10000000000n);
//       assert.equal(values[1].valueOf(), 0);
//     })
//   })
// })
