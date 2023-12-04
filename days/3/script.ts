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
		if (symbols.includes(top)) {
			currentGroup.validate = {
				x: i - 1,
				y: j,
			};
		}

		const bottom = map[i + 1] && map[i + 1][j];
		if (symbols.includes(bottom)) {
			currentGroup.validate = {
				x: i + 1,
				y: j,
			};
		}

		const left = map[i][j - 1];
		if (symbols.includes(left)) {
			currentGroup.validate = {
				x: i,
				y: j - 1,
			};
		}

		const right = map[i][j + 1];
		if (symbols.includes(right)) {
			currentGroup.validate = {
				x: i,
				y: j + 1,
			};
		}

		const cornerLeftTop = map[i - 1] && map[i - 1][j - 1];
		if (symbols.includes(cornerLeftTop)) {
			currentGroup.validate = {
				x: i - 1,
				y: j - 1,
			};
		}

		const cornerRightTop = map[i - 1] && map[i - 1][j + 1];
		if (symbols.includes(cornerRightTop)) {
			currentGroup.validate = {
				x: i - 1,
				y: j + 1,
			};
		}

		const cornerLeftBottom = map[i + 1] && map[i + 1][j - 1];
		if (symbols.includes(cornerLeftBottom)) {
			currentGroup.validate = {
				x: i + 1,
				y: j - 1,
			};
		}

		const cornerRightBottom = map[i + 1] && map[i + 1][j + 1];
		if (symbols.includes(cornerRightBottom)) {
			currentGroup.validate = {
				x: i + 1,
				y: j + 1,
			};
		}
	}
}

let finalResult = 0;
// find two gears only
// for each item, find if other item as the same validate coordinate
// if true, add the multiply of the two gears to the final result
// only check element after to avoid duplicate
for (let i = 0; i < group.length; i++) {
	const current = group[i];
	if (!current.validate) continue;
	for (let j = i + 1; j < group.length; j++) {
		const other = group[j];
		if (!other.validate) continue;
		if (
			current.validate.x === other.validate.x &&
			current.validate.y === other.validate.y
		) {
			finalResult += Number(current.number) * Number(other.number);
		}
	}
}

console.log({ finalResult });
