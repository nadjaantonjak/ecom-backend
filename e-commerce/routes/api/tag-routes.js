const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try { 
    const tagData = await Tag.findAll({
      include: {
        model: Product, // associated Product data
        attributes: ['product_name', 'price', 'stock', 'category_id']
      }
    })
    if(!tagData[0]) {
        res.status(404).json({message: 'These tags do not exist'}); //status code for wrong query
        return;
      }
      res.status(200).json(tagData); // status code for the response
    }
    catch (err) {
      res.status(500).json(err) //status code for Internal Server Error, it is a generic "catch-all" response
    }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try { 
    const tagData = await Tag.findByPk(req.params.id, {
      // include its associated Product data
      include: [
        { 
          model: Product, 
          attributes: ['product_name', 'price', 'stock', 'category_id']
        }
      ]
    });
    if(!tagData) {
        res.status(404).json({message: 'This tag does not exist'}); //status code for wrong query
        return;
      }
      res.status(200).json(tagData); // status code for the response
  }
  catch (err) {
    res.status(500).json(err) //status code for Internal Server Error, it is a generic "catch-all" response
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag exists with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag exists with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;