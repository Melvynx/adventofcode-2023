const data = await Bun.file("./days/2/test.txt").text();

const games = data.split("\n");

const saved = {} as any;

for (let i = 0; i < games.length; i++) {
	const game = games[i];

	const [details, data] = game.split(":");

	if (!data) continue;

	const gameNumber = details.split(" ")[1];
	saved[gameNumber] = {};

	const showTime = data.split(";");

	for (let j = 0; j < showTime.length; j++) {
		const time = showTime[j];
		const cubes = time.split(",");

		for (let k = 0; k < cubes.length; k++) {
			const cube = cubes[k].trim();
			let [count, type] = cube.split(" ") as any;
			count = Number(count);
			const current = saved[gameNumber][type];
			if (!current) {
				saved[gameNumber][type] = count;
			}

			if (current && current < count) {
				saved[gameNumber][type] = count;
			}
		}
	}
}

console.log({ saved });

let final = 0;
for (const key in saved) {
	if (saved[key].red > 12) {
		continue;
	}
	if (saved[key].blue > 14) {
		continue;
	}
	if (saved[key].green > 13) {
		continue;
	}
	final += Number(key);
}

console.log({ final });
