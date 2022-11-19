const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = require("chai").expect;
const url = "http://localhost:8004";
chai.use(chaiHttp);

describe("Prueba de listado de frutas", () => {
  describe("Listado Exitoso", () => {
    it("Debe retornarse un objeto JSON con código y mensaje de respuesta donde se evidencien el listado de las frutas", (done) => {
      chai
        .request(url)
        .get("/api/fruits")
        .end(function (err, res) {
          if (err) done(err);

          expect(res).to.have.status(200);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("responseCode");
          expect(res.body).to.have.property("responseMessage");
          expect(res.body.responseCode).to.eql(0);
          expect(res.body.responseCode).to.be.an("number");
          expect(res.body.responseMessage).to.be.an("array");
          done();
        });
    });
  });

  describe("Error al listar", () => {
    it("Debe retornarse un objeto JSON con código y mensaje de respuesta donde se evidencien el listado de las frutas", (done) => {
      chai
        .request(url)
        .get("/api/fruits")
        .end(function (err, res) {
          if (err) done(err);
          expect(res).to.have.status(500);
          expect(res.body).to.be.an("object");
          expect(res.body).to.have.property("responseCode");
          expect(res.body).to.have.property("responseMessage");
          expect(res.body.responseCode).to.eql(1001);
          expect(res.body.responseCode).to.be.an("number");
          expect(res.body.responseMessage).to.eql("Ocurrió un error al listar las frutas");
          done();
        });
    });
  });
});
