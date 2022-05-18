const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({ include: [{ model: Product, through: ProductTag }] })
    .then((result) => res.json(result))
    .catch((err) => res.status(500).json(err));
  // be sure to include its associated Product data
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    include: [{ model: Product, through: ProductTag }],
    where: { id: req.params.id },
  })
    .then((result) => res.json(result))
    .catch((err) => res.status(400).json(err));
  // be sure to include its associated Product data
});

router.post("/", (req, res) => {
  Tag.create(req.body)
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
  // create a new tag
});

router.put("/:id", (req, res) => {
  Tag.update(req.body, { where: { id: req.params.id } })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({ where: { id: req.params.id } })
    .then((result) => res.status(200).json(result))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;
