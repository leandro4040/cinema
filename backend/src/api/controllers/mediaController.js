const prisma = require("../../config/prisma");

exports.getAllMedia = async (req, res) => {
  const { type } = req.query;

  try {
    const whereClause = type ? { mediaType: type.toUpperCase() } : {};
    const media = await prisma.media.findMany({
      where: whereClause,
      orderBy: { releaseDate: "desc" },
    });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: "Não foi possível buscar as mídias." });
} };