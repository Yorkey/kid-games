import Link from "next/link";

const games = [
  { name: "数学游戏", description: "练习基本算术技能", link: "/math-game" },
  { name: "字母挑战", description: "测试你的打字速度和准确性", link: "/letter-challenge" },
  { name: "记忆匹配", description: "增强你的记忆能力", link: "/memory-match" },
  { name: "拼图狂热", description: "解决有趣且具有挑战性的拼图", link: "/puzzle-mania" },
  { name: "颜色探索", description: "了解颜色和形状", link: "/color-exploration" },
  { name: "动物声音", description: "发现各种动物的声音", link: "/animal-sounds" }
];

export default function Home() {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">儿童游戏</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <div className="card" key={index}>
            <div className="card-body">
              <h2 className="card-header">{game.name}</h2>
              <p className="text-content2">{game.description}</p>
              <div className="card-footer">
                <Link href={game.link}>
                  <button className="btn-primary btn">现在玩</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
