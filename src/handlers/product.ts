import prisma from "../db";

// Get all
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// Get one
export const getOneProduct = async (req, res) => {
  const id = req.params.id;

  const product = await prisma.product.findFirst({
    where: {
      id: id,
      belongsToId: req.user.id,

      //    with @@index
      // id_belongsToId: {
      //   id: req.params.id,
      //   belongsToId: req.user.id
      // }
    },
  });

  res.json({ data: product });
};

// Create one
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        description: req.body.description,
        belongsToId: req.user.id,
      },
    });

    res.json({ data: product });
  } catch (error) {
    next(error);
  }
};

// Update one
export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,

      //    with @@index
      // id_belongsToId: {
      //   id: req.params.id,
      //   belongsToId: req.user.id
      // }
    },
    data: {
      name: req.body.name,
      description: req.body.description,
    },
  });

  res.json({ data: updated });
};

// Delete one
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,

        //    with @@index
        // id_belongsToId: {
        //   id: req.params.id,
        //   belongsToId: req.user.id
        // }
      },
    });
  } catch (error) {
    // console.log(error) res.status(403) res.json({error: error})
  }
};
