const data = await Bun.file("./days/3/data.txt").text();

// in data, get every char that is not a number or not a .
const symbols = [] as string[];
for (let i = 0; i < data.length; i++) {
	const char = data[i];
	if (Number.isNaN(Number(char)) && char !== ".") {
		if (symbols.includes(char)) continue;
		symbols.push(char);
	}
}

const lines = data.split("\n");
const map = lines.map((line) => line.split(""));

const group = [
	{
		number: "",
	},
] as any;
for (let i = 0; i < map.length; i++) {
	const current = map[i];

	for (let j = 0; j < current.length; j++) {
		const char = current[j];

		if (Number.isNaN(Number(char))) continue;
		let currentGroup = group[group.length - 1];
		if (currentGroup.isFinish) {
			currentGroup = {
				number: char,
				isFinish: false,
				isValidate: false,
			};
			group.push(currentGroup);
		} else {
			currentGroup.number += char;
		}

		if (Number.isNaN(Number(current[j + 1]))) {
			currentGroup.isFinish = true;
		}

		const top = map[i - 1] && map[i - 1][j];
		const bottom = map[i + 1] && map[i + 1][j];
		const left = map[i][j - 1];
		const right = map[i][j + 1];
		const cornerLeftTop = map[i - 1] && map[i - 1][j - 1];
		const cornerRightTop = map[i - 1] && map[i - 1][j + 1];
		const cornerLeftBottom = map[i + 1] && map[i + 1][j - 1];
		const cornerRightBottom = map[i + 1] && map[i + 1][j + 1];

		const total = [
			top,
			bottom,
			left,
			right,
			cornerLeftTop,
			cornerRightTop,
			cornerLeftBottom,
			cornerRightBottom,
		];

		const hasSymbol = total.some((char) => symbols.includes(char));

		if (hasSymbol) {
			currentGroup.isValidate = true;
		}
	}
}

const sumOfValidate = group.reduce((acc, current) => {
	if (current.isValidate) {
		return acc + Number(current.number);
	}
	return acc;
}, 0);

console.log({ sumOfValidate });
