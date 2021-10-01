const express = require("express");
const { Router } = express;

const router = Router();

const mandatoryParams = ["title", "price", "thumbnail"];
let productos = [];

router.get("/", (req, res) => {
    res.send(productos);
});

router.get("/:id", (req, res) => {
   res.send(productos.filter(item => item.id.toString() === req.params.id));
});

router.post("/", (req, res) => {
    if (checkObjectParams(mandatoryParams, req.query)) {
        addProductFromObject(productos, req.query);
        res.send(productos[productos.length - 1]);
        return
    }
    res.send("Incluya solo title, price y thumbnail");
});

router.put("/:id", (req, res) => {
    if(checkObjectParams(mandatoryParams, req.query)) {
        const newItem = {...req.query, id: parseInt(req.params.id)};
        const index = productos.findIndex(item => item.id.toString() === req.params.id);
        productos.splice(index, 1, newItem);
        res.send("Producto actualizado");
        return
    }
    res.send("Incluya solo title, price y thumbnail");
});

router.delete("/:id", (req, res) => {
    const index = productos.findIndex(item => item.id.toString() === req.params.id);
    if (index !== -1) {
        productos.splice(index, 1);
        res.send("Producto eliminado");
        return
    }
    res.send("No se encontró el producto, verifique el id");
});

function checkObjectParams(arrayParams, object) {
    return arrayParams.every(el => object.hasOwnProperty(el)) && Object.keys(object).length === 3;
}

function addProductFromObject(array, object) {
    array.push({...object, id: array.length + 1});
}

module.exports = router;