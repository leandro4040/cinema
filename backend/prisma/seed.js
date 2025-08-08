const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Iniciando o seeding...");

  await prisma.listItem.deleteMany();
  await prisma.lists.deleteMany();
  await prisma.review.deleteMany();
  await prisma.media.deleteMany();

  await prisma.media.createMany({
    data: [
      {
        title: "O Protetor: Capítulo Final",
        description:
          "Desde que desistiu de sua vida como assassino do governo, Robert McCall (Denzel Washington) luta para reconciliar as coisas horríveis que fez no passado e encontra um estranho consolo em servir à justiça em nome dos oprimidos.",
        releaseDate: new Date("2023-10-05"),
        posterUrl:
          "https://www.sonypictures.com.br/sites/brazil/files/tittle-page/thumbnails/sony_protetor3_576x313px.jpg",
        mediaType: "MOVIE",
        genres: ["Ação", "Crime", "Suspense"],
      },
      {
        title: "Oppenheimer",
        description:
          "A história do físico americano J. Robert Oppenheimer, seu papel no Projeto Manhattan e no desenvolvimento da bomba atômica durante a Segunda Guerra Mundial, e como isso mudou o mundo para sempre.",
        releaseDate: new Date("2023-07-21"),
        posterUrl:
          "https://images4.alphacoders.com/132/1323605.jpeg",
        mediaType: "MOVIE",
        genres: ["Drama", "História"],
      },
      {
        title: "Missão: Impossível - Acerto de Contas Parte 1",
        description:
          "Ethan Hunt e sua equipe da IMF embarcam em sua missão mais perigosa até agora: rastrear uma nova arma aterrorizante que ameaça toda a humanidade antes que caia nas mãos erradas.",
        releaseDate: new Date("2023-07-13"),
        posterUrl:
          "https://www.revistadestaque.com.br/wp-content/uploads/2023/07/imagem_2023-07-06_220716445-850x560.png",
        mediaType: "MOVIE",
        genres: ["Ação", "Aventura", "Suspense"],
  }, ], });

  await prisma.media.createMany({
    data: [
      {
        title: "The Last of Us",
        description:
          "Vinte anos após a civilização moderna ter sido destruída, Joel, um sobrevivente experiente, é contratado para contrabandear Ellie, uma menina de 14 anos, para fora de uma zona de quarentena opressiva.",
        releaseDate: new Date("2023-01-15"),
        posterUrl:
          "https://images7.alphacoders.com/129/1299920.jpg",
        mediaType: "SERIES",
        genres: ["Drama", "Ficção Científica", "Ação"],
      },
      {
        title: "Gen V",
        description:
          'Do mundo de "The Boys" vem "Gen V", uma série que explora a primeira geração de super-heróis a saber que seus superpoderes são do Composto V e que foram injetados neles.',
        releaseDate: new Date("2023-09-29"),
        posterUrl:
          "https://images6.alphacoders.com/132/1323290.jpeg",
        mediaType: "SERIES",
        genres: ["Ação", "Aventura", "Comédia"],
  }, ], });

  console.log("Seeding finalizado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });