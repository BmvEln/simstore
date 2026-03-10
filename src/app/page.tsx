import Container from "@/components/shared/container";
import Title from "@/components/shared/title";
import TopBar from "@/components/shared/top-bar";
import Filters from "@/components/shared/filters";
import ProductGroup from "@/components/shared/product-group-list";

export default function Home() {
  return (
    <>
      <Container className="mt-10">
        <Title text="Все симуляторы" size="lg" className="font-extrabold" />
      </Container>

      <TopBar />

      <Container className="mt-10 pb14">
        <div className="flex gap-16">
          <div className="w-[250px] flex-shrink-0">
            <Filters />
          </div>

          <div className="flex gap-8 flex-col">
            <ProductGroup
              title="Транспортные"
              items={[
                {
                  id: 1,
                  name: "American Truck",
                  desc: "Ощутите мощь легендарных американских грузовиков и доставляйте разнообразные грузы по солнечной Калифорнии, песчаной Неваде и величественному Большому Каньону штата Аризона.",
                  price: 187,
                  date: "2 февр. 2016 г.",
                  developer: "SCS Software",
                  rating: 3,
                },
                {
                  id: 2,
                  name: "Euro Truck",
                  desc: "Станьте королем европейских дорог — водителем грузовика, который доставляет важные грузы на немалые расстояния!",
                  price: 187,
                  date: "12 окт. 2012 г.",
                  developer: "SCS Software",
                  rating: 2,
                },
                {
                  id: 3,
                  name: "Forza Horizon 6",
                  desc: "Исследуйте потрясающие пейзажи Японии за рулем любой из более чем 550 реальных машин и станьте настоящей легендой фестиваля Horizon в самом масштабном гоночном приключении в открытом мире.",
                  price: 1499,
                  date: "19 мая 2026 г.",
                  developer: "Playground Games",
                  rating: 4,
                },
                {
                  id: 4,
                  name: "Farming Simulator 25",
                  desc: "Игра «Симулятор фермы 25» приглашает в приятную сельскую жизнь, в одиночку или в совместной игре. Хозяин здесь вы!",
                  price: 2399,
                  date: "12 нояб. 2024 г.",
                  developer: "GIANTS Software",
                  rating: 4,
                },
              ]}
              categoryId={1}
            />

            <ProductGroup
              title="Спортивные"
              items={[
                {
                  id: 1,
                  name: "EA SPORTS FC™ 26",
                  desc: "Клуб ваш в EA SPORTS FC™ 26. Играйте по-своему с обновленным игровым процессом, основанным на отзывах сообщества, испытаниями «Тренер Live», которые привносят свежие сюжетные линии в новый сезон, и архетипами, вдохновленными величайшими игроками.",
                  price: 3990,
                  date: "26 сент. 2025 г.",
                  developer: "EA Canada",
                  rating: 2,
                },
                {
                  id: 2,
                  name: "F1® 25",
                  desc: "Оставьте свой след в мире гонок в F1® 25 — официальной игре чемпионата FIA Formula One World Championship™ 2025 с обновленным режимом «Моя команда», увлекательной третьей главой «Формулы победы» и не только!",
                  price: 1590,
                  date: "30 мая 2025 г.",
                  developer: "Codemasters",
                  rating: 4,
                },
                {
                  id: 3,
                  name: "BeamNG.drive",
                  desc: "Основанный на физике мягких объектов автомобильный симулятор, способный практически на всё.",
                  price: 1590,
                  date: "29 мая 2015 г.",
                  developer: "BeamNG",
                  rating: 4,
                },
              ]}
              categoryId={2}
            />
          </div>
        </div>
      </Container>
    </>
  );
}
