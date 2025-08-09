const prisma = require("../../config/prisma");

exports.createList = async (req, res) => {
  const { name, description, isPublic } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({ error: "O nome da lista é obrigatório." });
  }

  try {
    const newList = await prisma.lists.create({
      data: {
        name,
        description,
        isPublic: isPublic || false,
        userId,
    }, });
    res.status(201).json(newList);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível criar a lista." });
} };

exports.getUserLists = async (req, res) => {
  const userId = req.user.id;

  try {
    const lists = await prisma.lists.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    res.json(lists);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível buscar as listas." });
} };

exports.deleteList = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const list = await prisma.lists.findUnique({
      where: { id },
    });

    if (!list) {
      return res.status(404).json({ error: "Lista não encontrada." });
    }

    if (list.userId !== userId) {
      return res
        .status(403)
        .json({ error: "Você não tem permissão para excluir esta lista." });
    }

    await prisma.lists.delete({
      where: { id },
    });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Não foi possível excluir a lista." });
} };
