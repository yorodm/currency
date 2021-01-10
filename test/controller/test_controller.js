
const expect = require("chai").expect;
const request = require("supertest");
const Currency = require("../../src/model");
const server = require("../../src/api");
const mongoose = require('mongoose');

let userId = '';

describe("Currency API", () => {
  afterEach(async () => {
	await Currency.deleteMany({});
  });

  beforeEach(async ()=> {
	const currencies = [
	  {
		code: true,
		before: true,
		description: "United States Dollar",
		format: "$####.##",
		market: "US"
	  },
	  {
		code: true,
		before: true,
		description: "Pound",
		format: "####.##",
		market: "UK"
	  }
	];
	await Currency.insertMany(currencies);
  });

  after(async () => {
	mongoose.disconnect();
  });

  describe("GET /currency/", () => {
	it("should return all currencies", async () => {
	  const res = await request(server).get("/currency");
	  expect(res.status).to.equal(200);
	  expect(res.body.length).to.equal(2);
	});
  });

  describe("GET /:market/currency/", () => {
	it("should return a list of currencies for the given market", async () => {
	  const res = await request(server).get("/UK/currency/");
	  expect(res.status).to.equal(200);
	  expect(res.body.length).to.equal(1)
	});

	it("should return 200 and an empty list if market doesn't exists", async () => {
	  const res = await request(server).get("/EU/currency/");
	  expect(res.status).to.equal(200);
	  expect(res.body.length).to.equal(0)
	});
  });

  describe("POST /currency", () => {
	it("should return currency when the all request body is valid", async () => {
	  const res = await request(server)
			.post("/currency")
			.send({
			  code: true,
			  before: true,
			  description: "Canadian Dollar",
			  format: "####.##",
			  market: "CA"
			});
	  const data = res.body;
	  expect(res.status).to.equal(200);
	  expect(data).to.have.property("_id");
	  expect(data).to.have.property("description", "Canadian Dollar");
	  expect(data).to.have.property("market", "CA");
	  const currency = await Currency.findOne({ description: 'Canadian Dollar' });
	  expect(currency.market).to.equal('CA');
	  expect(currency.showCents).to.equal(false);
	});
  });

});
