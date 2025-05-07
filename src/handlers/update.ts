import prisma from "../db";

// Get all
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({ data: updates });
};

// Get one
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findFirst({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

// Create one
export const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
      belongsToId: req.user.id,

      // with @@unique
      // id_belongsToId: { id: req.body.productId, belongsToId: req.user.id}
    },
  });

  if (!product) {
    // does not belong to user
    return res.json({ message: "nope" });
  }

  const update = await prisma.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

// Update one
export const updateUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  // const updated = await prisma.update.update({});

  // res.json({ data: updated });
};

// Delete one
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await prisma.product.delete({
      where: {
        id: req.params.id,
        belongsToId: req.user.id,

        //    with index
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
