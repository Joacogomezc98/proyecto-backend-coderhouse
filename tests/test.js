import chai from "chai";
import chaiHttp from "chai-http";
import configs from "../configs.js";
const expect = chai.expect

chai.use(chaiHttp)
// passportStub.install(app)
const url = `http://localhost:${configs.port}`

describe('Get all products', () => {
    it('Should get every product', (done) => {
        chai
            .request(url)
            .get('/api/productos/')
            .send()
            .end((err, res) => {
                console.log(res);
                expect(res.body).to.be.an('object');
                done()
            })
    })
})

describe('Get product by ID', () => {
    it('Should get the product with ID', (done) => {
        chai
            .request(url)
            .get('/api/productos/62e0b57e1ab86f90a7d6880f')
            .send()
            .end((err, res) => {
                console.log(res.body);
                expect(res.body).to.have.all.keys('title', 'price', 'thumbnail', 'stock', 'timestamp');
                done()
            })
    })
})

describe('Add a product', () => {
    it('Should be able to add a product', (done) => {
        chai
            .request(url)
            .post('/api/productos/')
            .send({
                title: "SMIRNOFF ICE APPLE 473ml",
                price: 200,
                thumbnail: "http://www.puroescabio.com.ar/web/image/product.template/74947/image_256/%5B4860%5D%20SMIRNOFF%20ICE%20473ml?unique=1e17d14",
                stock: 100,
                timestamp: "1234124",
                admin: true
            })
            .end((err, res) => {
                console.log(res.body);
                expect(res.body).to.have.all.keys('title', 'price', 'thumbnail', 'stock', 'timestamp', '_id', '__v');
                done()
            })
    })
})

describe('Edit a product', () => {
    it('Should be able to edit a product', (done) => {
        chai
            .request(url)
            .put('/api/productos/62e0b57e1ab86f90a7d6880f')
            .send({
                title: "SMIRNOFF ICE APPLE 473ml",
                price: 2000,
                thumbnail: "http://www.puroescabio.com.ar/web/image/product.template/74947/image_256/%5B4860%5D%20SMIRNOFF%20ICE%20473ml?unique=1e17d14",
                stock: 100,
                timestamp: "1234124",
                admin: true
            })
            .end((err, res) => {
                console.log(res.text);
                expect(res.text).to.equal('Product Edited Successfully');
                done()
            })
    })
})

describe('Delete a product', () => {
    it('Should be able to delete a product', (done) => {
        chai
            .request(url)
            .delete('/api/productos/62e0bce91ab86f90a7d68826')
            .send({
                admin: true
            })
            .end((err, res) => {
                console.log(res.text);
                expect(res.text).to.equal('The product has been deleted');
                done()
            })
    })
})